import {Card01} from "./Card01";
import {Card02} from "./Card02";
import {Card03} from "./Card03";
import {Card04} from "./Card04";
import {Card05} from "./Card05";
import {Card06} from "./Card06";
import {Card07} from "./Card07";

export type CardComponentProps = {
  durationInFrames: number;
};

export const CARD_COMPONENTS = [
  Card01,
  Card02,
  Card03,
  Card04,
  Card05,
  Card06,
  Card07,
];

export const CARD_ASSETS = [
  "card-01.png",
  "card-02.png",
  "card-03.png",
  "card-04.png",
  "card-05.png",
  "card-06.png",
  "card-07.png",
];
