import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
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
    name: "Original Art",
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
    name: "Key Charms",
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

function PackCard({ pack, isActive, onClick, hiddenOnMobile = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-3/4 rounded-2xl w-full max-w-75 overflow-hidden cursor-pointer ${
        hiddenOnMobile ? "hidden md:block" : "block"
      } ${isActive ? "scale-100 bg-light" : "scale-80 bg-light/70"}`}
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
          style={{
            cursor:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ctext y='40' font-size='40' font-family='Dela Gothic One' fill='black' stroke='white' stroke-width='2'%3E%E2%86%92%3C/text%3E%3C/svg%3E\") 0 10, e-resize",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
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
//
// The revealed card has two interactions:
//   • Hover  — pointer position relative to the card drives a 3D tilt via
//              inline CSS transform (rotateX + rotateY). Tilt is disabled while
//              the card is flipped so the CSS flip transition runs unobstructed.
//              On mouse leave, GSAP springs the tilt back to 0,0.
//   • Click  — flips the card 180° on the Y axis to reveal the description.

function RevealPhase({ revealedCard, onSelectAnother }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null); // GSAP entrance target + tilt container
  const flipRef = useRef(null); // inner flip assembly (receives rotateY)
  const [flipped, setFlipped] = useState(false);
  // Tracks pointer position (0–100) within the card for the shine gradient
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [shineVisible, setShineVisible] = useState(false);

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

  // 3D tilt: map pointer position within the card to rotateX/Y.
  // Also updates shinePos so the specular highlight follows the cursor.
  // Disabled while flipped so the CSS flip transition runs unobstructed.
  const handleMouseMove = useCallback(
    (e) => {
      if (flipped || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      // Normalise pointer to -0.5 … +0.5 relative to card centre
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Max tilt of ±12°; pointer right → positive rotateY, pointer up → positive rotateX
      gsap.to(cardRef.current, {
        rotateY: x * 24,
        rotateX: -y * 24,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 900,
      });
      // Update shine position as percentage within the card (0–100)
      setShinePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [flipped],
  );

  // On leave, spring tilt back to neutral and fade the shine out
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      transformPerspective: 900,
    });
    setShineVisible(false);
  }, []);

  // Show shine as soon as the pointer enters
  const handleMouseEnter = useCallback(() => {
    if (!flipped) setShineVisible(true);
  }, [flipped]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 font-figtree bg-black/70 backdrop-blur-[2px]"
    >
      {/* Card name */}
      <p className="text-light text-center text-xl md:text-2xl mb-6 font-semibold">
        {revealedCard.name}
      </p>

      {/* Tilt + GSAP entrance wrapper — pointer events drive rotateX/Y via GSAP */}
      <div
        ref={cardRef}
        className="w-full cursor-pointer"
        style={{
          maxWidth: revealedCard.orientation === "landscape" ? "520px" : "360px",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Flip assembly — rotates 180° on Y axis when flipped is true.
            transformStyle preserve-3d propagates the tilt from the parent. */}
        <div
          ref={flipRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: revealedCard.orientation === "landscape" ? "4/3" : "3/4",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Front face — artwork image + shine overlay */}
          <div
            className="overflow-hidden rounded-3xl absolute inset-0 p-3 bg-linear-to-br from-customPurple via-customBlue to-customGreen"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={revealedCard.img}
              alt={revealedCard.name}
              className="h-full w-full object-cover bg-white rounded-2xl"
            />
            {/* Reflective shine overlay — a fixed-angle linear gradient band that
                slides left/right across the card as the mouse moves horizontally.
                The strip is wider than the card (200% width) so it can travel fully
                off either edge without clipping abruptly.
                - Fixed 135° slant (top-right → bottom-left)
                - backgroundPosition X maps mouse X (0–100%) to band travel (-50%…50%)
                - pointer-events:none so it never blocks clicks */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                pointerEvents: "none",
                opacity: shineVisible ? 1 : 0,
                transition: "opacity 0.4s ease",
                background: `linear-gradient(
                  135deg,
                  transparent 30%,
                  rgba(255,255,255,0.1) 40%,
                  rgba(255,255,255,0.4) 50%,
                  rgba(255,255,255,0.1) 60%,
                  transparent 70%
                )`,
                // Oversized so the band can slide fully across the card
                backgroundSize: "200% 200%",
                // Mouse X 0→100% moves the band from off-left to off-right
                backgroundPosition: `${shinePos.x}% 0%`,
              }}
            />
          </div>

          {/* Back face — description; pre-rotated 180° so it reads correctly when flipped */}
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
          hiddenOnMobile={true}
        />

        {/* Center pack */}
        <PackCard pack={activePack} isActive={true} onClick={handleSelectPack} />

        {/* Right pack */}
        <PackCard
          pack={nextPack}
          isActive={false}
          onClick={() => goToIndex(nextIndex)}
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
