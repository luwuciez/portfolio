import PageTitle from "../components/pageTitle.jsx";
import LinkButton from "../components/linkButton.jsx";

//Assets
import logo from "../assets/safespace/logo.png";
import thumbnail from "../assets/safespace/mocks.png";
import findings from "../assets/safespace/findings.png";
import persona1 from "../assets/safespace/persona1.png";
import persona2 from "../assets/safespace/persona2.png";
import finalSitemap from "../assets/safespace/sitemap-final.png";
import userFlow from "../assets/safespace/user-flow.png";
import moodboard from "../assets/safespace/moodboard.png";
import gradient from "../assets/safespace/gradient.png";
import palette from "../assets/safespace/palette.png";
import typography from "../assets/safespace/typography.png";
import brochure from "../assets/safespace/brochure.png";
import businessCard from "../assets/safespace/business-card.png";
import stickers from "../assets/safespace/stickers.png";
import website from "../assets/safespace/website.png";
import lofis from "../assets/safespace/lofi.png";
import homeChange from "../assets/safespace/home-change.png";
import navbarChange from "../assets/safespace/navbar-change.png";
import recordingChange from "../assets/safespace/recording-change.png";
import formChange from "../assets/safespace/form-change.png";
import safi from "../assets/safespace/safi.mp4";
import recording from "../assets/safespace/recording.mp4";
import websupp from "../assets/safespace/websupplement.mp4";
import showcase1 from "../assets/safespace/showcase-photo1.jpeg";
import showcase2 from "../assets/safespace/showcase-photo2.jpeg";
import showcase3 from "../assets/safespace/showcase-photo3.jpeg";
import showcaseWin from "../assets/safespace/showcase-win.jpeg";

import ZoomableImage from "../components/zoomableImage.jsx";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";

const video = "https://youtu.be/J6HDu1juCkg";

gsap.registerPlugin(ScrollToPlugin);

const Emphasis = ({ children }) => {
  return <span className="font-semibold text-safespace">{children}</span>;
};

