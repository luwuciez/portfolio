import fullLogoDark from "../assets/full_logo_dark.svg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import star_icon from "../assets/star.svg";
import frontend_dev from "../assets/frontend.svg";
import graphic_design from "../assets/graphic-design.svg";
import uxui_design from "../assets/uxui.svg";
import ux_research from "../assets/research.svg";
import motion_graphics from "../assets/motion.svg";

gsap.registerPlugin(MotionPathPlugin);

function Hero() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.to("#star-small", {
        motionPath: {
          path: "#orbit2",
          start: 0.1,
          end: 1.1,
        },
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#star-large", {
        motionPath: {
          path: "#orbit2",
          start: 0.6,
          end: 1.6,
        },
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#planet", {
        motionPath: {
          path: "#orbit2",
          start: 0.7,
          end: 1.7,
        },
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#frontend", {
        motionPath: {
          path: "#orbit1",
          start: -0.1,
          end: 0.9,
        },
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#graphic", {
        motionPath: {
          path: "#orbit1",
          start: 0.05,
          end: 1.05,
        },
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#uxui", {
        motionPath: {
          path: "#orbit1",
          start: 0.22,
          end: 1.22,
        },
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#research", {
        motionPath: {
          path: "#orbit1",
          start: 0.4,
          end: 1.4,
        },
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#motion", {
        motionPath: {
          path: "#orbit1",
          start: 0.52,
          end: 1.52,
        },
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to("#orbit1-group", {
        y: "-=10",
        transformOrigin: "400px 250px",
        rotate: "+=2",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#orbit2-group", {
        y: "-=10",
        transformOrigin: "400px 250px",
        rotate: "-=4",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#frontend", {
        rotation: -15,
        transformOrigin: "50% 50%",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#graphic", {
        rotation: 5,
        transformOrigin: "50% 50%",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#uxui", {
        rotation: -5,
        transformOrigin: "50% 50%",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#research", {
        rotation: 2,
        transformOrigin: "50% 50%",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#motion", {
        rotation: -5,
        transformOrigin: "50% 50%",
        duration: 1,
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
          className="absolute w-full h-full pointer-events-none hidden sm:block"
          viewBox="0 0 800 500"
        >
          <g id="orbit2-group" transform="rotate(-14, 400, 250)">
            <path
              id="orbit2"
              d="M70,250a330,150 0 1,0 660,0a330,150 0 1,0 -660,0"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
            />
            <image
              id="star-large"
              href={star_icon}
              width="66"
              height="66"
              x="-33"
              y="-33"
              transform="rotate(-5, -5, -5)"
            />
            <image
              id="star-small"
              href={star_icon}
              width="60"
              height="60"
              x="-30"
              y="-30"
              transform="rotate(30, 30, 30)"
            />
            <ellipse id="planet" cx="0" cy="0" rx="12" ry="12" fill="#FF9DBB" />
          </g>
        </svg>
        <svg
          className="absolute w-full h-full pointer-events-none hidden sm:block"
          viewBox="0 0 800 500"
        >
          <g id="orbit1-group" transform="rotate(-3, 400, 250)">
            <path
              id="orbit1"
              d="M40,250a360,160 0 1,0 720,0a360,160 0 1,0 -720,0"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
            />
            <g id="frontend-wrapper">
              <image
                id="frontend"
                href={frontend_dev}
                width="150"
                height="150"
                x="-75"
                y="-75"
                transform="rotate(-8, -8, -8)"
              />
            </g>

            <image id="graphic" href={graphic_design} width="110" height="110" x="-55" y="-55" />
            <image id="uxui" href={uxui_design} width="150" height="150" x="-75" y="-75" />
            <image id="motion" href={motion_graphics} width="134" height="134" x="-67" y="-67" />
            <image
              id="research"
              href={ux_research}
              width="120"
              height="120"
              x="-60"
              y="-60"
              transform="rotate(-5, -5, -5)"
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default Hero;
