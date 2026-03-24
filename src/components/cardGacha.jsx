import { useEffect, useRef, useState } from "react";

import PackCarousel from "./card-gacha/phaseCarousel";
import RevealPhase from "./card-gacha/phaseReveal";
import RipPhase from "./card-gacha/phaseRip";
import { PACKS } from "./card-gacha/packData";
import {
  createRipState,
  getRandomCard,
  getWrappedIndex,
  PHASES,
  RIP_COMPLETE_THRESHOLD,
  RIP_START_FRACTION,
} from "./card-gacha/sharedData";

// Coordinates the three-step experience:
// 1. choose a pack
// 2. drag to rip it open
// 3. reveal a random artwork card
export default function CardGacha() {
  const [phase, setPhase] = useState(PHASES.carousel);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(null);
  const [ripProgress, setRipProgress] = useState(0);
  const [revealedCard, setRevealedCard] = useState(null);
  const [isRipDragging, setIsRipDragging] = useState(false);

  // Pointer drag details live in a ref so the component does not re-render on every move event.
  const ripStateRef = useRef(createRipState());

  // Stores and restores the page selection style while dragging across the pack.
  const selectionStyleRef = useRef("");

  const selectedPack = selectedPackIndex === null ? null : PACKS[selectedPackIndex];

  const getRipMetrics = (surfaceElement) => {
    const surfaceRect = surfaceElement.getBoundingClientRect();
    const packElement = surfaceElement.querySelector("[data-rip-pack]");
    const packRect = packElement?.getBoundingClientRect() ?? surfaceRect;

    return {
      surfaceRect,
      packStartX: Math.max(0, packRect.left - surfaceRect.left),
      packWidth: packRect.width || surfaceRect.width,
    };
  };

  const lockPageSelection = () => {
    selectionStyleRef.current = document.body.style.userSelect;
    document.body.style.userSelect = "none";
  };

  const unlockPageSelection = () => {
    document.body.style.userSelect = selectionStyleRef.current;
  };

  useEffect(() => {
    // Ensure the page is returned to its normal selection behavior on unmount.
    return () => {
      unlockPageSelection();
    };
  }, []);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => getWrappedIndex(currentIndex - 1, PACKS.length));
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => getWrappedIndex(currentIndex + 1, PACKS.length));
  };

  const goToIndex = (index) => {
    setActiveIndex(getWrappedIndex(index, PACKS.length));
  };

  const resetRipInteraction = () => {
    ripStateRef.current = createRipState();
    setRipProgress(0);
    setIsRipDragging(false);
  };

  const resetToCarousel = () => {
    unlockPageSelection();
    setPhase(PHASES.carousel);
    setSelectedPackIndex(null);
    setRevealedCard(null);
    resetRipInteraction();
  };

  const handleSelectPack = () => {
    // Save the currently highlighted pack and move into the rip interaction.
    setSelectedPackIndex(activeIndex);
    setRevealedCard(null);
    resetRipInteraction();
    setPhase(PHASES.rip);
  };

  const revealRandomCard = () => {
    if (!selectedPack) return;

    // Lock the rip line at 100%, then show a random card from the chosen pack.
    setIsRipDragging(false);
    unlockPageSelection();
    setRipProgress(1);
    setRevealedCard(getRandomCard(selectedPack.cards));
    setPhase(PHASES.reveal);
  };

  const handleRipPointerDown = (event) => {
    const { surfaceRect, packStartX, packWidth } = getRipMetrics(event.currentTarget);
    const localX = Math.min(Math.max(event.clientX - surfaceRect.left, 0), surfaceRect.width);
    const maxStartX = packStartX + packWidth * RIP_START_FRACTION;

    // Allow the tear to begin in the left gutter or near the pack's left edge.
    if (localX > maxStartX) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    ripStateRef.current = {
      pointerId: event.pointerId,
      dragging: true,
      packStartX,
      furthestX: localX,
      packWidth,
    };
    setIsRipDragging(true);
    lockPageSelection();
    setRipProgress(0);
  };

  const handleRipPointerMove = (event) => {
    const ripState = ripStateRef.current;
    if (!ripState.dragging || ripState.pointerId !== event.pointerId) return;

    const { surfaceRect } = getRipMetrics(event.currentTarget);
    const localX = Math.min(Math.max(event.clientX - surfaceRect.left, 0), surfaceRect.width);

    // Track only forward motion so the tear cannot be "undone" by dragging backward.
    if (localX > ripState.furthestX) {
      ripState.furthestX = localX;
    }

    const nextProgress = Math.max(
      0,
      (ripState.furthestX - ripState.packStartX) / ripState.packWidth,
    );
    setRipProgress(Math.min(1, nextProgress));

    if (nextProgress >= RIP_COMPLETE_THRESHOLD) {
      ripState.dragging = false;
      setIsRipDragging(false);
      revealRandomCard();
    }
  };

  const handleRipPointerUp = (event) => {
    const ripState = ripStateRef.current;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (ripState.pointerId !== event.pointerId) return;

    // If the threshold was not met, reset the tear line and wait for another attempt.
    ripState.dragging = false;
    ripState.pointerId = null;
    setIsRipDragging(false);
    unlockPageSelection();
    setRipProgress(0);
  };

  if ((phase === PHASES.rip || phase === PHASES.reveal) && selectedPack) {
    return (
      <>
        <RipPhase
          selectedPack={selectedPack}
          ripProgress={ripProgress}
          isRipDragging={isRipDragging}
          onPointerDown={handleRipPointerDown}
          onPointerMove={handleRipPointerMove}
          onPointerUp={handleRipPointerUp}
          onBack={resetToCarousel}
        />

        {/* The reveal overlay is layered on top of the rip phase once the pack opens. */}
        {phase === PHASES.reveal && revealedCard && (
          <RevealPhase revealedCard={revealedCard} onSelectAnother={resetToCarousel} />
        )}
      </>
    );
  }

  return (
    <PackCarousel
      packs={PACKS}
      activeIndex={activeIndex}
      onGoPrevious={goToPrevious}
      onGoNext={goToNext}
      onJumpToIndex={goToIndex}
      onSelectPack={handleSelectPack}
    />
  );
}
