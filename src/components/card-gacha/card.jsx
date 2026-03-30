import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Owns the card-specific animation state:
// entrance motion, hover tilt, shine tracking, and front/back flipping.
export default function Card({ card }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [shineVisible, setShineVisible] = useState(false);

  useEffect(() => {
    // Pop the revealed card into view after the overlay fades in.
    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)" },
    );
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (flipped || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      // Translate cursor position into a subtle 3D tilt on the card.
      gsap.to(cardRef.current, {
        rotateY: x * 24,
        rotateX: -y * 24,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 900,
      });

      // Move the specular shine so it follows the pointer.
      setShinePos({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    },
    [flipped],
  );

  const handleMouseEnter = useCallback(() => {
    if (!flipped) {
      setShineVisible(true);
    }
  }, [flipped]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;

    // Relax the tilt back to neutral when the pointer leaves the card.
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      transformPerspective: 900,
    });
    setShineVisible(false);
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="w-full cursor-pointer"
        style={{
          maxWidth: card.orientation === "landscape" ? "520px" : "360px",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped((currentFlipped) => !currentFlipped)}
      >
        {/* The inner wrapper flips between the artwork front and description back. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: card.orientation === "landscape" ? "4/3" : "3/4",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Front face shows the artwork plus the moving shine overlay. */}
          <div
            className="absolute inset-0 overflow-hidden rounded-3xl bg-linear-to-br from-customPurple via-customBlue to-customGreen p-3"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={card.img}
              alt={card.name}
              className="h-full w-full rounded-2xl bg-white object-cover"
            />

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
                backgroundSize: "200% 200%",
                backgroundPosition: `${shinePos.x}% ${shinePos.y}%`,
              }}
            />
          </div>

          {/* Back face is pre-rotated so it reads correctly after the flip. */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl p-3 bg-linear-to-bl from-customPurple via-customBlue to-customGreen"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="h-full w-full rounded-2xl overflow-hidden flex items-center justify-center p-6 relative bg-light/50">
              <p className="text-left font-figtree text-base text-dark md:text-lg">{card.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-base text-light/70">
        {flipped ? "Click to flip back" : "Click card to read description"}
      </p>
    </>
  );
}
