# Art Direction — Image Prompt Guide

> Art direction layer for image generation. Apply to every prompt.
> Model: Gemini 3.1 Flash (image preview) — responds well to the same prompt structure.

---

## Anti-AI Base Prompt

**Always append to the end of every prompt:**

```
shot on film, analog grain texture, editorial photography quality,
no digital smoothing, no HDR, slightly desaturated, magazine scan feel,
no AI artifacts, natural imperfections.
DO NOT include any text, letters, words, numbers, watermarks, logos, or typography.
Pure visual only.
```

> Exception for Pen style — use crisp technical instead of grain:
> ```
> technical photography precision, archival quality, crisp detail,
> no grain, no vintage filter, museum catalog clarity.
> DO NOT include any text, letters, words, numbers, watermarks, logos, or typography.
> Pure visual only.
> ```

---

## 9-Layer Prompt Structure

Write prompts in this order. Always follow this sequence:

```
[1. COMPOSITION INTENT]        ← layout function first
[2. TEXT ZONE DECLARATION]     ← where text will be placed
[3. LIGHTING DIRECTIVE]        ← light direction
[4. CAMERA / LENS]             ← focal length, perspective
[5. COLOR PRE-VISUALIZATION]   ← enforce palette
[6. SUBJECT DESCRIPTION]       ← actual subject matter
[7. MAGAZINE STYLE REFERENCE]  ← aesthetic DNA
[8. ANTI-AI BASE PROMPT]       ← analog/film layer
[9. NEGATIVE]                  ← explicit exclusions (avoid: ...)
```

---

## Text Zone Templates

Insert into prompts based on card layout:

### FullBleed — text at bottom (most common)
```
subject mass concentrated in upper two-thirds of frame,
lower 35% fades to darker tones suitable for white text overlay,
bottom area intentionally subdued for text legibility
```

### Cover — text at center
```
high contrast image with both deep shadow and bright highlight areas,
subject distributed around frame edges with breathing room at center,
center area suitable for overlaid text regardless of placement
```

### Split — text on left
```
subject fills right 55% of frame,
left 45% is clean negative space or shallow soft background,
horizontal composition, left area reserved for text column
```

### Minimal — minimal text (SWITCH/Pen)
```
subject isolated center-frame with generous equal margins all sides,
subject occupies maximum 40% of total frame area,
surrounding space is clean, low-texture, single-tone
```

---

## Lighting Directives (by Style)

### BRUTUS — Dramatic Editorial
```
single directional hard light source, cinematic contrast ratio,
deep unlit blacks, no fill light, chiaroscuro quality,
high contrast ratio 1:8 or deeper
```

### POPEYE — Casual Natural
```
overcast diffused window light, soft even shadows, warm color temp 3200K,
slight lens flare acceptable, no visible studio setup,
feels like afternoon in someone's apartment or on a street
```

### Casa BRUTUS — Architectural Precision
```
even ambient light, no harsh directional shadows,
all surfaces rendered with equal material clarity,
light reveals texture not mood, color-accurate 5500K
```

### OLIVE — Intimate Analog
```
warm golden hour or indoor lamp quality, slightly overexposed highlights,
shadows warm not cool (shadow color temp 3000K),
light wraps around subject softly, accidental quality
```

### SWITCH — Portrait Controlled
```
single large soft source: north window or large beauty dish,
even modeling light on face, deliberate shadow on one side,
background falls 1-2 stops darker than subject
```

### Pen — Technical Studio
```
perfectly even diffused light, zero visible shadows or hot spots,
all surfaces equally illuminated, product photography precision,
color-neutral daylight 5500K
```

---

## Camera / Lens Directives

| Use Case | Directive |
|----------|-----------|
| Environmental / wide | `shot on 35mm lens, moderate depth of field, environmental context` |
| Standard / everyday | `shot on 50mm lens, natural human-eye perspective, honest rendering` |
| Portrait | `shot on 85mm lens, background compression, subject isolated, pleasing ratio` |
| Detail / texture | `macro focus 100mm, extreme surface detail, shallow depth of field` |
| Architectural | `tilt-shift 90mm, verticals perfectly straight, no keystoning` |
| Graphic / overhead | `directly overhead flat-lay, pure graphic quality, no perspective` |

---

## Color Pre-Visualization (by Style)

### BRUTUS
```
desaturate all midtones, push blacks to near #1A1A1A,
highlights to warm #F5F0E8, primary subject retains ONE saturated
color as accent, everything else near-monochrome
```

### POPEYE
```
warm portrait film color science: shadows shift warm/amber,
highlights stay neutral-warm, skin tones golden,
global -15% saturation, no pure whites — all whites carry warm cream cast
```

### Casa BRUTUS
```
palette from physical materials only: concrete gray, travertine warm stone,
plant green, glass blue — no synthetic colors,
only what the architecture is made of
```

