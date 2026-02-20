import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the plugin for smooth scrolling
gsap.registerPlugin(ScrollToPlugin);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-surface/80 backdrop-blur-xs shadow-custom border border-light/10 text-light transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } hover:cursor-pointer`}
      aria-label="Back to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="flat"
        strokeLinejoin="flat"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
};

export default BackToTop;
