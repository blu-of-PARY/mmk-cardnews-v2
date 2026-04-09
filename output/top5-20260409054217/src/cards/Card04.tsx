import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { POPEYE } from "../magazine-styles";

interface CardProps {
  durationInFrames: number;
}

export const Card04: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const FADE_IN = 9;
  const TITLE_IN = 15;
  const BODY_IN = 24;
  const FADE_OUT = 15;

  const imgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const numOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 10], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 16], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 16], [20, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", opacity: fadeOut }}>
      {/* Image top 55% */}
      <div style={{ width: "100%", height: "55%", overflow: "hidden", position: "relative" }}>
        <Img
          src={staticFile("card-04.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgOpacity }}
        />
        {/* Number badge overlaid on image top-left */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 80,
            lineHeight: 1,
            color: "#D4563A",
            letterSpacing: "-0.02em",
            opacity: numOpacity,
          }}
        >
          03
        </div>
      </div>
      {/* Text bottom 45% */}
      <div
        style={{
          width: "100%",
          height: "45%",
          padding: "48px 72px 90px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: POPEYE.colors.background,
          position: "relative",
        }}
      >
        {/* Season label */}
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: POPEYE.colors.muted,
            marginBottom: 16,
            opacity: numOpacity,
          }}
        >
          4월 ~ 5월 초
        </div>
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.2,
            color: POPEYE.colors.primary,
            margin: 0,
            marginBottom: 8,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          두릅
        </h2>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 28,
            color: POPEYE.colors.muted,
            marginBottom: 16,
            opacity: titleOpacity,
          }}
        >
          Dureup · Aralia Sprouts
        </div>
        {/* Description */}
        <p
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 400,
            fontSize: 34,
            lineHeight: 1.6,
            color: "rgba(26,26,26,0.75)",
            margin: 0,
            opacity: bodyOpacity,
          }}
        >
          봄나물의 제왕.<br />
          데쳐서 초고추장에 찍으면 완성.
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: 3,
            color: "rgba(0,0,0,0.3)",
          }}
        >
          4 / 7
        </div>
      </div>
    </AbsoluteFill>
  );
};
