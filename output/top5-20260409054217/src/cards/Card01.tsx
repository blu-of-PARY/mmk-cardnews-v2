import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { POPEYE } from "../magazine-styles";

interface CardProps {
  durationInFrames: number;
}

export const Card01: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const FADE_IN = 9;
  const TITLE_IN = 15;
  const BODY_IN = 24;
  const FADE_OUT = 15;

  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const labelOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN + 6, TITLE_IN + 18], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN + 6, TITLE_IN + 18], [24, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Img
        src={staticFile("card-01.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: POPEYE.overlay.cover,
        }}
      />
      {/* Top badge */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 72,
          opacity: labelOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          SEOUL · SPRING 2026
        </div>
      </div>
      {/* Main text block */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 72,
          right: 72,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#D4563A",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            padding: "8px 20px",
            marginBottom: 28,
            opacity: labelOpacity,
          }}
        >
          TOP 5
        </div>
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 24,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          서울의 봄<br />제철 음식
        </h2>
        <p
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.82)",
            margin: 0,
            opacity: bodyOpacity,
          }}
        >
          제철을 놓치면 1년을 기다린다
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          fontWeight: 300,
          letterSpacing: 3,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        1 / 7
      </div>
    </AbsoluteFill>
  );
};
