import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const FADE_IN = 9;
const TITLE_IN = 15;
const BODY_IN = 24;
const FADE_OUT = 15;

interface CardProps {
  durationInFrames: number;
}

export const Card01: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [30, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Dark background with warm sushi-bar ambiance */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(165deg, #1a0a00 0%, #2d1810 35%, #0d1117 100%)",
          opacity: bgOpacity,
        }}
      />
      {/* Decorative circle accent */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          border: "2px solid rgba(255, 165, 80, 0.15)",
          opacity: bodyOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 165, 80, 0.1)",
          opacity: bodyOpacity,
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: 6,
            color: "rgba(255, 180, 100, 0.7)",
            marginBottom: 28,
            opacity: bodyOpacity,
          }}
        >
          HOKKAIDO LOCAL SUSHI
        </div>
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 56,
            fontWeight: 900,
            color: "#FAFAFA",
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          네무로 하나마루
        </h2>
        <div
          style={{
            fontSize: 38,
            fontWeight: 300,
            color: "rgba(255, 200, 140, 0.85)",
            letterSpacing: 2,
            opacity: titleOpacity,
            marginBottom: 36,
          }}
        >
          根室花まる
        </div>
        <p
          style={{
            fontSize: 36,
            fontWeight: 300,
            color: "rgba(250, 250, 250, 0.7)",
            textAlign: "center",
            lineHeight: 1.6,
            opacity: bodyOpacity,
            maxWidth: 860,
          }}
        >
          홋카이도 네무로에서 시작된{"\n"}
          현지인이 줄 서서 먹는 회전초밥의 성지
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
          color: "rgba(255, 255, 255, 0.4)",
        }}
      >
        1 / 3
      </div>
    </AbsoluteFill>
  );
};
