import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const TITLE_IN = 12;
const BODY_IN = 20;
const ITEM_GAP = 8;
const FADE_OUT = 15;

interface CardProps {
  durationInFrames: number;
}

const MenuItem: React.FC<{
  emoji: string;
  name: string;
  desc: string;
  opacity: number;
}> = ({ emoji, name, desc, opacity }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 20,
      opacity,
      marginBottom: 28,
    }}
  >
    <div style={{ fontSize: 42, flexShrink: 0, marginTop: 2 }}>{emoji}</div>
    <div>
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: 6,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 300,
          color: "rgba(0, 0, 0, 0.55)",
          lineHeight: 1.45,
        }}
      >
        {desc}
      </div>
    </div>
  </div>
);

export const Card02: React.FC<CardProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [TITLE_IN, TITLE_IN + 12], [0, 1], { extrapolateRight: "clamp" });
  const item1 = interpolate(frame, [BODY_IN, BODY_IN + 10], [0, 1], { extrapolateRight: "clamp" });
  const item2 = interpolate(frame, [BODY_IN + ITEM_GAP, BODY_IN + ITEM_GAP + 10], [0, 1], { extrapolateRight: "clamp" });
  const item3 = interpolate(frame, [BODY_IN + ITEM_GAP * 2, BODY_IN + ITEM_GAP * 2 + 10], [0, 1], { extrapolateRight: "clamp" });
  const item4 = interpolate(frame, [BODY_IN + ITEM_GAP * 3, BODY_IN + ITEM_GAP * 3 + 10], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE_OUT, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)",
        opacity: fadeOut,
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, #D4764E, #E8A87C)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "90px 80px 90px 80px",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
            color: "rgba(180, 100, 60, 0.7)",
            marginBottom: 16,
            opacity: titleOpacity,
          }}
        >
          MUST-TRY MENU
        </div>
        <h2
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#1a1a1a",
            lineHeight: 1.25,
            opacity: titleOpacity,
            marginBottom: 44,
          }}
        >
          꼭 먹어야 할 메뉴 4선
        </h2>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <MenuItem emoji="🦀" name="하나사키 가니 군칸" desc="네무로 특산 꽃게, 살이 꽉 찬 진한 맛" opacity={item1} />
          <MenuItem emoji="🍣" name="히카리모노 3종" desc="고등어·전어·꽁치 — 홋카이도 근해 직송" opacity={item2} />
          <MenuItem emoji="🦐" name="보탄에비" desc="탱글한 식감, 머리째 올려주는 단새우" opacity={item3} />
          <MenuItem emoji="🍮" name="야키 푸딩" desc="디저트 강추! 캐러멜 불향 입힌 커스터드" opacity={item4} />
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
          color: "rgba(0, 0, 0, 0.3)",
        }}
      >
        2 / 3
      </div>
    </AbsoluteFill>
  );
};
