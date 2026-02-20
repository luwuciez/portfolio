import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true, // smooth mouse wheel
      smoothTouch: false, // leave touch/mobile as native (recommended)
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
