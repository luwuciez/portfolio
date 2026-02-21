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

import ZoomableImage from "../components/zoomableImage.jsx";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const video = "https://youtu.be/J6HDu1juCkg";

gsap.registerPlugin(ScrollToPlugin);

const Emphasis = ({ children }) => {
  return <span className="font-semibold text-safespace">{children}</span>;
};

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
                <p className="text-sm sm:text-base">UX/UI Design Lead, UX Researcher</p>
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
              <JumpToButton text="Final Results" targetId="final" />
              <JumpToButton text="Takeaways" targetId="takeaways" />
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
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4"></div>
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
                  The scenario depicted in the promotional video was informed by multiple real
                  accounts gathered during the research phase. The language was intentionally left
                  unfiltered to reflect the reality and gravity of these experiences.
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

          <div className="col-span-full row-span-1 lg:row-span-2 rounded-2xl bg-lightsurface/10 backdrop-blur-[2px] overflow-hidden items-center justify-center flex relative aspect-video">
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

      <PageTitle title="Final Results" id="final" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-10 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4"></div>
      </div>

      <PageTitle title="Takeaways" id="takeaways" />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-30 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4"></div>
      </div>
    </div>
  );
}
