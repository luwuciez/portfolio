import CardGacha from "../components/cardGacha";
import PageTitle from "../components/pageTitle";

export default function Play() {
  return (
    <div className="pt-12 pb-20">
      <PageTitle title="PLAYGROUND" />
      <div className="max-w-3xl xl:max-w-300 mx-auto">
        <p className="font-figtree text-light text-center text-lg mx-6">
          In my free time, I love creating fan art, original characters, and exploring new ways to
          express my creativity.
        </p>
      </div>
      <div className="max-w-3xl xl:max-w-300 mx-auto">
        <CardGacha />
      </div>
    </div>
  );
}
