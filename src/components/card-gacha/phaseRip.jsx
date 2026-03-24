import { ACTION_BUTTON_CLASS, getPackArtwork, TEAR_Y_FRACTION } from "./sharedData";

// Displays the selected pack and lets the user drag across the tear guide.
// The parent owns the pointer logic; this component only renders the interaction surface.
export default function PackRip({
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
      className="mx-auto flex w-full flex-col px-6 py-12 font-figtree text-light"
      style={{ userSelect: isRipDragging ? "none" : undefined }}
    >
      <p className="mx-6 my-6 text-center text-xl text-light font-bold">
        {"➡️ Drag across to open pack ➡️"}
      </p>

      <div
        className="relative mx-auto w-full max-w-104 cursor-rip px-4 md:px-8"
        style={{ touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div data-rip-pack className="relative mx-auto aspect-4/6 w-full max-w-75 overflow-hidden">
          <img
            src={getPackArtwork(selectedPack)}
            alt={`${selectedPack.name} card pack`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Keep the pack label visible so the user knows what they opened. */}
          <div className="absolute inset-0 flex items-center justify-center p-4"></div>
        </div>

        {/* This dashed line marks the allowed tear path and extends beyond the pack edges. */}
        <div
          className="pointer-events-none absolute left-0 right-0"
          style={{
            top: `${TEAR_Y_FRACTION * 100}%`,
            height: "3px",
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 14px, transparent 14px, transparent 24px)",
          }}
        />

        {/* The active tear line follows the wider interaction surface instead of the pack bounds. */}
        {ripProgress > 0 && (
          <div
            className="pointer-events-none absolute left-0"
            style={{
              top: `${TEAR_Y_FRACTION * 100}%`,
              height: "4px",
              width: `${ripProgress * 100}%`,
              background: "rgb(255, 255, 255)",
            }}
          />
        )}
      </div>

      {/* Spacer keeps the back button aligned with the carousel layout below. */}
      <div className="mx-auto mt-8 h-12 w-full max-w-75" />

      <button type="button" onClick={onBack} className={`${ACTION_BUTTON_CLASS} mt-6`}>
        Back
      </button>
    </section>
  );
}
