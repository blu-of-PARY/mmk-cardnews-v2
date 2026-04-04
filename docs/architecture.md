# Architecture

## System Overview

mmk-cardnews-v2 generates card news (Instagram/LinkedIn carousels) from a topic. Two modes of operation: **Claude Code Plugin** (local/interactive) and **GitHub Actions** (on-demand/automated).

```
                         mmk-cardnews-v2
                    +-----------------------+
                    |                       |
         +----------+----------+   +--------+--------+
         |  Claude Code Plugin |   | GitHub Actions   |
         |  (local/interactive)|   | (on-demand/CI)   |
         +----------+----------+   +--------+--------+
                    |                       |
                    v                       v
            +-------+-------+      +--------+--------+
            | /cardnews     |      | workflow_dispatch|
            | skill trigger |      | (topic, slides,  |
            +-------+-------+      |  style)          |
                    |              +--------+--------+
                    |                       |
                    v                       v
         +----------+-----------------------+---------+
         |            Shared Pipeline                  |
         |                                             |
         |  1. Research (WebSearch)                     |
         |  2. Plan (magazine style + card layout)     |
         |  3. Scaffold (mmk-cn new)                   |
         |  4. Image Gen (mmk-cn imagegen + Gemini)    |
         |  5. Write TSX (Card01~CardN.tsx)             |
         |  6. Render (mmk-cn still -> Remotion -> PNG) |
         +---------------------------------------------+
```

## Component Architecture

```
+------------------+     +------------------+     +------------------+
|   Go CLI         |     |   Remotion React |     |   Gemini API     |
|   (mmk-cn)       |     |   (Node.js)      |     |   (Image Gen)    |
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
| cmd/mmk-cn/      |     | src/index.ts     |     | gemini-3.1-flash |
|   main.go        |     | src/cards/       |     |   -image-preview |
|                  |     |   Card01.tsx     |     |                  |
| internal/cli/    |     |   Card02.tsx     |     | Input:           |
|   new.go         +---->+   CardNN.tsx     |     |  English prompt  |
|   imagegen.go    |     |                  |     |  aspect ratio    |
|   still.go       |     | src/magazine-    |     |  image size      |
|   render.go      |     |   styles.ts      |     |                  |
|   pdf.go         |     |                  |     | Output:          |
|   preview.go     |     | src/CardStill.tsx|     |  PNG image       |
|                  |     |   (Google Fonts  |     |                  |
| internal/        |     |    @import)      |     | Anti-text:       |
|   imagegen/      +---->+                  |     |  "NO text" prefix|
|     gemini.go    |     | public/          |     |  in every prompt |
|   scaffold/      |     |   card-01.png    |     +------------------+
|     scaffold.go  |     |   card-NN.png    |
|     boilerplate/ |     |                  |
|   pdf/           |     | out/stills/      |
|     pdf.go       |     |   card-01.png    |
+------------------+     |   card-NN.png    |
                          +------------------+
```

## Pipeline: Claude Code Plugin (Local)

Interactive mode with user checkpoints.

```
User: /cardnews "일본 디저트" --slides 7
  |
  v
+--Step 0: Environment Check--------------------------+
|  node --version                                      |
|  mmk-cn --version                                    |
|  echo $GEMINI_API_KEY                                |
+------------------------------------------------------+
  |
  v
+--Step 1: Research------------------------------------+
|  WebSearch -> research.md                            |
|  [Checkpoint: user confirms]                         |
+------------------------------------------------------+
  |
  v
+--Step 2: Plan----------------------------------------+
|  Read card-news-guide.md + magazine-styles.md        |
|  -> plan.md (card type, style, per-card table)       |
|  [Checkpoint: user confirms]                         |
+------------------------------------------------------+
  |
  v
+--Step 3: Scaffold------------------------------------+
|  mmk-cn new "Title" --slides 7 --output output/slug  |
|  cd output/slug && npm install                       |
+------------------------------------------------------+
  |
  v
+--Step 4: Image Generation----------------------------+
|  Create batch.json from plan.md image descriptions   |
|  mmk-cn imagegen --batch batch.json                  |
|    --aspect-ratio 3:4 --image-size 2K                |
|                                                      |
|  Gemini API flow:                                    |
|    prompt -> "NO text" prefix prepended              |
|    POST /v1beta/models/gemini-3.1-flash:generate     |
|    Response -> base64 PNG -> save to public/         |
|  [Checkpoint: user reviews images]                   |
+------------------------------------------------------+
  |
  v
+--Step 5: Write Card Components-----------------------+
|  For each card: src/cards/CardNN.tsx                  |
|    - FullBleed (bg image + text overlay)              |
|    - Split (image top 55% + text bottom 45%)         |
|    - TextOnly (centered text)                        |
|  NEVER horizontal split on portrait 1080x1350        |
+------------------------------------------------------+
  |
  v
+--Step 6: Preview-------------------------------------+
|  mmk-cn preview output/slug                          |
|  -> Remotion Studio at localhost:3000                 |
|  [Checkpoint: user reviews]                          |
+------------------------------------------------------+
  |
  v
+--Step 7: Export--------------------------------------+
|  mmk-cn still output/slug    -> out/stills/*.png     |
|  mmk-cn render output/slug   -> out/output.mp4       |
|  mmk-cn pdf output/slug/out/stills -> carousel.pdf   |
+------------------------------------------------------+
```

