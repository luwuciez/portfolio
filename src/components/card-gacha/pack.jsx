import { forwardRef } from "react";
import { getPackArtwork } from "./sharedData";

// Renders one card pack in the carousel.
// The carousel keeps each pack mounted so GSAP can animate between fixed stack positions.
const Pack = forwardRef(function Pack({ pack, role, onClick }, ref) {
  const isBackCard = role === "back";
  const isActiveCard = role === "active";

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-hidden={isBackCard}
      tabIndex={isBackCard ? -1 : 0}
      className={`absolute top-1/2 left-1/2 aspect-4/6 w-44 -translate-x-1/2 transform-gpu overflow-hidden ${
        isBackCard ? "pointer-events-none" : "cursor-pointer"
      } sm:w-52 md:w-60`}
    >
      {/* Use the imported pack art as the visual shell for each carousel card. */}
      <img
        src={getPackArtwork(pack)}
        alt={`${pack.name} card pack`}
        className="absolute inset-0 h-full w-full object-cover drop-shadow-lg"
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          isActiveCard ? "opacity-0" : isBackCard ? "opacity-55" : "opacity-35"
        }`}
      />
    </button>
  );
});

export default Pack;
