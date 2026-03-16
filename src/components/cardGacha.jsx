import { useState, useRef, useCallback, useEffect } from "react";

const PACKS = [
  {
    id: 1,
    name: "Fanart Pack",
    cards: [
      {
        name: "Card 1",
        img: "https://picsum.photos/seed/c1/200/300",
        desc: "Description for card 1.",
      },
      {
        name: "Card 2",
        img: "https://picsum.photos/seed/c2/200/300",
        desc: "Description for card 2.",
      },
    ],
  },
  {
    id: 2,
    name: "Pack B",
    cards: [
      {
        name: "Card 3",
        img: "https://picsum.photos/seed/c3/200/300",
        desc: "Description for card 3.",
      },
      {
        name: "Card 4",
        img: "https://picsum.photos/seed/c4/200/300",
        desc: "Description for card 4.",
      },
    ],
  },
  {
    id: 3,
    name: "Pack C",
    cards: [
      {
        name: "Card 5",
        img: "https://picsum.photos/seed/c5/200/300",
        desc: "Description for card 5.",
      },
      {
        name: "Card 6",
        img: "https://picsum.photos/seed/c6/200/300",
        desc: "Description for card 6.",
      },
    ],
  },
  {
    id: 4,
    name: "Pack D",
    cards: [
      {
        name: "Card 7",
        img: "https://picsum.photos/seed/c7/200/300",
        desc: "Description for card 7.",
      },
      {
        name: "Card 8",
        img: "https://picsum.photos/seed/c8/200/300",
        desc: "Description for card 8.",
      },
    ],
  },
  {
    id: 5,
    name: "Pack E",
    cards: [
      {
        name: "Card 9",
        img: "https://picsum.photos/seed/c9/200/300",
        desc: "Description for card 9.",
      },
      {
        name: "Card 10",
        img: "https://picsum.photos/seed/c10/200/300",
        desc: "Description for card 10.",
      },
    ],
  },
  {
    id: 6,
    name: "Pack F",
    cards: [
      {
        name: "Card 11",
        img: "https://picsum.photos/seed/c11/200/300",
        desc: "Description for card 11.",
      },
      {
        name: "Card 12",
        img: "https://picsum.photos/seed/c12/200/300",
        desc: "Description for card 12.",
      },
    ],
  },
];

// ── Carousel ──────────────────────────────────────────────────────────────────
// All packs rendered in a strip; strip is translated so selected is centred.
// Side cards are narrower/shorter than the centre card.

const CENTER_W = 110;
const CENTER_H = 150;
const SIDE_W = 75;
const SIDE_H = 115;
const GAP = 6;
// Each slot occupies CENTER_W in the strip (keeps translation math simple)
const SLOT_W = CENTER_W;
const STRIDE = SLOT_W + GAP;
// Viewport = one centre slot + two side slots
const VIEWPORT_W = 3 * STRIDE - GAP; // 3 full slots = 342px

