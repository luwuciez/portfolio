import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import fanart1 from "../assets/gacha/fanart/9s.png";
import fanart2 from "../assets/gacha/fanart/kaeya.png";
import fanart3 from "../assets/gacha/fanart/natsume.png";
import fanart4 from "../assets/gacha/fanart/uta.png";

import original1 from "../assets/gacha/original/shizue.png";
import original2 from "../assets/gacha/original/june_tarot.png";
import original3 from "../assets/gacha/original/rei_tarot.png";
import original4 from "../assets/gacha/original/yuSketch.png";
import original5 from "../assets/gacha/original/yuSummer.png";

import merch1 from "../assets/gacha/merch/2B.png";
import merch2 from "../assets/gacha/merch/9S.png";
import merch3 from "../assets/gacha/merch/JK.png";
import merch4 from "../assets/gacha/merch/JM.png";
import merch5 from "../assets/gacha/merch/V.png";

import personal1 from "../assets/gacha/personal/holiday_snowman.png";
import personal2 from "../assets/gacha/personal/persona1.png";
import personal3 from "../assets/gacha/personal/persona2.png";
import personal4 from "../assets/gacha/personal/valentines.png";
import personal5 from "../assets/gacha/personal/xmas_gingerbread.png";

const PACKS = [
  {
    id: 1,
    name: "Fan Art",
    cards: [
      {
        img: fanart1,
        name: "9S from Nier Automata",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: fanart2,
        name: "Kaeya from Genshin Impact",
        desc: "Description",
        orientation: "landscape",
      },
      {
        img: fanart3,
        name: "Natsume from Natsume's Book of Friends",
        desc: "Description",
        orientation: "landscape",
      },
      {
        img: fanart4,
        name: "Uta from One Piece Red",
        desc: "Description",
        orientation: "portrait",
      },
    ],
  },
  {
    id: 2,
    name: "Original",
    cards: [
      {
        img: original1,
        name: "Title",
        desc: "Description",
        orientation: "landscape",
      },
      {
        img: original2,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: original3,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: original4,
        name: "Title",
        desc: "Description",
        orientation: "landscape",
      },
      {
        img: original5,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
    ],
  },
  {
    id: 3,
    name: "Fan Merch",
    cards: [
      {
        img: merch1,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: merch2,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: merch3,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: merch4,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: merch5,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
    ],
  },
  {
    id: 4,
    name: "Personal",
    cards: [
      {
        img: personal1,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: personal2,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: personal3,
        name: "Title",
        desc: "Description",
        orientation: "landscape",
      },
      {
        img: personal4,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
      {
        img: personal5,
        name: "Title",
        desc: "Description",
        orientation: "portrait",
      },
    ],
  },
];

const getWrappedIndex = (index, total) => ((index % total) + total) % total;

function PackCard({ pack, isActive, onClick, interactive = false, hiddenOnMobile = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={interactive ? `Switch to ${pack.name}` : `${pack.name} pack`}
      className={`relative aspect-3/4 rounded-2xl w-full max-w-75 overflow-hidden transition-all duration-300 ${
        hiddenOnMobile ? "hidden md:block" : "block"
      } ${
        isActive ? "scale-100 bg-light" : "scale-80 bg-light/70"
      } ${interactive ? "cursor-pointer" : "cursor-default"}`}
      disabled={!interactive}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span
          className={`text-center font-dela uppercase ${
            isActive ? "text-dark text-xl md:text-2xl" : "text-dark/70 text-base md:text-lg"
          }`}
        >
          {pack.name}
        </span>
      </div>
    </button>
  );
}

export default function CardGacha() {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = PACKS.length;

  const { activePack, previousPack, nextPack, previousIndex, nextIndex } = useMemo(() => {
    const previous = getWrappedIndex(activeIndex - 1, total);
    const next = getWrappedIndex(activeIndex + 1, total);

    return {
      activePack: PACKS[activeIndex],
      previousPack: PACKS[previous],
      nextPack: PACKS[next],
      previousIndex: previous,
      nextIndex: next,
    };
  }, [activeIndex, total]);

  const goToIndex = (index) => {
    setActiveIndex(getWrappedIndex(index, total));
  };

  const handlePrevious = () => goToIndex(activeIndex - 1);
  const handleNext = () => goToIndex(activeIndex + 1);

  return (
    <section className="mx-auto w-full px-6 py-12 font-figtree text-light">
      <p className="font-figtree text-light text-center text-lg mx-6 my-6">
        ✨ Open a card pack to view one of my artworks ✨
      </p>
      <div className="mx-auto flex w-full items-center justify-center gap-4 md:gap-6">
        {/* Left pack */}
        <PackCard
          pack={previousPack}
          isActive={false}
          onClick={() => goToIndex(previousIndex)}
          interactive={true}
          hiddenOnMobile={true}
        />

        {/* Center pack */}
        <PackCard pack={activePack} isActive={true} />

        {/* Right pack */}
        <PackCard
          pack={nextPack}
          isActive={false}
          onClick={() => goToIndex(nextIndex)}
          interactive={true}
          hiddenOnMobile={true}
        />
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-75 items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous pack"
          className="flex items-center justify-center bg-surface/80 backdrop-blur-xs p-1 rounded-full border border-light/0 h-12 w-12 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        <p className="flex-1 text-center text-xl md:text-2xl font-semibold text-light">
          {activePack.name}
        </p>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next pack"
          className="flex items-center justify-center bg-surface/80 backdrop-blur-xs p-1 rounded-full border border-light/0 h-12 w-12 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>

      <button
        type="button"
        className="mx-auto mt-6 block w-full max-w-75 rounded-full bg-surface/80 backdrop-blur-xs py-3 text-center text-lg md:text-xl border border-light/0 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200"
      >
        Select Pack
      </button>
    </section>
  );
}
