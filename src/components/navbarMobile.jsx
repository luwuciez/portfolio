import { ChevronsLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const NavbarMobile = () => {
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentPath = `${location.pathname}${location.hash || ""}`;

  const chevronRef = useRef();
  const menuRef = useRef();
  const ulRef = useRef();
  const buttonRef = useRef();

  const tabs = [
    {
      name: "WORK",
      path: "/#work",
      logo: "#64e9ff",
      color: "bg-customBlue",
      textColor: "text-customBlue",
    },
    {
      name: "PLAY",
      path: "/play",
      logo: "#cc9dff",
      color: "bg-customPurple",
      textColor: "text-customPurple",
    },
    {
      name: "ABOUT",
      path: "/about",
      logo: "#afed4c",
      color: "bg-customGreen",
      textColor: "text-customGreen",
    },
  ];

  const getCurrentLogo = () => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    return currentTab ? currentTab.logo : "#64e9ff";
  };

  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  useGSAP(() => {
    gsap.set(buttonRef.current, { height: 48 });
    gsap.set(menuRef.current, { width: 0 });
    gsap.set(ulRef.current.querySelectorAll("li"), { opacity: 0, x: -10 });
  }, []);

  useEffect(() => {
    gsap.killTweensOf(chevronRef.current);
    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(menuRef.current);
    gsap.killTweensOf(ulRef.current.querySelectorAll("li"));

    gsap.to(chevronRef.current, { rotation: menuIsOpen ? -180 : 0, duration: 0.3 });
    if (menuIsOpen) {
      gsap.to(buttonRef.current, { height: "auto", duration: 0.2 });
      gsap.to(menuRef.current, { width: "auto", duration: 0.3 });
      gsap.to(ulRef.current.querySelectorAll("li"), {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.2,
      });
    } else {
      gsap.to(ulRef.current.querySelectorAll("li"), {
        opacity: 0,
        x: -10,
        duration: 0.1,
      });
      gsap.to(menuRef.current, { width: 0, duration: 0.5 });
      gsap.to(buttonRef.current, { height: 48, duration: 0.2 });
    }
  }, [menuIsOpen]);

  useEffect(() => {
    let autoCloseTimeout;

    if (menuIsOpen) {
      autoCloseTimeout = setTimeout(() => {
        setMenuIsOpen(false);
      }, 5000);
    }

    return () => {
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
      }
    };
  }, [menuIsOpen]);

  return (
    <div className="font-dela flex items-start justify-between mx-6 md:mx-8 my-4">
      <Link className="relative flex items-center" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="drop-shadow-custom"
        >
          <g>
            <path
              d="M47.736 37.7738C31.3447 35.4922 24.213 36.5783 8.81216 48C12.1048 32.162 8.41937 22.1305 0 10.4561C7.67478 11.1904 12.5761 10.9445 19.6532 9.11719C20.2475 18.9199 20.5037 26.3624 16.5723 35.54C28.0589 25.0918 40.2832 27.37 40.2832 27.37C42.1788 31.4857 44.4673 34.8706 47.736 37.7772V37.7738Z"
              fill={getCurrentLogo()}
            />
            <path
              d="M30.5354 10.7044C28.2504 11.8554 26.7168 12.5283 24.6914 14.4205C24.9578 11.9852 24.9339 10.3526 24.6367 8.06757C29.077 6.52715 32.7487 4.01671 37.0318 0C36.3726 3.16965 36.3077 5.92259 36.318 8.11197C32.998 10.7727 31.1639 12.9826 29.2068 19.0623C32.7829 15.3803 34.6136 14.6289 36.4478 14.1097C36.5502 16.972 37.1411 19.4209 38.2307 22.2456C33.0185 21.3268 27.2701 23.3078 22.9119 26.1872C24.3054 20.8828 26.6724 15.2642 30.5354 10.7044Z"
              fill={getCurrentLogo()}
            />
          </g>
        </svg>
      </Link>
      <nav
        ref={buttonRef}
        className="flex flex-row bg-surface/80 backdrop-blur-xs p-1 rounded-3xl items-start h-12 shadow-custom border border-light/10"
      >
        <div
          className={`flex text-light items-center p-2 ${
            menuIsOpen ? "ml-2" : ""
          } hover:cursor-pointer`}
          onClick={toggleMenu}
        >
          <ChevronsLeft ref={chevronRef} size={24} strokeWidth={2} />
        </div>

        <div ref={menuRef} className="overflow-hidden">
          <ul ref={ulRef} className="flex flex-col items-center py-4 px-2 gap-6">
            {tabs.map((tab) => (
              <li key={tab.name}>
                <Link
                  to={tab.path}
                  className={`px-4 py-2 rounded-full ${
                    currentPath === tab.path ? tab.color : "bg-transparent"
                  } ${currentPath === tab.path ? "text-dark" : tab.textColor} font-bold`}
                >
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
