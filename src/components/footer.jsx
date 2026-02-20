import fullLogoDark from "../assets/full_logo_dark.svg";

export default function Footer() {
  return (
    <div className="bg-surface/80 backdrop-blur-xs h-auto sm:h-50 flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-16 px-6 md:px-8 py-8 shadow-custom border-t border-light/10">
      <img src={fullLogoDark} alt="Lucie Zhong Full Logo" className="h-18 sm:h-20 md:h-24" />
      <div className="flex flex-col gap-2 md:gap-4 items-center sm:items-start">
        <div className="font-dela text-light text-2xl">Get in touch!</div>
        <div className="flex flex-row gap-6 font-figtree text-light font-bold text-lg">
          <a
            href="mailto:zhong.lucie@icloud.com"
            className="flex flex-row gap-2 justify-center items-center border-b-2 border-b-light/0 hover:border-b-light hover:cursor-pointer transition-all"
          >
            Email
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M261.65-221.35 187-296l371-371H232.65v-106h506v506h-106v-325.35l-371 371Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/luciezhong/"
            className="flex flex-row gap-2 justify-center items-center border-b-2 border-b-light/0 hover:border-b-light hover:cursor-pointer transition-all"
          >
            LinkedIn
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M261.65-221.35 187-296l371-371H232.65v-106h506v506h-106v-325.35l-371 371Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
