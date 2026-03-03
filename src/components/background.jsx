import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { MoveDirection, RotateDirection, OutMode } from "@tsparticles/engine";

const Background = () => {
  const [init, setInit] = useState(false);

  // Detect Safari (and exclude Chrome/Edge/Android)
  const isSafari = useMemo(() => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#090a0f",
        },
      },
      fpsLimit: 30,
      interactivity: {
        events: {
          onHover: {
            enable: !isSafari,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 100,
            size: 2,
            duration: 2,
            mix: false,
            opacity: 1,
          },
        },
      },
      particles: {
        number: {
          density: {
            enable: true,
            value_area: 400,
          },
          value: isSafari ? 800 : 2000,
        },
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: MoveDirection.topRight,
          enable: !isSafari,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 0.2,
          straight: true,
          spin: false,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          animation: {
            enable: !isSafari,
            speed: 1,
            sync: false,
          },
          value: { min: 0, max: 0.8 },
        },
        size: {
          value: { min: 0.5, max: 1.5 },
        },
      },
      detectRetina: !isSafari,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="pointer-events-none fixed top-0 left-0 w-full h-full"
      />
    );
  }

  return <></>;
};

export default Background;
