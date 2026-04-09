import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { POPEYE } from "../magazine-styles";

interface CardProps {
  durationInFrames: number;
}

export const Card05: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const FADE_IN = 9;
  const TITLE_IN = 15;
  const BODY_IN = 24;
  const FADE_OUT = 15;

  const bgOpacity = interpolate(frame, [0, FADE_IN], [0, 1], { extrapolateRight: "clamp" });
  const numOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 10], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 16], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN + 4, TITLE_IN + 16], [20, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Img
        src={staticFile("card-05.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity }}
      />
      {/* Darker overlay for fire/drama contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Content block */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 72,
          right: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            opacity: numOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 80,
              lineHeight: 1,
              color: "#D4563A",
              letterSpacing: "-0.02em",
            }}
          >
            04
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            3 ~ 4월 산란기 직전
          </div>
        </div>
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 16,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          주꾸미
        </h2>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 30,
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 20,
            opacity: titleOpacity,
          }}
        >
          Jukkumi · Small Webfoot Octopus
        </div>
        <p
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.88)",
            margin: 0,
            opacity: bodyOpacity,
          }}
        >
          "봄 주꾸미, 가을 꽃게."<br />
          알이 꽉 찬 봄바다의 선물.<br />
          숯불 위에서 완성되는 제철의 맛.
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
        5 / 7
      </div>
    </AbsoluteFill>
  );
};
