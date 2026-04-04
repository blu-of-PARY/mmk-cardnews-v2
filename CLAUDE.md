# CLAUDE.md — mmk-cardnews-v2

## Important Rules

**ALWAYS use the Write tool for file creation, NOT Bash heredocs.**

---

## Project Overview

A Go CLI + Remotion-based card news generator. Claude Code plugin that anyone can install to create Instagram/LinkedIn card news (카드뉴스) from a topic.

**Architecture**: Go CLI orchestrates → Remotion React renders → PNG stills + MP4 video + PDF carousel.

## Tech Stack

- **Language**: Go 1.24 (CLI orchestrator)
- **CLI**: Cobra (spf13/cobra)
- **Rendering**: Remotion 4.x (React → PNG/MP4)
- **Image Gen**: Gemini API via net/http (model: gemini-3.1-flash-image-preview)
- **PDF**: go-pdf/fpdf (PNG stitch)
- **No Python. No chromedp.**

## Project Structure

```
mmk-cardnews-v2/
├── cmd/mmk-cn/main.go           # Cobra root
├── internal/
│   ├── cli/                     # Command implementations
│   │   ├── new.go               # Scaffold Remotion project
│   │   ├── imagegen.go          # AI image generation
│   │   ├── still.go             # Remotion still → PNG
│   │   ├── render.go            # Remotion render → MP4
│   │   ├── pdf.go               # PNG → PDF
│   │   └── preview.go           # Open Remotion Studio
│   ├── imagegen/                # Gemini API client (pure Go)
│   ├── scaffold/                # Project scaffolding
│   │   ├── scaffold.go
│   │   └── boilerplate/         # Embedded Remotion template
│   └── pdf/                     # PDF generation
├── skills/cardnews/             # Claude Code skill
├── .claude-plugin/              # Plugin manifest
└── .github/workflows/           # CI/CD
```

## Key Commands

```bash
make build                       # Build CLI to dist/mmk-cn
make test                        # Run tests

# CLI usage
mmk-cn new "Topic" --slides 7   # Scaffold Remotion project
mmk-cn imagegen -p "prompt" -o images/card-01.png  # Generate image
mmk-cn preview ./project/       # Open Remotion Studio
mmk-cn still ./project/         # Export all cards as PNG
mmk-cn render ./project/        # Export video as MP4
mmk-cn pdf ./project/           # Stitch PNGs to PDF
```

## Pipeline

```
Topic → mmk-cn new (scaffold) → Claude writes Card TSX → mmk-cn imagegen
      → mmk-cn still (PNG) / mmk-cn render (MP4) / mmk-cn pdf (PDF)
```

## Card Dimensions

| Platform | Size | Ratio |
|----------|------|-------|
| Instagram portrait | 1080x1350 | 4:5 |
| Vertical video | 1080x1920 | 9:16 |

## Design Principles

- Remotion React components for all visual rendering
- Go CLI handles orchestration, scaffolding, and image generation
- No Python dependencies — pure Go + Node.js
- Plugin-first: installable via `claude plugin add`
