import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
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
const getRandomCard = (cards) => cards[Math.floor(Math.random() * cards.length)];

// Tear line sits 25% from the top of the pack
const TEAR_Y_FRACTION = 0.25;

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

// ── Rip phase ─────────────────────────────────────────────────────────────────
// The pack renders with a dashed tear guide near the top (TEAR_Y_FRACTION).
// As the user drags left→right, a solid cut line draws along that guide.
// Releasing after < threshold snaps progress back to 0.

function RipPhase({
  selectedPack,
  ripProgress,
  isRipDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onBack,
}) {
  return (
    <section
      className="mx-auto w-full px-6 py-12 font-figtree text-light flex flex-col"
      style={{ userSelect: isRipDragging ? "none" : undefined }}
    >
      <p className="font-figtree text-light text-center text-lg mx-6 my-6">
        {"➡️ Drag across to rip open the pack ➡️"}
      </p>

      <div className="mx-auto w-full max-w-75">
        <div
          className="relative aspect-3/4 rounded-2xl w-full overflow-hidden bg-light"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: "none", cursor: isRipDragging ? "crosshair" : "ew-resize" }}
        >
          {/* Pack label */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="text-center font-dela uppercase text-dark text-xl md:text-2xl">
              {selectedPack.name}
            </span>
          </div>

          {/* Dashed tear guide — sits near the top */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${TEAR_Y_FRACTION * 100}%`,
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 5px, transparent 5px, transparent 10px)",
            }}
          />

          {/* Solid cut line — grows from left as progress increases */}
          {ripProgress > 0 && (
            <div
              className="absolute left-0 pointer-events-none"
              style={{
                top: `${TEAR_Y_FRACTION * 100}%`,
                height: "2px",
                width: `${ripProgress * 100}%`,
                background: "rgba(0,0,0,0.55)",
              }}
            />
          )}
        </div>
      </div>

      {/* Spacer: pushes back button to same vertical position as Select Pack */}
      <div className="mx-auto mt-8 w-full max-w-75 h-12" />

      <button
        type="button"
        onClick={onBack}
        className="mx-auto mt-6 block w-full max-w-75 rounded-full bg-surface/80 backdrop-blur-xs py-3 text-center text-lg md:text-xl border border-light/0 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200"
      >
        Back
      </button>
    </section>
  );
}

// ── Reveal phase ──────────────────────────────────────────────────────────────
// Rendered as a fixed overlay on top of the rip phase. Background is darkened
// and blurred. Card pops in via GSAP. Confetti fires via tsparticles.

function RevealPhase({ revealedCard, onSelectAnother }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

  // Init tsparticles confetti preset once
  const particlesInit = useCallback(async () => {
    await loadConfettiPreset(tsParticles);
    setParticlesReady(true);
  }, []);

  useEffect(() => {
    particlesInit();
  }, [particlesInit]);

  // GSAP: fade in overlay, then pop card up
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    ).fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)" },
      "-=0.1",
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 font-figtree bg-black/70 backdrop-blur-[2px]"
    >
      {/* Confetti */}
      {particlesReady && (
        <Particles
          id="reveal-confetti"
          className="absolute inset-0 pointer-events-none"
          options={{
            preset: "confetti",
            particles: { number: { value: 0 } },
            emitters: {
              position: { x: 50, y: 30 },
              rate: { delay: 0.1, quantity: 20 },
              life: { count: 1, duration: 0.6 },
            },
            fullScreen: false,
          }}
        />
      )}

      {/* Card name */}
      <p className="text-light text-center text-xl md:text-2xl mb-6 font-semibold">
        {revealedCard.name}
      </p>

      {/* Flippable card */}
      <div
        ref={cardRef}
        onClick={() => setFlipped((f) => !f)}
        className="w-full cursor-pointer"
        style={{
          maxWidth: revealedCard.orientation === "landscape" ? "520px" : "360px",
          perspective: "900px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: revealedCard.orientation === "landscape" ? "4/3" : "3/4",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Front — artwork */}
          <div
            className="overflow-hidden rounded-2xl bg-light"
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={revealedCard.img}
              alt={revealedCard.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Back — description */}
          <div
            className="overflow-hidden rounded-2xl bg-light flex items-center justify-center p-6"
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-dark text-center font-figtree text-base md:text-lg">
              {revealedCard.desc}
            </p>
          </div>
        </div>
      </div>

      <p className="text-light/70 text-center text-base mt-3">
        {flipped ? "Click to flip back" : "Click card to read description"}
      </p>

      <button
        type="button"
        onClick={onSelectAnother}
        className="mx-auto mt-10 block w-full max-w-75 rounded-full bg-light py-3 text-center text-lg md:text-xl hover:cursor-pointer text-dark"
      >
        Select Another Pack
      </button>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function CardGacha() {
  const [phase, setPhase] = useState("carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(null);
  const [ripProgress, setRipProgress] = useState(0);
  const [revealedCard, setRevealedCard] = useState(null);
  const [isRipDragging, setIsRipDragging] = useState(false);
  const ripStateRef = useRef({
    pointerId: null,
    dragging: false,
    startX: 0,
    furthestX: 0,
    width: 1,
  });

  const selectionStyleRef = useRef({ userSelect: "" });

  const total = PACKS.length;
  const selectedPack = selectedPackIndex === null ? null : PACKS[selectedPackIndex];

  const lockPageSelection = () => {
    selectionStyleRef.current.userSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";
  };

  const unlockPageSelection = () => {
    document.body.style.userSelect = selectionStyleRef.current.userSelect;
  };

  useEffect(() => {
    return () => {
      unlockPageSelection();
    };
  }, []);

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

  const goToIndex = (index) => setActiveIndex(getWrappedIndex(index, total));
  const handlePrevious = () => goToIndex(activeIndex - 1);
  const handleNext = () => goToIndex(activeIndex + 1);

  const resetRipState = () => {
    ripStateRef.current = { pointerId: null, dragging: false, startX: 0, furthestX: 0, width: 1 };
    setRipProgress(0);
    setIsRipDragging(false);
  };

  const handleSelectPack = () => {
    setSelectedPackIndex(activeIndex);
    setRevealedCard(null);
    resetRipState();
    setPhase("rip");
  };

  const handleReveal = () => {
    if (!selectedPack) return;
    setIsRipDragging(false);
    unlockPageSelection();
    setRipProgress(1);
    setRevealedCard(getRandomCard(selectedPack.cards));
    setPhase("reveal");
  };

  // ── Pointer handlers for the rip drag ──────────────────────────────────────
  // Must begin on the left 25% of the pack. Only moves forward (furthest X tracked).
  // Snaps back to 0 on release if threshold not met.

  const handleRipPointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    if (localX > rect.width * 0.25) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    ripStateRef.current = {
      pointerId: event.pointerId,
      dragging: true,
      startX: localX,
      furthestX: localX,
      width: rect.width,
    };
    setIsRipDragging(true);
    lockPageSelection();
    setRipProgress(0);
  };

  const handleRipPointerMove = (event) => {
    const ripState = ripStateRef.current;
    if (!ripState.dragging || ripState.pointerId !== event.pointerId) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const localX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    if (localX > ripState.furthestX) ripState.furthestX = localX;

    const nextProgress = Math.max(0, (ripState.furthestX - ripState.startX) / ripState.width);
    setRipProgress(Math.min(1, nextProgress));

    if (nextProgress >= 0.82) {
      ripState.dragging = false;
      setIsRipDragging(false);
      handleReveal();
    }
  };

  const handleRipPointerUp = (event) => {
    const ripState = ripStateRef.current;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (ripState.pointerId !== event.pointerId) return;

    // Snap back if threshold not met
    ripState.dragging = false;
    ripState.pointerId = null;
    setIsRipDragging(false);
    unlockPageSelection();
    setRipProgress(0);
  };

  const handleBackToCarousel = () => {
    unlockPageSelection();
    setPhase("carousel");
    setSelectedPackIndex(null);
    setRevealedCard(null);
    resetRipState();
  };

  const handleSelectAnotherPack = () => {
    unlockPageSelection();
    setPhase("carousel");
    setSelectedPackIndex(null);
    setRevealedCard(null);
    resetRipState();
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (phase === "rip" || phase === "reveal") {
    return (
      <>
        <RipPhase
          selectedPack={selectedPack}
          ripProgress={ripProgress}
          isRipDragging={isRipDragging}
          onPointerDown={handleRipPointerDown}
          onPointerMove={handleRipPointerMove}
          onPointerUp={handleRipPointerUp}
          onBack={handleBackToCarousel}
        />
        {phase === "reveal" && revealedCard && (
          <RevealPhase revealedCard={revealedCard} onSelectAnother={handleSelectAnotherPack} />
        )}
      </>
    );
  }

  return (
    <section className="mx-auto w-full px-6 py-12 font-figtree text-light">
      <p className="font-figtree text-light text-center text-lg mx-6 my-6">
        ✨ Open a card pack to view a random artwork ✨
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
        onClick={handleSelectPack}
        className="mx-auto mt-6 block w-full max-w-75 rounded-full bg-surface/80 backdrop-blur-xs py-3 text-center text-lg md:text-xl border border-light/0 hover:cursor-pointer hover:border-light/10 hover:shadow-custom transition-all duration-200"
      >
        Select Pack
      </button>
    </section>
  );
}
