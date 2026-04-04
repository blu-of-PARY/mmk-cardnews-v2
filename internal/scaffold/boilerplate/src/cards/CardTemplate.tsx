// Card component templates — 3 layout patterns
// Copy the pattern that fits your card and fill in the content.
//
// IMPORTANT: Canvas is portrait 1080x1350 (4:5). All layouts must be vertical.
// Do NOT use horizontal (side-by-side) splits — columns are too narrow on portrait.
//
// Patterns:
//   FullBleed  — Full background image + text overlay at bottom
//   Split      — Image top (55%) + text bottom (45%), vertical layout
//   TextOnly   — Centered text on solid background
//
// Mobile readability font sizes (1080px canvas → ~375px mobile, ~1/2.88 scale):
//   h2 title:    48px (mobile ~17px)
//   body desc:   36px (mobile ~12px)
//   date/tag:    32px (mobile ~11px)
//   info/source: 30px (mobile ~10px)
//   page number: 28px (mobile ~10px)
//   absolute min: 24px (below this is forbidden)

import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const FADE_IN = 9;
const TITLE_IN = 15;
const BODY_IN = 24;
const FADE_OUT = 15;

interface CardProps {
  durationInFrames: number;
}

// Pattern A: Full-bleed (background image + text overlay)
export const FullBleedCard: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [30, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Img src={staticFile("card-XX.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
      <div style={{ position: "absolute", bottom: 100, left: 80, right: 80 }}>
        <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: 3, color: "rgba(250,250,250,0.6)", marginBottom: 20, opacity: bodyOpacity }}>DATE</div>
        <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 48, fontWeight: 900, lineHeight: 1.25, color: "#FAFAFA", opacity: titleOpacity, transform: `translateY(${titleY}px)`, marginBottom: 16 }}>
          TITLE
        </h2>
        <p style={{ fontSize: 36, fontWeight: 300, color: "rgba(250,250,250,0.85)", lineHeight: 1.55, opacity: bodyOpacity }}>
          DESCRIPTION
        </p>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", fontSize: 28, fontWeight: 300, letterSpacing: 3, color: "rgba(255,255,255,0.4)" }}>
        N / TOTAL
      </div>
    </AbsoluteFill>
  );
};

// Pattern B: Split (image top + text bottom — vertical layout for portrait canvas)
export const SplitCard: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const imgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", opacity: fadeOut }}>
      <div style={{ width: "100%", height: "55%", overflow: "hidden" }}>
        <Img src={staticFile("card-XX.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgOpacity }} />
      </div>
      <div style={{ width: "100%", height: "45%", padding: "48px 72px 90px 72px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#FAFAFA", position: "relative" }}>
        <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: 3, color: "rgba(0,0,0,0.4)", marginBottom: 20, opacity: bodyOpacity }}>DATE</div>
        <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 48, fontWeight: 900, lineHeight: 1.25, color: "#0A0A0A", opacity: titleOpacity }}>
          TITLE
        </h2>
        <p style={{ fontSize: 36, fontWeight: 300, color: "#555", lineHeight: 1.55, opacity: bodyOpacity, marginTop: 16 }}>
          DESCRIPTION
        </p>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", fontSize: 28, fontWeight: 300, letterSpacing: 3, color: "rgba(0,0,0,0.3)" }}>
          N / TOTAL
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Pattern C: Text only (no image)
export const TextOnlyCard: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [30, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0A0A0A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 80px", opacity: fadeOut }}>
      <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 56, color: "#FAFAFA", textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        TITLE
      </h2>
      <p style={{ fontSize: 36, color: "rgba(250,250,250,0.7)", lineHeight: 1.6, textAlign: "center", marginTop: 32, opacity: bodyOpacity }}>
        DESCRIPTION
      </p>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", fontSize: 28, fontWeight: 300, letterSpacing: 3, color: "rgba(255,255,255,0.4)" }}>
        N / TOTAL
      </div>
    </AbsoluteFill>
  );
};
