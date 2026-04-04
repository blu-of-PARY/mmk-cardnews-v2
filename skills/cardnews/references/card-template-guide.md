# Card Template Guide — Writing React TSX Components

## Overview

Each card is a React component in `src/cards/CardNN.tsx`. Three layout patterns are available in `CardTemplate.tsx`:

**IMPORTANT**: Canvas is portrait 1080x1350 (4:5). All layouts must be **vertical**. NEVER use horizontal (side-by-side) splits — columns are too narrow on portrait canvas and will look broken.

1. **FullBleed** — Full background image + text overlay at bottom
2. **Split** — Image top (55%) + text bottom (45%), vertical layout
3. **TextOnly** — Centered text on solid background

## How to Write a Card Component

### 1. Pick a pattern

Choose based on the card's content:
- Has hero image → FullBleed
- Has image + substantial text → Split
- No image / emphasis text → TextOnly

### 2. Copy the pattern from CardTemplate.tsx

```tsx
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

interface CardProps {
  durationInFrames: number;
}

export const Card01: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Standard animation timings
  const FADE_IN = 9;      // 0.3s
  const TITLE_IN = 15;    // 0.5s
  const BODY_IN = 24;     // 0.8s
  const FADE_OUT = 15;    // 0.5s

  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Your layout here */}
    </AbsoluteFill>
  );
};
```

### 3. Fill in content

Replace placeholder text with actual card content from plan.md.

### 4. Reference images

```tsx
<Img src={staticFile("card-01.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```

Images must be placed in `public/` directory.

### 5. Page numbers

Always include at bottom center:
```tsx
<div style={{
  position: "absolute",
  bottom: 40,
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: 28,
  fontWeight: 300,
  letterSpacing: 3,
  color: "rgba(255,255,255,0.4)",  // or rgba(0,0,0,0.3) for light bg
}}>
  1 / 7
</div>
```

For Split layout: place page number in text area (bottom half), NOT over image.

## Style Rules

### Colors
- Dark cards: bg `#0A0A0A`, text `#FAFAFA`
- Light cards: bg `#FAFAFA`, text `#0A0A0A`
- Alternate dark/light for visual rhythm

### Font Families
- Title: `fontFamily: "'Noto Serif KR', serif"`
- Body: `fontFamily: "'Noto Sans KR', sans-serif"`

### All styles must be inline
No external CSS — use React inline style objects.

### Imports needed
```tsx
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
```

Only import `Img` and `staticFile` if the card uses images.