## Pipeline: GitHub Actions (On-Demand)

Automated mode, no user checkpoints. Triggered via Actions UI.

```
GitHub Actions UI: "Run workflow"
  topic: "일본 디저트"
  slides: 7
  style: auto
  |
  v
+--Job: generate (ubuntu-latest)--------------------------------------+
|                                                                      |
|  +--Checkout + Setup-----------------------------------------------+ |
|  |  actions/checkout@v4                                            | |
|  |  actions/setup-go@v5 (1.24)                                    | |
|  |  actions/setup-node@v4 (20)                                    | |
|  |  make build -> dist/mmk-cn                                     | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  +--Prepare Branch-------------------------------------------------+ |
|  |  Slugify topic (fallback "cardnews" for Korean)                 | |
|  |  git checkout -b cardnews/<slug>-<timestamp>                    | |
|  |  Add dist/ to PATH                                             | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  +--Install CJK Fonts---------------------------------------------+ |
|  |  apt-get install fonts-noto-cjk fonts-noto-cjk-extra           | |
|  |  fc-cache -f                                                   | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  +--Claude Code Action (anthropics/claude-code-action@v1)----------+ |
|  |  claude_args: "--allowedTools Bash,Write,Edit,Read,Glob,        | |
|  |               Grep,WebSearch"                                   | |
|  |  display_report: true                                           | |
|  |  env: GEMINI_API_KEY from secrets                               | |
|  |                                                                  | |
|  |  Claude executes Steps 0-5:                                     | |
|  |    Research -> Plan -> Scaffold -> Imagegen -> Write TSX         | |
|  |    (no npm install, no preview, no still, no commits)           | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  +--Render Card Stills---------------------------------------------+ |
|  |  Patch CardStill.tsx (add all Google Font imports)              | |
|  |  cd $OUTPUT && npm install                                     | |
|  |  mmk-cn still . -> out/stills/card-*.png                       | |
|  |  Verify dimensions + file sizes                                 | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  +--Commit + Push + PR---------------------------------------------+ |
|  |  git remote set-url origin (x-access-token)                    | |
|  |  git add -f $OUTPUT (bypass .gitignore)                        | |
|  |  git push origin cardnews/<slug>-<timestamp>                    | |
|  |  gh pr create --title "Card News: <topic>"                     | |
|  +----------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
  |
  v
PR opened with:
  output/<slug>-<timestamp>/
    research.md, plan.md, batch.json
    src/cards/Card01~CardN.tsx
    public/card-01~N.png (Gemini images)
    out/stills/card-01~N.png (rendered card news)
```

## Secrets & Permissions

```
+----------------------------+------------------------------------------+
| Secret                     | Purpose                                  |
+----------------------------+------------------------------------------+
| CLAUDE_CODE_OAUTH_TOKEN    | Claude Code Action authentication        |
| GEMINI_API_KEY             | Gemini API for image generation          |
+----------------------------+------------------------------------------+

+----------------------------+------------------------------------------+
| Repo Setting               | Value                                    |
+----------------------------+------------------------------------------+
| Workflow permissions       | Read and write                           |
| Allow GHA to create PRs    | Enabled                                  |
+----------------------------+------------------------------------------+
```

## Card Layout Patterns

```
Canvas: 1080 x 1350 (portrait 4:5)

  FullBleed                  Split (vertical)           TextOnly
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|   Background     |     |   Image (55%)    |     |                  |
|   Image          |     |                  |     |    Centered      |
|   (100%)         |     +------------------+     |    Title         |
|                  |     |                  |     |                  |
|   +-----------+  |     |   Text (45%)     |     |    Body          |
|   | Gradient  |  |     |   - Tag          |     |    Text          |
|   | Overlay   |  |     |   - Title        |     |                  |
|   | + Text    |  |     |   - Body         |     |                  |
|   +-----------+  |     |   - Page #       |     |                  |
|     Page #       |     +------------------+     |     Page #       |
+------------------+                               +------------------+

NEVER use horizontal (side-by-side) split on portrait canvas.
```

## Magazine Styles

```
+---------------+-------------------+---------------------------+
| Style         | Best For          | Signature                 |
+---------------+-------------------+---------------------------+
| BRUTUS        | Concepts, trends  | Bold, high-contrast       |
| POPEYE        | Food, travel      | Warm film, casual         |
| Casa BRUTUS   | Architecture      | Material, precise         |
| OLIVE         | Personal, vintage | Analog warmth, intimate   |
| SWITCH        | Portraits         | B&W, portrait-first       |
| Pen           | Art, minimal      | Swiss minimalism          |
+---------------+-------------------+---------------------------+
```
