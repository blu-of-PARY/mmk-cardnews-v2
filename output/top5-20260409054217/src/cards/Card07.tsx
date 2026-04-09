import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { POPEYE } from "../magazine-styles";

interface CardProps {
  durationInFrames: number;
}

export const Card07: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const FADE_IN = 9;
  const TITLE_IN = 15;
  const BODY_IN = 28;
  const TAG_IN = 42;
  const FADE_OUT = 15;

  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const labelOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 10], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 18], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 18], [24, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const tagOpacity = interpolate(frame, [TAG_IN, TAG_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Img
        src={staticFile("card-07.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: POPEYE.overlay.closing,
        }}
      />
      {/* Top label */}
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
            color: "rgba(255,255,255,0.7)",
          }}
        >
          SPRING · 봄
        </div>
      </div>
      {/* Main content */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 72,
          right: 72,
        }}
      >
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.3,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 24,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          봄은 짧다.<br />지금 먹어야 한다.
        </h2>
        <p
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 400,
            fontSize: 34,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.82)",
            margin: 0,
            marginBottom: 32,
            opacity: bodyOpacity,
          }}
        >
          냉이·달래·두릅·주꾸미·미나리.<br />
          서울의 봄 제철 TOP5는<br />
          3~5월, 그 짧은 창문 안에만 존재한다.
        </p>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 12,
            opacity: tagOpacity,
          }}
        >
          {["#냉이", "#달래", "#두릅", "#주꾸미", "#미나리"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Noto Sans KR', sans-serif",
                fontWeight: 400,
                fontSize: 28,
                padding: "8px 20px",
                borderRadius: 4,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
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
        7 / 7
      </div>
    </AbsoluteFill>
  );
};
