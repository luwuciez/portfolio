import { useEffect, useLayoutEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

import Pack from "./pack";
import { ACTION_BUTTON_CLASS, ARROW_BUTTON_CLASS } from "./sharedData";

const getPackRole = (index, activeIndex, total) => {
  const offset = (index - activeIndex + total) % total;

  if (offset === 0) return "active";
  if (offset === 1) return "right";
  if (offset === total - 1) return "left";
  return "back";
};

const getCardTarget = (role, sideOffset) => {
  if (role === "active") {
    return { x: 0, y: 0, yPercent: -50, scale: 1.1, opacity: 1, zIndex: 4, rotate: 0 };
  }

  if (role === "left") {
    return {
      x: -sideOffset,
      y: 28,
      yPercent: -50,
      scale: 0.84,
      opacity: 1,
      zIndex: 3,
      rotate: -9,
    };
  }

  if (role === "right") {
    return {
      x: sideOffset,
      y: 28,
      yPercent: -50,
      scale: 0.84,
      opacity: 1,
      zIndex: 3,
      rotate: 9,
    };
  }

  return { x: 0, y: 52, yPercent: -50, scale: 0.72, opacity: 0.62, zIndex: 1, rotate: 0 };
};

// The carousel is the "choose a pack" phase.
// It only receives view data and callbacks, so the parent owns the actual state changes.
export default function PackCarousel({
  packs,
  activeIndex,
  onGoPrevious,
  onGoNext,
  onJumpToIndex,
  onSelectPack,
}) {
  const stackRef = useRef(null);
  const packRefs = useRef([]);
  const hasMountedRef = useRef(false);

  const applyCardLayout = (shouldAnimate) => {
    const stackElement = stackRef.current;
    if (!stackElement) return;

    const sideOffset = Math.min(Math.max(stackElement.offsetWidth * 0.25, 80), 180);

    packs.forEach((pack, index) => {
      const cardElement = packRefs.current[index];
      if (!cardElement) return;

      const role = getPackRole(index, activeIndex, packs.length);
      const target = getCardTarget(role, sideOffset);
      const method = shouldAnimate ? "to" : "set";

      gsap.killTweensOf(cardElement);
      gsap[method](cardElement, {
        ...target,
        duration: shouldAnimate ? 0.45 : 0,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  useLayoutEffect(() => {
    applyCardLayout(hasMountedRef.current);
    hasMountedRef.current = true;
  }, [activeIndex, packs]);

  useEffect(() => {
    const handleResize = () => {
      applyCardLayout(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, packs]);

  return (
    <section className="mx-auto w-full px-6 py-6 font-figtree text-light">
      <p className="mx-6 my-6 text-center text-xl text-light font-bold">
        ✨ Open a card pack to view a mystery artwork ✨
      </p>

      <div ref={stackRef} className="relative mx-auto h-80 w-full max-w-4xl sm:h-92 md:h-120">
        {packs.map((pack, index) => {
          const role = getPackRole(index, activeIndex, packs.length);
          const handleClick =
            index === activeIndex
              ? onSelectPack
              : role === "back"
                ? undefined
                : () => onJumpToIndex(index);

          return (
            <Pack
              key={pack.id}
              ref={(node) => {
                packRefs.current[index] = node;
              }}
              pack={pack}
              role={role}
              onClick={handleClick}
            />
          );
        })}
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-75 items-center justify-between gap-4">
        <button
          type="button"
          onClick={onGoPrevious}
          aria-label="Previous pack"
          className={ARROW_BUTTON_CLASS}
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        <p className="flex-1 text-center text-xl font-semibold text-light md:text-2xl">
          {packs[activeIndex].name}
        </p>

        <button
          type="button"
          onClick={onGoNext}
          aria-label="Next pack"
          className={ARROW_BUTTON_CLASS}
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>

      {/* This button mirrors the click target on the center card for accessibility. */}
      <button type="button" onClick={onSelectPack} className={`${ACTION_BUTTON_CLASS} mt-6`}>
        Select Pack
      </button>
    </section>
  );
}
