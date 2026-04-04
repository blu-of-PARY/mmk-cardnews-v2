import React from "react";
import { Composition } from "remotion";
import { CardNewsVideo } from "./CardNewsVideo";
import { CardNewsVerticalVideo } from "./CardNewsVerticalVideo";
import { CardStill } from "./CardStill";
import {
  CARD_DURATIONS,
  CARD_HEIGHT,
  CARD_WIDTH,
  FPS,
  TOTAL_FRAMES,
  VERTICAL_HEIGHT,
  VERTICAL_WIDTH,
} from "./data";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video with subtitles */}
      <Composition
        id="CardNewsVideo"
        component={CardNewsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        defaultProps={{
          cardDurations: CARD_DURATIONS,
          showSubtitles: true,
        }}
      />
      {/* Video without subtitles */}
      <Composition
        id="CardNewsVideoClean"
        component={CardNewsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        defaultProps={{
          cardDurations: CARD_DURATIONS,
          showSubtitles: false,
        }}
      />
      {/* Vertical video (9:16) */}
      <Composition
        id="CardNewsVerticalVideo"
        component={CardNewsVerticalVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VERTICAL_WIDTH}
        height={VERTICAL_HEIGHT}
        defaultProps={{
          cardDurations: CARD_DURATIONS,
          showSubtitles: true,
        }}
      />
      <Composition
        id="CardNewsVerticalVideoClean"
        component={CardNewsVerticalVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VERTICAL_WIDTH}
        height={VERTICAL_HEIGHT}
        defaultProps={{
          cardDurations: CARD_DURATIONS,
          showSubtitles: false,
        }}
      />
      {/* Single card still (for PNG export) */}
      <Composition
        id="CardStill"
        component={CardStill}
        durationInFrames={150}
        fps={FPS}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        defaultProps={{
          cardIndex: 0,
        }}
      />
    </>
  );
};
