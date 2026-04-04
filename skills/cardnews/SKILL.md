---
name: cardnews
description: This skill should be used when the user asks to "카드뉴스 만들어줘", "card news", "create card news", "카드뉴스 생성", "make slides", "인스타 카드뉴스", "LinkedIn carousel". Generates Instagram/LinkedIn card news from a topic using AI images and Remotion React rendering.
---

# Card News Generator (카드뉴스)

> Topic → Research → Plan → AI Images → React Card Components → PNG Stills (+ MP4)

---

## Prerequisites

- **Node.js** 18+ (for Remotion)
- **mmk-cn** CLI (built from this project)
- **Gemini API key** (for AI image generation, optional)

## Output Path

```
{cwd}/{topic-slug}/
├── src/cards/Card01.tsx ~ CardNN.tsx   # React card components
├── src/data.ts                         # Timing + subtitle data
├── public/card-*.png                   # AI-generated images
├── out/stills/card-*.png               # Exported PNG stills
└── out/output.mp4                      # Exported video (optional)
```

`SKILL_DIR` = directory where this SKILL.md lives (for references).

---

## Workflow

### Step 0: Environment Check

1. Check Node.js:
```bash
node --version
```

2. Check mmk-cn binary:
```bash
mmk-cn --version
```
If missing: `cd {SKILL_DIR}/../.. && make build`

3. Check Gemini API key (optional):
```bash
echo $GEMINI_API_KEY
```
No key → skip image generation, use text-only cards.

Report available features:
```
환경 확인 완료!
✅ 카드뉴스 생성 (Remotion React)
✅ PNG 이미지 렌더링
✅/❌ AI 이미지 생성 (Gemini)
✅/❌ 영상 렌더링 (MP4)
```

### Step 1: Research

**Type**: prompt (WebSearch)

Use WebSearch to gather 5-10 sources on the topic.

Output: `{output}/research.md`

Structure:
- Topic overview
- 5-10 key points with sources
- Synthesis
- Card news message candidates

**Checkpoint** — AskUserQuestion:
```
"리서치 결과예요. 확인해주세요."
Options: 진행 / 수정 요청 / 여기서 종료
```

### Step 2: Card News Planning

**Type**: prompt + reference

Read research.md + `{SKILL_DIR}/references/card-news-guide.md` to create a plan.

Output: `{output}/plan.md`

Plan includes:
1. Card type (list/storytelling/focus/Q&A)
2. **Magazine style** — auto-select from `{SKILL_DIR}/references/magazine-styles.md`:
   - Concept/theme → BRUTUS | Lifestyle/city → POPEYE | Architecture/space → Casa BRUTUS
   - Personal/vintage → OLIVE | Portrait/interview → SWITCH | Art/minimal → Pen
   - Present recommended style + reason to user; user can override
3. Total slides (7-13)
4. Per-card table: # | Part (cover/body/closing) | Message | Image art direction (text zone, lighting) | Layout pattern (FullBleed/Split/TextOnly)
5. Color palette → auto-determined from selected magazine style

**Checkpoint** — AskUserQuestion:
```
"기획서예요. 장수나 내용 흐름을 확인해주세요."
Options: 진행 / 수정 요청 / 여기서 종료
```

### Step 3: Scaffold Project

```bash
mmk-cn new "{title}" --slides {N} --output "{output}"
```

Then install dependencies:
```bash
cd "{output}" && npm install
```

This creates the Remotion project with skeleton card components.

### Step 4: AI Image Generation (Optional)

**Requires**: `GEMINI_API_KEY` environment variable or `.env` file.

Model: `gemini-3.1-flash-image-preview` (configurable via `GEMINI_MODEL`).

1. Extract image descriptions from plan.md
2. Create `{output}/batch.json`:
```json
[
  {"prompt": "DO NOT include any text... {english prompt}", "output": "public/card-01.png"},
  {"prompt": "...", "output": "public/card-02.png"}
]
```

3. Run batch generation:
```bash
mmk-cn imagegen --batch "{output}/batch.json" --aspect-ratio 3:4 --image-size 2K --env-file .env
```

**Aspect ratio note**: Canvas is 4:5 (1080x1350) but Gemini only supports 3:4 (closest match). The 3:4 image is slightly taller, so `objectFit: "cover"` will crop ~6% off left/right edges. When writing image prompts, **keep the main subject centered horizontally** and avoid placing important elements at the extreme left/right edges to prevent cropping.

