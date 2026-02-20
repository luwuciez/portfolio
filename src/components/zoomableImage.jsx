import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

// ─── Inner Controls Bar ──────────────────────────────────────────────────────
const OverlayControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex flex-row gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
      <button
        onClick={() => zoomIn()}
        className="font-figtree text-light px-2 py-1 sm:px-3 sm:py-1.5 bg-surface border border-light/10 rounded-lg text-xs uppercase font-semibold cursor-pointer backdrop-blur-sm whitespace-nowrap"
      >
        <span className="hidden sm:inline">Zoom In </span>+
      </button>
      <button
        onClick={() => zoomOut()}
        className="font-figtree text-light px-2 py-1 sm:px-3 sm:py-1.5 bg-surface border border-light/10 rounded-lg text-xs uppercase font-semibold cursor-pointer backdrop-blur-sm whitespace-nowrap"
      >
        <span className="hidden sm:inline">Zoom Out </span>−
      </button>
      <button
        onClick={() => resetTransform()}
        className="font-figtree text-light px-2 py-1 sm:px-3 sm:py-1.5 bg-surface border border-light/10 rounded-lg text-xs uppercase font-semibold cursor-pointer backdrop-blur-sm"
      >
        Reset
      </button>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
/**
 * ZoomableImage
 *
 * Props:
 *   src       – image source
 *   alt       – alt text
 *   label     – optional label shown bottom-right of the overlay
 *   className – extra classes for the wrapper div
 *   imgClassName – extra classes for the base <img>
 */
export default function ZoomableImage({
  src,
  alt = "",
  label,
  className = "",
  imgClassName = "w-full h-full object-cover",
}) {
  const [open, setOpen] = useState(false);
  const [animState, setAnimState] = useState("closed"); // "closed" | "opening" | "open" | "closing"

  // Clip-path origin tracking for the FLIP-style animation
  const [origin, setOrigin] = useState({ x: 50, y: 50, scaleX: 1, scaleY: 1 });
  const imgWrapRef = useRef(null);

  // Calculate where the thumbnail sits on screen so we can animate FROM there
  const getOrigin = useCallback(() => {
    if (!imgWrapRef.current) return { x: 50, y: 50, scaleX: 0.2, scaleY: 0.2 };
    const rect = imgWrapRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: ((rect.left + rect.width / 2) / vw) * 100,
      y: ((rect.top + rect.height / 2) / vh) * 100,
      scaleX: rect.width / vw,
      scaleY: rect.height / vh,
    };
  }, []);

  const handleOpen = useCallback(() => {
    const o = getOrigin();
    setOrigin(o);
    setOpen(true);
    // Tiny delay so the DOM mounts before we switch to "opening"
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimState("opening"));
    });
  }, [getOrigin]);

  // Once "opening" finishes, mark as fully open
  useEffect(() => {
    if (animState === "opening") {
      const t = setTimeout(() => setAnimState("open"), 380);
      return () => clearTimeout(t);
    }
    if (animState === "closing") {
      const t = setTimeout(() => {
        setAnimState("closed");
        setOpen(false);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [animState]);

  const handleClose = useCallback(() => {
    if (animState === "open" || animState === "opening") {
      setAnimState("closing");
    }
  }, [animState]);

  // Keyboard close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // ── Animation style for the overlay panel ──
  const panelStyle = (() => {
    const base = {
      transition: "transform 360ms cubic-bezier(0.32, 0.72, 0, 1), opacity 320ms ease",
      transformOrigin: `${origin.x}% ${origin.y}%`,
    };

    if (animState === "closed") {
      return {
        ...base,
        transform: `scale(${origin.scaleX}, ${origin.scaleY})`,
        opacity: 0,
        pointerEvents: "none",
      };
    }
    if (animState === "opening") {
      return { ...base, transform: "scale(1)", opacity: 1 };
    }
    if (animState === "open") {
      return { transform: "scale(1)", opacity: 1, transition: "none" };
    }
    // closing
    return {
      ...base,
      transform: `scale(${origin.scaleX}, ${origin.scaleY})`,
      opacity: 0,
    };
  })();

  const backdropStyle = {
    transition: "opacity 320ms ease",
    opacity: animState === "opening" || animState === "open" ? 1 : 0,
  };

  return (
    <>
      {/* ── Thumbnail ── */}
      <div ref={imgWrapRef} className={`relative group ${className}`}>
        <img src={src} alt={alt} className={imgClassName} />

        {/* Zoom Button */}
        <button
          onClick={handleOpen}
          aria-label="Expand image"
          className="
            absolute top-3 right-3 z-10
            flex items-center gap-1.5
            px-2.5 py-1.5
            bg-black/50 hover:bg-black/70
            border border-white/15
            text-white text-xs font-semibold uppercase
            rounded-lg backdrop-blur-[2px]
            transition-opacity duration-200
            cursor-pointer font-figtree
          "
        >
          {/* magnifier icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="8" r="6" />
            <line x1="13" y1="13" x2="19" y2="19" />
            <line x1="6" y1="8" x2="10" y2="8" />
            <line x1="8" y1="6" x2="8" y2="10" />
          </svg>
          Expand
        </button>
      </div>

      {/* ── Overlay — mounted on document.body via a portal so it always
            sits above every stacking context on the page (backdrop-blur,
            transform, will-change, etc. on parent elements cannot clip it) ── */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 9999, isolation: "isolate" }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              style={backdropStyle}
              onClick={handleClose}
            />

            {/* Panel */}
            <div
              className="relative w-[90vw] h-[85vh] max-w-7xl rounded-2xl overflow-hidden bg-dark shadow-2xl"
              style={panelStyle}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="
                absolute top-3 right-3 z-20
                flex items-center justify-center
                w-12 h-12
                bg-surface border border-light/10
                text-white rounded-full
                backdrop-blur-sm
                transition-colors duration-150
                cursor-pointer
              "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>

              {/* Zoom / Pan canvas */}
              <TransformWrapper wheel={{ step: 0.1 }} minScale={0.5} maxScale={8} centerOnInit>
                {() => (
                  <>
                    <OverlayControls />
                    {label && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-white font-figtree font-semibold select-none pointer-events-none max-w-[70%] text-center truncate">
                        {label}
                      </div>
                    )}
                    <TransformComponent
                      wrapperStyle={{ width: "100%", height: "100%" }}
                      contentStyle={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={src}
                        alt={alt}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "85vh",
                          objectFit: "contain",
                          cursor: "grab",
                        }}
                        draggable={false}
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
