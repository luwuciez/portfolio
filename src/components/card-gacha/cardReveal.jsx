import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Card from "./card";

// The reveal overlay sits on top of the rip phase, darkens the background,
// and hands the actual card interaction to RevealCard.
export default function CardReveal({ revealedCard, revealedCount, totalCards, onSelectAnother }) {
  const overlayRef = useRef(null);
  const revealWidth = revealedCard.orientation === "landscape" ? "520px" : "360px";

  useEffect(() => {
    // Fade the overlay in before the card pop animation runs.
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={onSelectAnother}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 px-6 font-figtree backdrop-blur-[2px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full flex-col items-center"
        style={{ maxWidth: revealWidth }}
      >
        <p className="mb-2 text-center text-xl font-semibold text-light md:text-2xl">
          {revealedCard.name}
        </p>
        <p className="mb-6 text-center text-lg text-light">
          Collected: {revealedCount}/{totalCards}
        </p>

        <Card card={revealedCard} />

        <button
          type="button"
          onClick={onSelectAnother}
          className="mx-auto mt-10 block w-full max-w-75 rounded-full bg-light py-3 text-center text-lg text-dark hover:cursor-pointer md:text-xl"
        >
          Select Another Pack
        </button>
      </div>
    </div>
  );
}
