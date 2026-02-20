import TagsCell from "./grid-components/tagsCell";
import TimelineCell from "./grid-components/timelineCell";
import { useRef } from "react";
import gsap from "gsap";

export default function GridTemplate({
  title = "Project Title",
  timeline = "",
  description = "",
  image = null,
  tags = [],
  link = "#",
}) {
  const detailsRef = useRef(null);
  const detailsTl = useRef(null);

  return (
    <>
      <a
        href={link}
        className="
          group grid grid-cols-2 xl:grid-cols-4 
          auto-rows-auto xl:auto-rows-fr
          gap-4 font-figtree"
        onMouseEnter={() => {
          if (!detailsRef.current) return;
          if (detailsTl.current) detailsTl.current.kill();
          detailsTl.current = gsap.to(detailsRef.current, {
            x: -10,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "power1.out",
          });
        }}
        onMouseLeave={() => {
          if (!detailsRef.current) return;
          if (detailsTl.current) detailsTl.current.kill();
          gsap.to(detailsRef.current, { x: 0, duration: 0.2, ease: "power3.out" });
        }}
      >
        {/* Thumbnail */}
        <div className="rounded-2xl overflow-hidden relative bg-surface row-span-2 col-span-2 aspect-4/3 md:aspect-auto md:h-115">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Description */}
        <div className="bg-lightsurface/10 text-light backdrop-blur-[2px] py-3 px-4 sm:py-4 sm:px-6 rounded-2xl gap-2 col-span-2 h-full overflow-hidden">
          <h3 className="font-bold text-xl sm:text-2xl sm:mb-3">{title}</h3>
          <p className="text-sm sm:text-base leading-relaxed hidden sm:block">{description}</p>
        </div>

        {/* Tags */}
        <TagsCell tags={tags} />

        {/* Link */}
        <TimelineCell ref={detailsRef} timeline={timeline} />
      </a>
      ;
    </>
  );
}
