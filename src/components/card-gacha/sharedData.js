import fanartPack from "../../assets/gacha/fanart_pack.svg";
import keycharmPack from "../../assets/gacha/keycharm_pack.svg";
import originalPack from "../../assets/gacha/original_pack.svg";
import personalPack from "../../assets/gacha/personal_pack.svg";

export const PHASES = {
  carousel: "carousel",
  rip: "rip",
  reveal: "reveal",
};

// Tear line position
export const TEAR_Y_FRACTION = 0.12;

// The drag must begin on the left edge and pass this threshold to open the pack.
export const RIP_START_FRACTION = 0.2;
export const RIP_COMPLETE_THRESHOLD = 0.8;

// Shared button styles keep the phase components visually consistent.
export const ACTION_BUTTON_CLASS =
  "mx-auto block w-full max-w-75 rounded-full bg-surface/80 backdrop-blur-xs py-3 text-center text-lg md:text-xl border border-light/0 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200";

export const ARROW_BUTTON_CLASS =
  "flex h-12 w-12 items-center justify-center rounded-full border border-light/0 bg-surface/80 p-1 backdrop-blur-xs transition-all duration-200 hover:cursor-pointer hover:border-light/10 hover:shadow-custom";

// Carousel navigation wraps around so the pack list behaves like a loop.
export const getWrappedIndex = (index, total) => ((index % total) + total) % total;

// Reveals a random card from the currently selected pack.
export const getRandomCard = (cards) => cards[Math.floor(Math.random() * cards.length)];

const PACK_ART_BY_NAME = {
  "Fan Art": fanartPack,
  "Original Art": originalPack,
  "Key Charms": keycharmPack,
  Personal: personalPack,
};

/* 
const key = pack ? pack.name : undefined;
const result =
  PACK_ART_BY_NAME[key] !== null && PACK_ART_BY_NAME[key] !== undefined
    ? PACK_ART_BY_NAME[key]
    : fanartPack;
*/
export const getPackArtwork = (pack) => PACK_ART_BY_NAME[pack?.name] ?? fanartPack;

// Ref state for pointer dragging lives outside React state to avoid re-rendering on every move.
export const createRipState = () => ({
  pointerId: null,
  dragging: false,
  packStartX: 0,
  furthestX: 0,
  packWidth: 1,
});
