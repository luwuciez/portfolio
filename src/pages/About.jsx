import PageTitle from "../components/pageTitle.jsx";

export default function About() {
  return (
    <div className="pt-12 pb-20">
      <PageTitle title="ABOUT ME" />
      <div className="max-w-3xl xl:max-w-300 mx-auto flex flex-col gap-15 pt-10 pb-30 px-6 font-figtree text-light">
        <div className="grid grid-cols-2 auto-rows-auto gap-4">
          <div className="flex flex-col">
            <p className="text-2xl">Nice to meet you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
