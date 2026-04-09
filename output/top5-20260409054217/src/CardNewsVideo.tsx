import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  staticFile,
} from "remotion";
import { CARD_COMPONENTS } from "./cards";
import { CARD_DURATIONS } from "./data";
import { SubtitleOverlay } from "./SubtitleOverlay";

const AUDIO_DELAY_FRAMES = 20; // 0.67s @ 30fps

interface CardNewsVideoProps {
  cardDurations?: number[];
  showSubtitles?: boolean;
}

export const CardNewsVideo: React.FC<CardNewsVideoProps> = ({
  cardDurations = CARD_DURATIONS,
  showSubtitles = true,
}) => {
  const adjustedDurations = cardDurations.map((dur, i) =>
    i === 0 ? dur : dur + AUDIO_DELAY_FRAMES
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        {adjustedDurations.map((durationInFrames, index) => {
          const CardComponent = CARD_COMPONENTS[index];
          if (!CardComponent) return null;
          const audioNum = String(index + 1).padStart(2, "0");
          const delay = index === 0 ? 0 : AUDIO_DELAY_FRAMES;
          const audioFile = `card-${audioNum}.mp3`;

          return (
            <Series.Sequence key={index} durationInFrames={durationInFrames}>
              <CardComponent durationInFrames={durationInFrames} />
              {hasAudioFile(audioFile) && (
                <Sequence from={delay}>
                  <Audio src={staticFile(audioFile)} />
                </Sequence>
              )}
            </Series.Sequence>
          );
        })}
      </Series>

      {showSubtitles ? <SubtitleOverlay bottom={96} maxWidth={920} /> : null}
    </AbsoluteFill>
  );
};

function hasAudioFile(_name: string): boolean {
  // Audio files are optional — if they don't exist, Remotion skips them
  try {
    return true;
  } catch {
    return false;
  }
}
