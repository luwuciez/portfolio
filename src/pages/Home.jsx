import Hero from "../components/hero";
import PageTitle from "../components/pageTitle";
import WorkCatalog from "../components/workCatalog";
import GridTemplate from "../components/gridTemplate";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Assets
import safespaceMockup from "../assets/safespace/mocks.webp";
import canMockup from "../assets/aloealien/mockup.webp";
import menuMockup from "../assets/menu/menu_mockup.webp";
import brochureMockup from "../assets/travel/mockup.png";
import inkLinkPromo from "../assets/inklink/thumbnail.png";

gsap.registerPlugin(ScrollToPlugin);

const apps = [
  <GridTemplate
    title="SafeSpace"
    description="SafeSpace is a reporting app empowering gender-diverse tradespeople to anonymously document and report on-site misconduct, while providing site leadership with the insights needed to build a safer, more inclusive work environment."
    image={safespaceMockup}
    tags={["UX Research", "UX/UI Design", "Marketing", "Full-Stack"]}
    timeline="September 2025 – December 2025"
    link="/safespace"
  />,
  // <GridTemplate
  //   title="InkLink"
  //   description="InkLink is a collaborative writing app designed to bring spontaneity to the writing process. It offers collaborative writing, version control, and integrated feedback tools to enhance productivity and creativity."
  //   tags={["UX Research", "UX/UI Design", "Motion Graphics", "Branding"]}
  //   timeline="February 2025 – May 2025"
  //   link="#"
  //   isCaseStudy={true}
  // />,
];

const graphics = [
  <GridTemplate
    title="Can Packaging Design"
    description="Aloe Alien is a beverage brand specializing in sparkling aloe drinks infused with fruit flavours. This project aims to design a series of can packages that embody the brand’s quirky, space-inspired aesthetic while creating a cohesive and visually engaging product line."
    image={canMockup}
    tags={["Package Design", "Illustration", "Branding"]}
    timeline="November 2025"
    link="/can-design"
  />,
  <GridTemplate
    title="Menu Design"
    description="The client, Lucky Break, is a brunch restaurant that needs a menu design that is easy to read and matches their family-friendly branding, as well as a fun logo that reflects the restaurant’s welcoming ambiance."
    image={menuMockup}
    tags={["Layout Design", "Typography", "Branding"]}
    timeline="April 2025"
    link="/menu-design"
  />,
  // <GridTemplate
  //   title="Travel Brochure"
  //   description="Travel brochure design for G Adventures tours."
  //   image={brochureMockup}
  //   tags={["Layout Design", "Typography", "Photo Editing"]}
  //   timeline="October 2025"
  //   link="#"
  // />,
];

const motions = [
  <GridTemplate
    title="InkLink Promotional Video"
    description="A 1-minute animated short created for InkLink, a collaborative writing app designed for storytellers. The promotional video highlights how the app empowers writers to push their creativity further through collaboration."
    tags={["Animation", "Storyboarding", "Illustrations"]}
    image={inkLinkPromo}
    timeline="May 2025"
    link="/inklink-promo"
  />,
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([...apps, ...graphics, ...motions]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#work") {
      setTimeout(() => {
        const element = document.getElementById("work");
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;

          gsap.to(window, {
            scrollTo: elementPosition,
            duration: 1, // seconds
            ease: "power2.inOut", // easing function
          });
        }
      }, 100);
    }
  }, [location.hash]);

  const FilterButton = ({ title, toggled, onClick }) => (
    <div
      className={`font-figtree font-medium text-center 
        text-lg sm:text-xl 
        ${toggled ? "text-black bg-light" : "text-light bg-surface/80 backdrop-blur-xs"} 
        px-6 py-3 rounded-full cursor-pointer 
        border border-light/0 hover:shadow-custom hover:border-light/10 transition-shadow`}
      onClick={onClick}
    >
      {title}
    </div>
  );

  function handleFilter(filter) {
    setSelectedFilter(filter);
    if (filter === "App/Website") {
      setFilteredProjects(apps);
    } else if (filter === "Graphic Design") {
      setFilteredProjects(graphics);
    } else if (filter === "Motion Graphics") {
      setFilteredProjects(motions);
    } else {
      setFilteredProjects([...apps, ...graphics, ...motions]);
    }
  }

  return (
    <>
      <Hero />
      <PageTitle title="FEATURED WORKS" id="work" />
      <div className="flex flex-col md:flex-row gap-4 justify-center px-4">
        <FilterButton
          title="All"
          toggled={selectedFilter === "All"}
          onClick={() => handleFilter("All")}
        />
        <FilterButton
          title="App/Website"
          toggled={selectedFilter === "App/Website"}
          onClick={() => handleFilter("App/Website")}
        />
        <FilterButton
          title="Graphic Design"
          toggled={selectedFilter === "Graphic Design"}
          onClick={() => handleFilter("Graphic Design")}
        />
        <FilterButton
          title="Motion Graphics"
          toggled={selectedFilter === "Motion Graphics"}
          onClick={() => handleFilter("Motion Graphics")}
        />
      </div>
      <WorkCatalog projects={filteredProjects} key={filteredProjects.id} />
    </>
  );
}
