import fullLogoDark from "../assets/full_logo_dark.svg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.to("#orbit-path1", {
        y: "-=10",
        transformOrigin: "50% 50%",
        rotate: "-=4",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#orbit-path2", {
        y: "-=10",
        transformOrigin: "50% 50%",
        rotate: "+=2",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#planet", {
        y: "-=10",
        transformOrigin: "50% 50%",
        rotate: "-=4",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container },
  );

  return (
    <>
      <div
        ref={container}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center py-80 px-4 relative z-10">
          <img src={fullLogoDark} alt="Lucie Zhong Full Logo" className="w-3/4 md:w-full" />
          <p className="font-figtree text-center text-base md:text-lg lg:text-xl text-light">
            Designing digital experiences <br /> people love and businesses need
          </p>
        </div>
        <svg
          className="absolute w-full h-full pointer-events-none hidden sm:block z-1"
          viewBox="0 0 800 500"
        >
          <ellipse id="planet" cx="340" cy="112" rx="12" ry="12" fill="#FF9DBB" />
        </svg>
        <svg
          className="absolute w-full h-full pointer-events-none hidden sm:block"
          viewBox="0 0 800 500"
        >
          <ellipse
            id="orbit-path1"
            cx="400"
            cy="250"
            rx="330"
            ry="150"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            transform="rotate(-14, 400, 250)"
          />
        </svg>
        <svg
          className="absolute w-full h-full pointer-events-none hidden sm:block"
          viewBox="0 0 800 500"
        >
          <ellipse
            id="orbit-path2"
            cx="400"
            cy="250"
            rx="360"
            ry="160"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            transform="rotate(-3, 400, 250)"
          />
        </svg>
      </div>
    </>
  );
}

export default Hero;
