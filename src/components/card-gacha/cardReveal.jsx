import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Card from "./card";

// The reveal overlay sits on top of the rip phase, darkens the background,
// and hands the actual card interaction to RevealCard.
export default function CardReveal({ revealedCard, onSelectAnother }) {
  const overlayRef = useRef(null);

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 px-6 font-figtree backdrop-blur-[2px]"
    >
      <p className="mb-6 text-center text-xl font-semibold text-light md:text-2xl">
        {revealedCard.name}
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
  );
}