### OLIVE
```
cross-process color shift: greens shift yellow-green,
blues shift cyan, shadows warm orange-brown,
overall saturation -25%, contrast -10%,
vintage Japanese slide film from 1994
```

### SWITCH
```
near-monochrome or full B&W: retain one hue channel maximum,
tonal range from rich deep shadow to open bright highlight,
silver gelatin print quality
```

### Pen
```
camera-accurate, zero grading shift, true neutral midtones,
only the subject's inherent color visible,
background: white #FAFAF7 or gray #9C9C9C or black #111111
```

---

## Style-Specific Prompt Templates

### BRUTUS
```
[subject], editorial magazine cover photography,
bold high-contrast lighting, BRUTUS magazine aesthetic,
high-contrast black and white film pushed one stop, deep shadows, strong blacks,
graphic editorial composition, conceptual art direction,
Tokyo design culture, no commercial softness,
color palette: near black and off-white with [accent color],
{ANTI-AI BASE}
avoid: soft lighting, pastel colors, stock photo, smooth AI skin,
HDR, over-processed, lifestyle commercial, gradient backgrounds
```

### POPEYE
```
[subject], editorial lifestyle photography,
POPEYE magazine city boy aesthetic, Tokyo casual,
warm portrait film, warm color grading, natural available light,
slightly underexposed, warm shadows, analog film quality,
relaxed candid energy but perfectly composed,
warm neutral tones, no commercial studio feel,
{ANTI-AI BASE}
avoid: cold tones, studio flash, commercial advertising,
perfect skin, oversaturated, HDR, stock photography feel
```

### Casa BRUTUS
```
[subject], architectural photography,
Casa BRUTUS magazine aesthetic, 4x5 large format quality,
natural architectural lighting, material textures visible,
concrete glass wood stone surfaces with reverence,
editorial interior design photography,
warm but controlled color grading,
color palette: warm whites, concrete grays, travertine, plant green,
{ANTI-AI BASE}
avoid: lifestyle staging, commercial interiors, warm consumer photography,
AI-smoothed textures, oversaturated, Instagram filter
```

### OLIVE
```
[subject], vintage editorial photography,
OLIVE magazine 1990s Japanese girl culture aesthetic,
warm-tone consumer film, warm vintage color grading,
expired film warmth and color shift, 35mm grain,
personal snapshot energy, French editorial influence,
quiet intimate mood, slightly warm overexposed highlights,
color palette: olive green, aged paper, rust, warm tan,
{ANTI-AI BASE}
avoid: cold tones, digital precision, modern fashion,
commercial advertising, studio lighting, saturated colors
```

### SWITCH
```
[subject], portrait editorial photography,
SWITCH magazine art direction, gallery print quality,
Hasselblad medium format portrait aesthetic,
controlled natural window light or studio,
shallow depth of field, subject is sole focus,
respectful intimate framing, monochromatic or filmic grading,
no props competing with subject, clean simple background,
{ANTI-AI BASE}
avoid: busy composition, multiple subjects, candid snapshot,
commercial portrait, beauty retouching, dramatic makeup
```

### Pen
```
[subject], Pen magazine minimal editorial aesthetic,
Swiss design influence, museum photography quality,
object isolated on clean neutral background,
controlled studio lighting even and precise,
product photography with editorial dignity,
no distracting context, pure subject focus,
color palette: warm white, neutral gray,
technical photography precision, archival quality, crisp detail,
DO NOT include any text, letters, words, numbers, watermarks.
avoid: busy backgrounds, lifestyle context, people in frame,
warm vintage look, film grain, multiple objects, decorative props
```

---

## Aspect Ratio Mismatch Warning

Canvas = **4:5** (1080x1350), Gemini closest = **3:4** (1792x2400).
3:4 is slightly taller than 4:5, so `objectFit: "cover"` will crop ~6% off left/right edges.

**When writing prompts:**
- Keep the main subject **centered horizontally**
- Do not place important elements at extreme left/right edges
- Ensure sufficient horizontal margin when declaring text zones
- Composition keyword: `"subject centered horizontally, avoid important elements at extreme left/right edges"`

---

## Gemini-Specific Notes

- Hex color values work directly: `"background color #F5F0E8"`
- Understands film aesthetics — but AVOID using brand names (Kodak, Fujifilm, Ilford) as Gemini renders them as text in the image. Use generic descriptions: "warm portrait film", "high-contrast B&W film", "vintage slide film"
- Understands camera specs: f/2.8, ISO 400, 35mm, medium format
- Use ratio language: `"subject occupies 40% of frame"`
- Use zone language: `"upper-left reserved for text"`
- No separate negative prompt parameter — include as `avoid:` within the prompt
- Do not use abstract mood words alone (`melancholy`, `hopeful`) — always pair with visual anchors
- Text generation is unreliable — always emphasize "DO NOT include text"