function FinalProduct({ safi, recording }) {
  const [active, setActive] = useState("prototype");

  const renderContent = () => {
    if (active === "prototype") {
      return (
        <iframe
          key="prototype"
          className="h-full w-full border-0"
          src="https://embed.figma.com/proto/CH7UFuZHKfsaBs0Uln36on/SafeSpace?page-id=1%3A8&node-id=3-33637&viewport=158%2C454%2C0.35&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A33637&embed-host=share"
          allowFullScreen
        />
      );
    }
    if (active === "recording") {
      return (
        <video
          key="recording"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-contain"
        >
          <source src={recording} type="video/mp4" />
        </video>
      );
    }
    return (
      <video key="reports" autoPlay loop muted playsInline className="h-full w-full object-contain">
        <source src={safi} type="video/mp4" />
      </video>
    );
  };

  const items = [
    {
      id: "prototype",
      label: "High-Fidelity Prototype",
      description:
        "The high-fidelity prototype was handed off to the development team along with a component library and detailed style guide to ensure the final build reflected the intended look and feel of the app.",
    },
    {
      id: "recording",
      label: "Recording Incidents",
      description:
        "The central navigation button opens the recording tool for quick, discreet documentation. Recordings are passcode-protected and include an AI transcript with auto-generated time, location, and keywords. Report generation is powered by GPT-4o mini, eliminating the need for manual entry",
    },
    {
      id: "reports",
      label: "Creating Reports",
      description:
        "SafeSpace offers two reporting options: a simple manual form or Safi, an AI assistant powered by IBM watsonx. Safi guides users through the incident using gentle prompts and the conversation is then transformed into a clear report that can be saved privately or shared publicly.",
    },
  ];

  return (
    <div className="max-w-3xl lg:max-w-200 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree items-center">
      <div className="grid grid-cols-2 auto-rows-auto gap-4 w-full items-center">
        <div className="col-span-full md:col-span-1 flex flex-col gap-4 h-full">
          <div className="text-light font-bold text-lg sm:text-xl">
            <span>Tap/Click to view:</span>
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col py-3 px-4 rounded-2xl text-light w-full h-full text-left transition-all cursor-pointer border-2 ${
                active === item.id
                  ? "bg-safespace/20 border-safespace"
                  : "bg-lightsurface/10 backdrop-blur-[2px] border-transparent hover:bg-lightsurface/20"
              }`}
            >
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3 items-center">
                <span>{item.label}</span>
                {active === item.id && (
                  <span className="text-safespace text-sm hidden md:inline">▶</span>
                )}
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>{item.description}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="col-span-full md:col-span-1 py-4 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] max-w-100 w-full mx-auto md:mx-0">
          <div className="w-full overflow-hidden h-140 sm:h-180">{renderContent()}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 auto-rows-auto gap-4 w-full items-start mt-4">
        <div className="col-span-full flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px]">
          <div className="font-bold text-lg sm:text-xl mb-2">Web Supplement</div>
          <p className="text-sm sm:text-base">
            The web supplement complements the SafeSpace app, providing leadership and stakeholders
            with access to reports by area. It also includes an AI summary tool that condenses all
            reports in an area into a single, easy-to-read overview.
          </p>
        </div>
        <div className="col-span-full py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full mx-auto md:mx-0">
          <div className="w-full rounded-xl overflow-hidden aspect-video">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={websupp} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

function PlacementReveal({ photo }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Photo animates up + fades in, slightly delayed
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mx-auto flex flex-col gap-4 font-figtree">
      <div className="h-50 flex items-center justify-center w-full">
        <p className="font-bold text-light text-xl sm:text-2xl text-center">
          And out of 10 teams, <br />
          SafeSpace placed...
        </p>
      </div>
      {/* Placement card */}
      <div ref={cardRef} className="text-center flex flex-col gap-3 opacity-0">
        <div className="h-80 mx-auto w-fit rounded-2xl px-16 py-8 flex flex-col gap-2 items-center justify-center">
          <span className="text-white font-bold text-7xl sm:text-8xl leading-none">1st</span>
          <p className="text-light text-sm sm:text-base">
            Receiving over 300 votes from panel judges and audience!
          </p>
        </div>
      </div>

      {/* Result photo */}
      <div ref={photoRef} className="opacity-0">
        <div className="rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden">
          <img
            src={photo}
            alt="SafeSpace team photo after placing first at the Showcase"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mx-auto w-fit rounded-2xl py-2 flex flex-col gap-2 items-center">
          <p className="text-light text-sm sm:text-base">
            Special thanks to the team's project advisor,
            <Emphasis> Chris Ernst</Emphasis>, for offering thoughtful guidance and valuable
            insights into the trades industry.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SafeSpace() {
  const JumpToButton = ({ text, targetId }) => {
    const handleJump = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const targetY = element.getBoundingClientRect().top + window.scrollY - offset;

        gsap.to(window, {
          scrollTo: { y: targetY },
          duration: 1,
          ease: "power3.inOut",
        });
      }
    };

    return (
      <button
        className="bg-light/20 hover:bg-light text-light hover:text-dark px-4 py-2 rounded-xl hover:cursor-pointer transition-all"
        onClick={handleJump}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="pt-20">
      <PageTitle title="SafeSpace Case Study" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Thumbnail */}
          <div className="col-span-full lg:col-span-3 row-span-2 rounded-2xl bg-surface overflow-hidden items-center justify-center flex relative">
            <img
              src={thumbnail}
              alt="Mockup of the SafeSpace app on iPhone 16 screens."
              className="object-cover h-full w-full"
            />
            <div className="absolute right-4 bottom-4 z-10 hidden md:flex md:flex-col gap-4">
              <LinkButton link={video} text="Promotional Video" />
              <LinkButton link="https://safe-space.figma.site/" text="Marketing Website" />
            </div>
          </div>

          <div className="md:hidden flex flex-col sm:flex-row gap-4 col-span-full">
            <LinkButton className="w-full" link={video} text="Promotional Video" />
            <LinkButton
              className="w-full"
              link="https://safe-space.figma.site/"
              text="Marketing Website"
            />
          </div>

          {/* Info */}
          <div className="col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-6 py-3 px-4 rounded-2xl bg-none text-light border border-light/50 w-full h-full">
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Timeline</h4>
                <p className="text-sm sm:text-base">September 2025 – December 2025</p>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Roles</h4>
                <p className="text-sm sm:text-base">Lead UX/UI Designer, UX Researcher</p>
              </div>
              <div className="w-full flex flex-row gap-2">
                <span className="font-bold text-lg sm:text-xl">Team Size:</span>
                <span className="text-lg sm:text-xl">8</span>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Tools</h4>
                <p className="text-sm sm:text-base">
                  Figma, Adobe Suite (Photoshop, Illustrator, InDesign, After Effects, Premier),
                  Expo, Typescript, React
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px]">
            <h4 className="font-bold text-lg sm:text-xl mb-2">Project Background</h4>
            <div className="flex flex-col text-sm sm:text-base gap-3">
              <p>
                SafeSpace was created as part of an initiative to support under-represented groups
                in the skilled trades, in partnership with ConnectHer Hub. The app was designed to
                <Emphasis> empower gender-minority tradespeople</Emphasis> by providing a safer,
                easier way to report on-site misconduct, and leveraging technology to foster
                accountability and <Emphasis>drive meaningful change</Emphasis> across the industry.
              </p>
            </div>
          </div>

          {/* ToC */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px]">
            <h4 className="font-bold text-lg sm:text-xl mb-2">Table of Contents</h4>
            <div className="flex flex-wrap items-start gap-3">
              <JumpToButton text="Overview" targetId="overview" />
              <JumpToButton text="Research" targetId="research" />
              <JumpToButton text="Ideation" targetId="ideation" />
              <JumpToButton text="Prototyping" targetId="design" />
              <JumpToButton text="Branding" targetId="branding" />
              <JumpToButton text="Marketing" targetId="marketing" />
              <JumpToButton text="Final Product" targetId="final" />
              <JumpToButton text="Showcase Day" targetId="showcase" />
              {/* <JumpToButton text="Takeaways" targetId="takeaways" /> */}
            </div>
          </div>

          {/* Prototype */}
          <div className="col-span-full sm:col-span-2 row-span-2 min-h-150 w-full rounded-2xl overflow-hidden order-1 sm:order-0">
            <iframe
              className="h-full w-full border-0"
              src="https://embed.figma.com/proto/CH7UFuZHKfsaBs0Uln36on/SafeSpace?page-id=1%3A8&node-id=3-33637&viewport=158%2C454%2C0.35&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A33637&embed-host=share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Challenge */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px] order-0 sm:order-1">
            <h4 className="font-bold text-lg sm:text-xl mb-2">The Gender-Minority Experience</h4>
            <div className="flex flex-col text-sm sm:text-base gap-2">
              <p>
                Harassment, inappropriate comments, and unfair treatment due to gender bias are
                common occurrences in the skilled trades. However, reporting rates remain low among
                women and gender-diverse professionals.
              </p>
              <p>
                Research discovered that obstacles such as the fear of being disbelieved, the risk
                of retaliation, and the lack of streamlined reporting systems often discourage
                workers from coming forward in uncomfortable or dangerous situations.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="flex flex-col col-span-full sm:col-span-2 h-full row-span-1 text-light gap-4 order-3 sm:order-2">
            <div className="py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px]">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Solution: SafeSpace</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  SafeSpace is an <Emphasis>AI-powered reporting app</Emphasis> designed for
                  gender-minority tradespeople to document incidents, raise awareness, and push for
                  meaningful change. The app includes three core features:
                </p>
              </div>
            </div>
            <div className="py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] flex flex-row gap-4">
              <div className="font-black text-4xl w-10 shrink-0 flex items-center justify-center">
                1
              </div>
              <div>
                <Emphasis>Secure voice recording</Emphasis> with passcode-protected storage,
                enabling incidents to be captured in real time and converted into structured reports
              </div>
            </div>
            <div className="py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] flex flex-row gap-4">
              <div className="font-black text-4xl w-10 shrink-0 flex items-center justify-center">
                2
              </div>
              <div>
                A <Emphasis>conversational assistant</Emphasis> that guides incident recall and
                helps generate clear, detailed documentation
              </div>
            </div>
            <div className="py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] flex flex-row gap-4">
              <div className="font-black text-4xl w-10 shrink-0 flex items-center justify-center">
                3
              </div>
              <div>
                Automated summaries and <Emphasis>recommended next steps</Emphasis> to help
                leadership identify patterns of inappropriate behaviour and take informed action
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageTitle title="User Research" id="research" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Research Findings */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px]">
            <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
              <span>Gaining Insights</span>
              <span className="hidden lg:inline">⏵</span>
            </div>
            <div className="flex flex-col text-sm sm:text-base gap-2">
              <p>
                The initial discovery phase combined secondary online research with primary data
                from surveys and interviews to identify key insights into the on-site experiences of
                gender-minority tradespeople. These findings highlighted the specific needs and
                frustrations that the project aims to address.
              </p>
            </div>
          </div>
          <ZoomableImage
            src={findings}
            alt="Research Findings"
            label="Research Findings"
            className="col-span-2 row-span-2 rounded-2xl bg-surface overflow-hidden items-center justify-center flex relative min-h-100"
            imgClassName="w-full h-full object-cover absolute inset-0"
          />

          {/* User Personas */}
          <div className="col-span-2 row-span-2 flex flex-col gap-4 order-2 lg:order-1">
            <ZoomableImage
              src={persona1}
              alt="Primary user persona: Noah"
              label="Primary user persona: Noah"
              className="rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center relative"
              imgClassName="w-full h-full object-contain"
            />
            <ZoomableImage
              src={persona2}
              alt="Secondary user persona: Aiyana"
              label="Secondary user persona: Aiyana"
              className="rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center relative"
              imgClassName="w-full h-full object-contain"
            />
          </div>
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px] order-1 lg:order-2">
            <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
              <span className="hidden lg:inline">⏴</span>
              <span>User Personas</span>
            </div>
            <div className="flex flex-col text-sm sm:text-base gap-2">
              <p>
                To guide the design roadmap, two distinct user personas were developed based on the
                qualitative and quantitative data collected. These personas acted as a reference
                point to validate design choices and prioritize functionality that addresses
                specific user frustrations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PageTitle title="Ideation" id="ideation" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Sitemap */}
          <div className="col-span-full flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Brainstorming Solutions</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  After reviewing the insights gathered from user research, the team brainstormed a
                  range of approaches to better support gender minorities in the trades. Among these
                  ideas, a <Emphasis>reporting app</Emphasis> emerged as the most impactful solution
                  for driving meaningful change within the industry.
                </p>
                <p>
                  Many survey respondents and interviewees described existing reporting processes as
                  tedious, inaccessible, and ineffective. In response, the team identified an
                  opportunity to
                  <Emphasis> streamline and secure the reporting experience</Emphasis>. By making it
                  easier and safer to report incidents, the app aims to increase awareness of
                  gender-based bias while helping hold individuals accountable for inappropriate
                  conduct.
                </p>
                <p>
                  With this direction in mind, the team developed a sitemap outlining the app's
                  proposed features and overall structure.
                </p>
              </div>
            </div>
          </div>
          <ZoomableImage
            src={finalSitemap}
            alt="Final Sitemap"
            label="Final Sitemap"
            className="col-span-full xl:col-span-3 rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />
          <div className="col-span-full xl:col-span-1 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] text-light w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Scope Challenges</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  Given the project timeline, the team determined that the initial sitemap was too
                  ambitious in scope.
                </p>
                <p>
                  Reassessing the app's core priorities led to a revised sitemap that emphasized the
                  most essential functions.
                </p>
              </div>
            </div>
          </div>

          {/* User Flow */}
          <div className="col-span-full xl:col-span-1 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Journey Map</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  Based on the sitemap, the team developed a <Emphasis>simple user flow </Emphasis>
                  to map out how individuals would move through the app's core features.
                </p>
                <p>
                  Visualizing this journey enabled the team to
                  <Emphasis> ground design decisions</Emphasis> in real user needs and maintain
                  clarity and consistency throughout each stage of the prototyping process.
                </p>
              </div>
            </div>
          </div>
          <ZoomableImage
            src={userFlow}
            alt="User Flow"
            label="User Flow"
            className="col-span-full xl:col-span-3 rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />
        </div>
      </div>

      <PageTitle title="Prototyping & Testing" id="design" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          <ZoomableImage
            src={lofis}
            alt="Low-Fidelity Wireframes"
            label="Low-Fidelity Wireframes"
            className="col-span-full xl:col-span-3 rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />
          <div className="col-span-full xl:col-span-1 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] text-light w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Low-Fidelity Wireframes</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  Guided by the defined user flow, low-fidelity wireframes were developed to explore
                  the app’s layout and information architecture.
                </p>
                <p>
                  These early concepts allowed the team to visualize core interactions, assess
                  usability, and identify problematic areas before moving into higher-fidelity
                  design iterations.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] text-light w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">Testing and Iterating</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  To evaluate the effectiveness of the designs,
                  <Emphasis> usability testing </Emphasis>was conducted with representative users
                  throughout the prototyping process. These sessions highlighted issues with layout,
                  wording, and visual hierarchy, which
                  <Emphasis> directly guided design improvements</Emphasis>. The feedback helped
                  shape a final product that feels intuitive, accessible, and aligned with real user
                  needs.
                </p>
              </div>
            </div>
          </div>

          <ZoomableImage
            src={homeChange}
            alt="Evolution of the Home page"
            label="Evolution of the Home page"
            className="col-span-full rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />

          <ZoomableImage
            src={navbarChange}
            alt="Changes to NavBar"
            label="Changes to NavBar"
            className="col-span-full rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />

          <ZoomableImage
            src={recordingChange}
            alt="Changes to Recording tool"
            label="Changes to Recording tool"
            className="col-span-full rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />

          <ZoomableImage
            src={formChange}
            alt="Changes to Reporting Form"
            label="Changes to Reporting Form"
            className="col-span-full xl:col-span-3 rounded-2xl bg-dark/80 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-contain"
          />

          <div className="col-span-full xl:col-span-1 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] text-light w-full h-full">
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  Forms were initially split across multiple pages to prevent users from feeling
                  overwhelmed by too much information at once.
                </p>
                <p>
                  However, testing revealed that users preferred a continuous scrolling experience,
                  allowing them to see the full context as they move down the form, rather than
                  flipping through separate pages.
                </p>
                <p>
                  This change improved usability and made the form-filling process feel more
                  intuitive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageTitle title="Branding" id="branding" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Moodboard */}
          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <h4 className="font-bold text-lg sm:text-xl mb-2">The SafeSpace Brand</h4>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  As the app prototype evolved through iteration, the team developed a moodboard and
                  established a clear overarching direction for SafeSpace's branding—one that
                  conveys trust and empowerment while remaining approachable and inclusive.
                </p>
              </div>
            </div>
          </div>

          <ZoomableImage
            src={moodboard}
            alt="Moodboard"
            label="Moodboard"
            className="col-span-full lg:col-span-2 row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative min-h-60"
            imgClassName="w-full h-full object-cover absolute inset-0"
          />

          {/* Palette */}
          <div className="col-span-full lg:col-span-2 row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img src={palette} alt="Moodboard" className="w-full h-full object-cover" />
          </div>

          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  A <Emphasis>style guide</Emphasis> was developed directly from the core branding
                  objective, ensuring visual consistency across all touchpoints.
                </p>
                <p>
                  The colour palette features bold, high-contrast colours, anchored by a deep purple
                  to convey<Emphasis> inclusivity, resilience, and strength</Emphasis>.
                </p>
                <p>
                  The<Emphasis> Satoshi</Emphasis> font family was chosen for its clean, modern
                  letterforms, reinforcing a professional yet welcoming tone aligned with
                  SafeSpace's mission.
                </p>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="col-span-1 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img src={logo} alt="SafeSpace logo" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={gradient}
              alt="SafeSpace branding gradient"
              className="w-full h-full object-cover"
            />
          </div>
          <ZoomableImage
            src={typography}
            alt="Typography: Satoshi"
            label="Typography: Satoshi"
            className="col-span-full lg:col-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative"
            imgClassName="w-full h-full object-contain"
          />
        </div>
      </div>

      <PageTitle title="Marketing Materials" id="marketing" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          <ZoomableImage
            src={brochure}
            alt="SafeSpace marketing brochure"
            label="SafeSpace marketing brochure"
            className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative"
            imgClassName="w-full h-full object-cover"
          />

          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
                <span className="hidden lg:inline">⏴</span>
                <span>Brochure</span>
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  The marketing brochure was designed to engage with tradespeople and highlight the
                  SafeSpace's key features, benefits, and unique value proposition in a clear,
                  concise layout.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img src={businessCard} alt="Moodboard" className="w-full h-full object-cover" />
          </div>

          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
                <span>Business Cards</span>
                <span className="hidden lg:inline">⏵</span>
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  To present a unified and professional front, business cards were created for each
                  team member with careful attention to brand consistency.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={stickers}
              alt="Promotional video for SafeSpace"
              className="object-cover h-full w-full"
            />
          </div>

          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
                <span className="hidden lg:inline">⏴</span>
                <span>Stickers</span>
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  Bold SafeSpace stickers were produced for the final showcase. The design balances
                  professional branding with a casual style, intended for workers to wear on their
                  helmets.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={website}
              alt="SafeSpace marketing website"
              className="object-cover h-full w-full"
            />
            <div className="absolute right-4 bottom-4 z-10 hidden md:flex md:flex-col gap-4">
              <LinkButton link="https://safe-space.figma.site/" text="View Website" />
            </div>
          </div>

          <div className="md:hidden flex flex-col sm:flex-row gap-4 col-span-full">
            <LinkButton
              className="w-full"
              link="https://safe-space.figma.site/"
              text="View Website"
            />
          </div>

          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
                <span>Marketing Website</span>
                <span className="hidden lg:inline">⏵</span>
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  A website was developed to promote the SafeSpace app while also documenting the
                  team’s weekly progress throughout the project.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="font-bold text-lg sm:text-xl mb-2 flex flex-row gap-3">
                <span>Promotional Video</span>
              </div>
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  The scenarios depicted in the promotional video was informed by multiple real
                  accounts gathered during the research phase. The language was intentionally left
                  unfiltered to reflect the reality and gravity of these experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full row-span-1 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative aspect-video">
            <iframe
              className="w-full h-full"
              src={"https://www.youtube.com/embed/J6HDu1juCkg"}
              title="SafeSpace Promotional Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>

      <PageTitle title="Final Product" id="final" />
      <FinalProduct safi={safi} recording={recording} />

      <PageTitle title="BCIT Technology Showcase" id="showcase" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-30 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          <div className="col-span-full lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col py-3 px-4 rounded-2xl text-light bg-lightsurface/10 backdrop-blur-[2px] w-full h-full">
              <div className="flex flex-col text-sm sm:text-base gap-2">
                <p>
                  On December 5th, 2025, the team presented the SafeSpace app at{" "}
                  <Emphasis>
                    BCIT's D3/FSWD x ConnectHERHub Student Design and Technology Showcase
                  </Emphasis>
                  .
                </p>
                <p>
                  At the showcase, Students from the Digital Design and Development (D3) and
                  Full-Stack Web Development (FSWD) programs showcased AI-driven solutions tackling
                  real-world challenges in the skilled trades, focused on improving experiences for
                  underrepresented groups in the industry.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={showcase1}
              alt="Promotional video for SafeSpace"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-3 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={showcase2}
              alt="Promotional video for SafeSpace"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="col-span-full lg:col-span-2 row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative">
            <img
              src={showcase3}
              alt="Promotional video for SafeSpace"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <PlacementReveal photo={showcaseWin} />
      </div>

      {/* <PageTitle title="Takeaways" id="takeaways" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-30 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4"></div>
      </div> */}
    </div>
  );
}
