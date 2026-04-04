# mmk-cardnews-v2

Card news generator for Instagram/LinkedIn -- powered by Go CLI + Remotion React + Gemini AI images.

A Claude Code plugin that generates professional card news from any topic.

## How It Works

```
Topic -> Research -> Plan -> Scaffold -> AI Images -> Card Components -> Rendered PNGs
```

Two modes:
- **Claude Code Plugin**: Interactive, local, with user review at each step
- **GitHub Actions**: On-demand, automated, creates a PR with rendered card news

See [Architecture](docs/architecture.md) for detailed workflow diagrams.

## Installation

### Option 1: Claude Code Plugin (Recommended)

```bash
claude plugin add github.com/pureugong/mmk-cardnews-v2
```

Then in Claude Code:
```
/cardnews 일본 디저트 --slides 7
```

**Prerequisites:**
- Node.js 18+
- Go 1.24+ (or setup.sh downloads a prebuilt binary)
- `GEMINI_API_KEY` in your environment or `.env` file ([Get one here](https://aistudio.google.com/apikey))

### Option 2: GitHub Actions (On-Demand)

Fork or clone this repo, then set up secrets:

```bash
# 1. Set required secrets
gh secret set CLAUDE_CODE_OAUTH_TOKEN   # Claude Code auth token
gh secret set GEMINI_API_KEY            # Gemini API key

# 2. Enable PR creation
gh api repos/OWNER/REPO/actions/permissions/workflow \
  -X PUT -F can_approve_pull_request_reviews=true

# 3. Trigger from Actions tab
#    Actions -> "Generate Card News" -> Run workflow
#    Fill in: topic, slides (default 7), style (default auto)
```

The workflow will:
1. Build the CLI
2. Run Claude Code to research, plan, scaffold, generate images, write card components
3. Render final PNG stills via Remotion (headless Chrome)
4. Open a PR with all generated files

**Workflow inputs:**

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `topic` | Yes | -- | Card news topic (Korean or English) |
| `slides` | No | `7` | Number of slides (3-13) |
| `style` | No | `auto` | Magazine style: auto, BRUTUS, POPEYE, Casa BRUTUS, OLIVE, SWITCH, Pen |

### Option 3: Manual CLI

```bash
git clone https://github.com/pureugong/mmk-cardnews-v2.git
cd mmk-cardnews-v2
./setup.sh                              # builds dist/mmk-cn

# Set Gemini API key
export GEMINI_API_KEY=your-key-here

# Generate card news step by step
mmk-cn new "Topic" --slides 7           # scaffold project
mmk-cn imagegen --batch batch.json      # generate AI images
cd output/topic && npm install          # install Remotion deps
mmk-cn preview .                        # live preview at localhost:3000
mmk-cn still .                          # export PNG stills
mmk-cn render .                         # export MP4 video
mmk-cn pdf out/stills                   # export PDF carousel
```

## CLI Reference

| Command | Description |
|---------|-------------|
| `mmk-cn new <title> --slides N` | Scaffold a new Remotion project |
| `mmk-cn imagegen --batch file.json` | Batch generate AI images via Gemini |
| `mmk-cn imagegen -p "prompt" -o out.png` | Generate a single image |
| `mmk-cn preview <project>` | Open Remotion Studio for live preview |
| `mmk-cn still <project>` | Export each card as 1080x1350 PNG |
| `mmk-cn render <project>` | Export video as MP4 |
| `mmk-cn pdf <stills-dir>` | Stitch PNGs into a PDF carousel |

## Output

```
output/<topic>/
  research.md                   # Topic research
  plan.md                       # Card news plan
  batch.json                    # Image generation prompts
  src/cards/Card01~CardN.tsx    # React card components
  public/card-01~N.png          # AI-generated background images
  out/stills/card-01~N.png      # Final rendered card news (1080x1350)
  out/output.mp4                # Video (optional)
  out/carousel.pdf              # PDF carousel (optional)
```

## Tech Stack

- **Go 1.24** -- CLI orchestrator (Cobra)
- **Remotion 4.x** -- React to PNG/MP4 rendering
- **Gemini API** -- AI image generation (`gemini-3.1-flash-image-preview`)
- **go-pdf/fpdf** -- PDF carousel generation
- **No Python. No chromedp.**

## Card Dimensions

| Format | Size | Ratio |
|--------|------|-------|
| Instagram portrait | 1080 x 1350 | 4:5 |
| Vertical video | 1080 x 1920 | 9:16 |

## Magazine Styles

| Style | Best For | Aesthetic |
|-------|----------|-----------|
| BRUTUS | Concepts, trends, IT | Bold, high-contrast, graphic |
| POPEYE | Food, travel, lifestyle | Warm film, casual confidence |
| Casa BRUTUS | Architecture, space | Material reverence, precise |
| OLIVE | Personal, vintage, emotional | Analog warmth, intimate |
| SWITCH | Portraits, interviews | B&W, portrait-first |
| Pen | Art, minimal, high culture | Swiss minimalism, white space |

## Documentation

- [Architecture & Workflow Diagrams](docs/architecture.md)
- [CLAUDE.md](CLAUDE.md) -- Project instructions for Claude Code

## License

MIT
