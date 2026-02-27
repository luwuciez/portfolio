import { ChevronsLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Logo = () => {
  const location = useLocation();

  const currentPath = `${location.pathname}${location.hash || ""}`;

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
    const currentTab = tabs.find((tab) => tab.path === currentPath);
    return currentTab ? currentTab.logo : "#64e9ff";
  };

  return (
    <div className="font-dela flex items-center justify-start mx-6 md:mx-8 my-4 w-fit">
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
    </div>
  );
};

export default Logo;
