import {Card01} from "./Card01";
import {Card02} from "./Card02";
import {Card03} from "./Card03";

export type CardComponentProps = {
  durationInFrames: number;
};

export const CARD_COMPONENTS = [
  Card01,
  Card02,
  Card03,
];

export const CARD_ASSETS = [
  "card-01.png",
  "card-02.png",
  "card-03.png",
];
