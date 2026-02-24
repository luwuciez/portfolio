import LinkButton from "./linkButton";
import PageTitle from "./pageTitle";

export default function ProjectTemplate({
  title = "Project Title",
  timeline = "",
  roles = [""],
  tools = [""],
  file = { path: "#", text: "Final Design" },
  overview = "",
  rationale = [""],
  images = [],
}) {
  return (
    <div className="pt-20">
      <PageTitle title={title} />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-30 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Thumbnail */}
          <div className="col-span-full lg:col-span-3 row-span-2 rounded-2xl bg-surface overflow-hidden items-center justify-center flex aspect-video relative">
            <img
              src={images[0].path}
              alt={images[0].caption}
              className="object-cover h-full w-full"
            />
            <LinkButton
              link={file.path}
              text={file.text}
              className="absolute left-4 bottom-4 z-10 hidden sm:flex"
            />
          </div>

          {/* Info */}
          <div className="col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 flex flex-col gap-4">
            <LinkButton link={file.path} text={file.text} className="sm:hidden" />
            <div className="flex flex-col sm:flex-row lg:flex-col gap-6 py-3 px-4 rounded-2xl bg-none text-light border border-light/50 w-full h-full">
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Timeline</h4>
                <p className="text-sm sm:text-base">{timeline}</p>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Roles</h4>
                <p className="text-sm sm:text-base">{roles.join(", ")}</p>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Tools</h4>
                <p className="text-sm sm:text-base">{tools.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-1 backdrop-blur-[2px] order-1">
            <h4 className="font-bold text-lg sm:text-xl mb-2">Overview</h4>
            <p className="text-sm sm:text-base">{overview}</p>
          </div>

          {/* Rationale */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full sm:col-span-2 h-full row-span-2 backdrop-blur-[2px] order-4 lg:order-2">
            <h4 className="font-bold text-lg sm:text-xl mb-2">Design Rationale</h4>
            <div className="flex flex-col gap-2">
              {rationale.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Supplementary images */}
          <div className="rounded-2xl items-center justify-center flex overflow-hidden lg:max-h-58 aspect-square lg:aspect-auto order-2 lg:order-3">
            <img
              src={images[1].path}
              alt={images[1].caption}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="rounded-2xl items-center justify-center flex overflow-hidden lg:max-h-58 aspect-square lg:aspect-auto order-3 lg:order-4">
            <img
              src={images[2].path}
              alt={images[2].caption}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {images.length > 3 &&
          images.slice(3).map((image, index) => (
            <div className="rounded-2xl items-center justify-center flex overflow-hidden">
              <img src={image.path} alt={image.caption} className="object-cover h-full w-full" />
            </div>
          ))}
      </div>
    </div>
  );
}