**Prompt rules** (see `{SKILL_DIR}/references/art-direction.md`):
- Use **9-layer art-directed prompt structure**: composition → text zone → lighting → camera → color → subject → style → anti-AI → negative
- Select prompt template from art-direction.md matching the chosen magazine style
- Text zone must match card layout (FullBleed → lower 35% reserved, Cover → center safe zone)
- Always append anti-AI base prompt (analog grain, no digital smoothing)
- 200-400 word English prompt
- Gemini responds well to: hex colors, film stock names, camera specs, zone language

**Checkpoint** — AskUserQuestion:
```
"이미지들이에요. 마음에 안 드는 건 재생성할 수 있어요."
Options: 진행 / 일부 재생성 / 텍스트 온리로 진행
```

### Step 5: Write Card Components

This is the core creative step. Read `{SKILL_DIR}/references/card-template-guide.md` for patterns.

For each card, write `src/cards/CardNN.tsx`:
- Use `FullBleedCard`, `SplitCard`, or `TextOnlyCard` pattern from `CardTemplate.tsx`
- **Canvas is portrait 1080x1350 (4:5)** — all layouts MUST be vertical. NEVER use horizontal (side-by-side) splits. Split = image top + text bottom.
- **Import magazine style constants** from `../magazine-styles` (e.g., `import { POPEYE } from '../magazine-styles'`)
- Apply style's palette, typography, and overlay gradients
- Fill in actual content from plan.md
- Reference images via `staticFile("card-NN.png")`
- Include fade-in/fade-out animations via `interpolate()`
- Page numbers: `N / {total}` at bottom center
- **Anti-AI design**: minimize emoji (0-1 per card max), no gradient-only backgrounds, text ON image not in separate zone

**Output language**: Default is Korean (polite form). If the user specifies a different language, use that instead. If unclear, ask before writing cards.

**Font size rules (mandatory)**:
| Element | Canvas min | Mobile equiv |
|---------|-----------|-------------|
| Title (h2) | **48px** | ~17px |
| Body (desc) | **36px** | ~12px |
| Date/tag | **32px** | ~11px |
| Info/source | **30px** | ~10px |
| Page number | **28px** | ~10px |
| **Absolute min** | **24px** | ~8px |

Update `src/cards/index.ts` to import all card components.

### Step 6: Preview

```bash
mmk-cn preview "{output}"
```

Opens Remotion Studio in browser for live preview and editing.

**Checkpoint** — AskUserQuestion:
```
"Remotion Studio에서 미리보기를 확인해주세요."
Options: 진행 / 수정 요청
```

### Step 7: Export

**Always** render PNG stills — this step is mandatory, not optional.

**PNG stills (always run)**:
```bash
mmk-cn still "{output}"
```

After rendering, display each PNG image to the user for review.

**MP4 video (optional, only if user requests)**:
```bash
mmk-cn render "{output}"
```

**Checkpoint** — AskUserQuestion:
```
"완성! 확인해주세요."
Options: 완료 / 수정 요청
```

---

## Failure Recovery

Report completed steps clearly:
```
완성된 결과물:
✅ Step 1: 리서치 → research.md
✅ Step 2: 기획서 → plan.md
✅ Step 3: 프로젝트 생성 → {output}/
✅ Step 4: 이미지 → public/card-*.png
✅ Step 5: 카드 컴포넌트 → src/cards/
✅ Step 7: PNG 렌더링 → out/stills/
❌ Step 6: (건너뜀)
```

## References

- `references/card-news-guide.md` — Design rules, card types, color themes
- `references/card-template-guide.md` — How to write Card TSX components
- `references/design-system.md` — Typography, spacing, mobile readability
- `references/magazine-styles.md` — 6 Japanese magazine style palettes, typography, layout, Remotion constants
- `references/art-direction.md` — 9-layer image prompt structure, text zones, lighting, camera directives

## Settings

| Setting | Default | Override |
|---------|---------|----------|
| Gemini API key | (optional) | `GEMINI_API_KEY` env or `.env` |
| Gemini model | gemini-3.1-flash-image-preview | `GEMINI_MODEL` env or `.env` |
| Image aspect ratio | 3:4 | `--aspect-ratio` flag |
| Image size | 2K | `--image-size` flag |
| Slides | 7 | `--slides` flag |
| Card size | 1080x1350 | Fixed (4:5 portrait) |
| FPS | 30 | Fixed |
