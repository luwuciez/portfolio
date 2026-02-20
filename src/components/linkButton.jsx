export default function LinkButton({ link, text, className = "" }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex flex-row gap-6 items-center justify-between
        font-figtree font-medium text-lg md:text-xl 
        text-light bg-surface/80 backdrop-blur-xs
        pl-6 pr-3 py-2 rounded-full cursor-pointer 
        border border-light/10 hover:shadow-custom transition-shadow
        ${className}`}
    >
      {text}
      <div className="bg-light text-black min-w-10 min-h-10 max-w-10 max-h-10 rounded-full flex items-center justify-center">
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
    </a>
  );
}
