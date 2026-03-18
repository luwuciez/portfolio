import PageTitle from "../components/pageTitle.jsx";
import LinkButton from "../components/linkButton.jsx";

import portrait from "../assets/portrait.png";
import resume from "../assets/resume.pdf";

export default function About() {
  return (
    <div className="pt-12 pb-20">
      <PageTitle title="ABOUT ME" />
      <div className="max-w-3xl xl:max-w-300 mx-auto flex flex-col gap-15 pt-10 pb-30 px-6 font-figtree text-light">
        <div className="items-center justify-center flex flex-col gap-4 relative mx-auto w-full max-w-100">
          <img src={portrait} alt="Lucie's portrait photo" className="rounded-2xl w-full h-auto" />
          <LinkButton
            className="sm:absolute sm:left-[70%] sm:top-[80%] w-full sm:w-fit"
            link={resume}
            text="Resume"
          />
        </div>
        <div className="grid grid-cols-2 auto-rows-auto gap-4">
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col backdrop-blur-[2px] row-span-2 col-span-full xl:col-span-1">
            <h4 className="font-bold text-xl sm:text-3xl mb-4 text-customBlue">
              Nice to meet you!
            </h4>
            <div className="flex flex-col text-sm sm:text-base gap-3">
              <p>I'm Lucie Zhong, a digital designer and artist based in Vancouver, Canada.</p>
              <p>
                I stumbled upon UX design during my last year of university while completing my
                computer science Bachelor's. As someone who believes in the importance of a
                delightful and stress-free user experience, I was immediately intrigued and shifted
                my career focus to UX design after graduation. I hope to use my creative and
                technical skills to design digital solutions that make a positive impact on people's
                lives.
              </p>
              <p>I'm currently completing the Digital Design and Development Diploma at BCIT.</p>
            </div>
          </div>
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col backdrop-blur-[2px] col-span-full xl:col-span-1">
            <h4 className="font-bold text-lg sm:text-xl mb-2 text-customGreen">Design Process</h4>
            <div className="flex flex-col text-sm sm:text-base gap-3">
              <p>
                My design process starts with asking questions to clearly understand the problem at
                hand. After identifying the needs, pain points, and goals of the client or target
                audience, I begin exploring low-fidelity ideas and possible directions. From there,
                I iterate on the solution, testing along the way to make sure it’s moving in the
                right direction, until it develops into a refined final product.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col backdrop-blur-[2px] col-span-full xl:col-span-1">
            <h4 className="font-bold text-lg sm:text-xl mb-2 text-customPurple">Hobbies</h4>
            <div className="flex flex-col text-sm sm:text-base gap-3">
              <p>
                When I have spare time, I like to draw and design fan merch for my favorite shows
                and games. My art style is largely shaped by anime and manga, which were a big part
                of my childhood and continue to inspire me today. I hope to one day start a small
                business with the merch I designed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