function Carousel({ packs, selectedIndex, onSelect }) {
  const n = packs.length;

  const handlePrev = () => onSelect((selectedIndex - 1 + n) % n);
  const handleNext = () => onSelect((selectedIndex + 1) % n);

  // translateX so card at selectedIndex is centred in the viewport
  // centre of card i = i * STRIDE + SLOT_W/2
  // we want that == VIEWPORT_W/2
  const translateX = VIEWPORT_W / 2 - (selectedIndex * STRIDE + SLOT_W / 2);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={handlePrev} style={{ fontSize: 20, cursor: "pointer" }}>
          ‹
        </button>

        {/* Clipping viewport */}
        <div style={{ width: VIEWPORT_W, height: 160, overflow: "hidden" }}>
          {/* Sliding strip */}
          <div
            style={{
              display: "flex",
              gap: GAP,
              alignItems: "center",
              height: "100%",
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            {packs.map((pack, i) => {
              const isCentre = i === selectedIndex;
              const dist = Math.abs(i - selectedIndex);
              return (
                // Slot: full SLOT_W so strip spacing is uniform
                <div
                  key={pack.id}
                  style={{
                    width: SLOT_W,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Visual card: narrower for side packs */}
                  <div
                    onClick={() => onSelect(i)}
                    style={{
                      width: isCentre ? CENTER_W : SIDE_W,
                      height: isCentre ? CENTER_H : SIDE_H,
                      flexShrink: 0,
                      border: isCentre ? "2px solid black" : "1px solid #ccc",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: isCentre ? "#eee" : "#f9f9f9",
                      fontWeight: isCentre ? "bold" : "normal",
                      fontSize: isCentre ? 14 : 11,
                      color: isCentre ? "#000" : "#999",
                      opacity: dist <= 1 ? 1 : 0,
                      transition:
                        "width 0.3s ease, height 0.3s ease, opacity 0.2s ease, border 0.2s, background 0.2s",
                    }}
                  >
                    {pack.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={handleNext} style={{ fontSize: 20, cursor: "pointer" }}>
          ›
        </button>
      </div>
    </>
  );
}

// ── Rip mechanic ──────────────────────────────────────────────────────────────

const PACK_W = 120;
const PACK_H = 180;
const TEAR_Y = 0.25;

function RipPack({ onRipped }) {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const packRef = useRef(null);

  const handleStart = (clientX) => {
    const rect = packRef.current.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;
    if (rel > 0.35) return;
    setIsDragging(true);
    setProgress(0);
  };

  const handleMove = useCallback(
    (clientX) => {
      if (!isDragging) return;
      const rect = packRef.current?.getBoundingClientRect();
      if (!rect) return;
      const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setProgress(p);
      if (p >= 0.98) {
        setIsDragging(false);
        onRipped();
      }
    },
    [isDragging, onRipped],
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setProgress(0);
  }, [isDragging]);

  useEffect(() => {
    const onMove = (e) => handleMove(e.clientX);
    const onTouch = (e) => handleMove(e.touches[0].clientX);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [handleMove, handleEnd]);

  const tearY = PACK_H * TEAR_Y;
  const cutW = progress * PACK_W;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#555" }}>Slide from left to slice open</p>

      <div
        ref={packRef}
        style={{
          position: "relative",
          width: PACK_W,
          height: PACK_H,
          cursor: isDragging ? "crosshair" : "ew-resize",
          userSelect: "none",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #999",
            borderRadius: 8,
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#666",
          }}
        >
          Pack
        </div>
        {/* Dashed tear guide */}
        <div
          style={{
            position: "absolute",
            top: tearY,
            left: 0,
            right: 0,
            height: 1,
            background:
              "repeating-linear-gradient(90deg,#aaa 0px,#aaa 5px,transparent 5px,transparent 10px)",
            pointerEvents: "none",
          }}
        />
        {/* Cut line */}
        {progress > 0 && (
          <div
            style={{
              position: "absolute",
              top: tearY,
              left: 0,
              width: cutW,
              height: 2,
              background: "#222",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{Math.round(progress * 100)}% cut</p>
    </div>
  );
}

// ── Card reveal ───────────────────────────────────────────────────────────────

function CardReveal({ pack, onReset }) {
  const [card] = useState(() => pack.cards[Math.floor(Math.random() * pack.cards.length)]);
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div onClick={() => setFlipped((f) => !f)} style={{ cursor: "pointer", perspective: 800 }}>
        <div
          style={{
            width: 160,
            height: 220,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.5s",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              border: "1px solid #ccc",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src={card.img}
              alt={card.name}
              style={{ width: "100%", height: "75%", objectFit: "cover" }}
            />
            <div style={{ padding: 8, fontSize: 13, fontWeight: "bold" }}>{card.name}</div>
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#f9f9f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
              textAlign: "center",
              fontSize: 12,
              color: "#333",
            }}
          >
            {card.desc}
          </div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 11, color: "#999" }}>Click card to flip</p>
      <button onClick={onReset}>Back to packs</button>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function CardGacha() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [phase, setPhase] = useState("carousel");

  return (
    <div
      style={{
        padding: "32px 48px",
        minWidth: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ margin: 0 }}>Gacha Pull</h2>

      {phase === "carousel" && (
        <>
          <Carousel packs={PACKS} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          <p style={{ margin: 0, color: "#555" }}>
            Selected: <strong>{PACKS[selectedIndex].name}</strong>
          </p>
          <button onClick={() => setPhase("ripping")}>Open Pack</button>
        </>
      )}

      {phase === "ripping" && <RipPack onRipped={() => setPhase("reveal")} />}

      {phase === "reveal" && (
        <CardReveal pack={PACKS[selectedIndex]} onReset={() => setPhase("carousel")} />
      )}
    </div>
  );
}
