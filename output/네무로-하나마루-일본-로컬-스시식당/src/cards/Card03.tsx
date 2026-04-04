import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const TITLE_IN = 12;
const BODY_IN = 22;
const TIP_IN = 34;
const FADE_OUT = 15;

interface CardProps {
  durationInFrames: number;
}

const InfoRow: React.FC<{
  label: string;
  value: string;
  opacity: number;
}> = ({ label, value, opacity }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 20,
      opacity,
      marginBottom: 20,
    }}
  >
    <div
      style={{
        fontSize: 30,
        fontWeight: 600,
        color: "rgba(255, 180, 100, 0.9)",
        minWidth: 120,
        flexShrink: 0,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: 34,
        fontWeight: 300,
        color: "rgba(250, 250, 250, 0.85)",
        lineHeight: 1.45,
      }}
    >
      {value}
    </div>
  </div>
);

export const Card03: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [20, 0], { extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [BODY_IN, BODY_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const tipOpacity = interpolate(frame, [TIP_IN, TIP_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(165deg, #0d1117 0%, #1a0a00 50%, #2d1810 100%)",
        opacity: fadeOut,
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          right: 80,
          height: 1,
          background: "linear-gradient(90deg, rgba(255,180,100,0.4), transparent)",
          opacity: bodyOpacity,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 80px 90px 80px",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
            color: "rgba(255, 180, 100, 0.6)",
            marginBottom: 16,
            opacity: titleOpacity,
          }}
        >
          VISIT INFO
        </div>
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#FAFAFA",
            lineHeight: 1.25,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 48,
          }}
        >
          방문 전 알아두세요
        </h2>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
          <InfoRow label="위치" value="삿포로 스텔라플레이스 6F (JR 삿포로역 직결)" opacity={bodyOpacity} />
          <InfoRow label="영업" value="11:00 ~ 23:00 (L.O 22:15)" opacity={bodyOpacity} />
          <InfoRow label="가격" value="1접시 ¥143~ / 1인 평균 ¥2,000~3,000" opacity={bodyOpacity} />
          <InfoRow label="대기" value="점심 30~60분 / 평일 저녁이 비교적 여유" opacity={bodyOpacity} />
        </div>
        {/* Tip box */}
        <div
          style={{
            background: "rgba(255, 180, 100, 0.08)",
            border: "1px solid rgba(255, 180, 100, 0.2)",
            borderRadius: 16,
            padding: "28px 32px",
            opacity: tipOpacity,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "rgba(255, 200, 140, 0.9)",
              marginBottom: 10,
            }}
          >
            TIP
          </div>
          <p
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "rgba(250, 250, 250, 0.75)",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            오픈 직후 11시 방문이 대기 최소!{"\n"}
            발권기에서 번호표 뽑고 주변 쇼핑 후 입장하세요.
          </p>
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
          color: "rgba(255, 255, 255, 0.4)",
        }}
      >
        3 / 3
      </div>
    </AbsoluteFill>
  );
};
