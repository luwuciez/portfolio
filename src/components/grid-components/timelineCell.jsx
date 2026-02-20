import { forwardRef } from "react";

const TimelineCell = forwardRef(function LinkCell({ timeline = "" }, ref) {
  return (
    <div className="bg-light text-black border border-light/50 py-3 px-4 sm:py-4 sm:px-6 gap-2 flex flex-col justify-between col-span-2 sm:col-span-1 h-full rounded-2xl overflow-hidden">
      {timeline ? (
        <div className="w-full">
          <h4 className="font-bold text-lg sm:text-xl mb-1">Timeline</h4>
          <p className="text-sm sm:text-base">{timeline}</p>
        </div>
      ) : null}
      <div
        ref={ref}
        className="font-bold text-lg sm:text-xl text-right hidden sm:flex flex-row gap-1 justify-end items-center"
      >
        Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M615.91-427H140.78v-106h475.13L404.35-744.57 480-819.22 819.22-480 480-140.78l-75.65-74.65L615.91-427Z" />
        </svg>
      </div>
    </div>
  );
});

export default TimelineCell;
