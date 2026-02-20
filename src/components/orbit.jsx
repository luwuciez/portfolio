import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register the plugin
gsap.registerPlugin(MotionPathPlugin);

const Orbit = () => {
  const containerRef = useRef(null);
  // Refs for our stickers
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        // Create an infinite loop for each sticker
        gsap.to(item, {
          duration: 20, // Speed of orbit
          repeat: -1,
          ease: "none",
          motionPath: {
            path: "#orbit-path", // ID of the SVG path below
            align: "#orbit-path",
            alignOrigin: [0.5, 0.5],
            autoRotate: false, // Set to true if you want stickers to turn with the curve
            start: index * 0.2, // Distributes them along the path (0 to 1)
            end: index * 0.2 + 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stickers = ["Frontend", "UI/UX", "Graphic", "Motion", "Research"];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 1. The Central Logo */}
      <div className="z-10 text-white text-center">
        <h1 className="text-4xl font-bold">LUCIE ZHONG</h1>
        <p>Designing digital experiences</p>
      </div>

      {/* 2. The SVG Path (Hidden or styled as a faint line) */}
      <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 800 500">
        <ellipse
          id="orbit-path"
          cx="400"
          cy="250"
          rx="350"
          ry="150"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
        />
      </svg>

      {/* 3. The Orbiting Stickers */}
      {stickers.map((text, i) => (
        <div
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          className="absolute px-4 py-2 bg-white border-2 border-black rounded-full shadow-lg font-bold"
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default Orbit;
