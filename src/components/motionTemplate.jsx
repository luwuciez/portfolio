import PageTitle from "./pageTitle";
import ZoomableImage from "./zoomableImage";

export default function MotionTemplate({
  title = "Project Title",
  timeline = "",
  roles = [""],
  tools = [""],
  overview = [],
  video = "",
  images = [],
}) {
  return (
    <div className="pt-20">
      <PageTitle title={title} />
      <div className="max-w-3xl lg:max-w-300 mx-auto flex flex-col gap-4 pt-10 pb-30 px-6 font-figtree">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          {/* Thumbnail */}
          <div className="col-span-full lg:col-span-3 row-span-2 rounded-2xl bg-surface overflow-hidden items-center justify-center flex aspect-video relative">
            <video
              src={video}
              controls
              controlsList="nodownload"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Info */}
          <div className="col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-6 py-3 px-4 rounded-2xl bg-none text-light border border-light/50 w-full h-full">
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Timeline</h4>
                <p className="text-sm sm:text-base">{timeline}</p>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Roles</h4>
                <p className="text-sm sm:text-base">{roles.join(", ")}</p>
              </div>
              <div className="w-full flex flex-row gap-2">
                <span className="font-bold text-lg sm:text-xl">Team Size:</span>
                <span className="text-lg sm:text-xl">1</span>
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg sm:text-xl">Tools</h4>
                <p className="text-sm sm:text-base">{tools.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl bg-lightsurface/10 text-light py-3 px-4 flex flex-col col-span-full h-full backdrop-blur-[2px]">
            <h4 className="font-bold text-lg sm:text-xl mb-2">Overview</h4>
            <div className="flex flex-col gap-2">
              {overview.map((p, index) => (
                <p key={index} className="text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* main image */}
          <ZoomableImage
            src={images[0].path}
            alt={images[0].caption}
            label={images[0].caption}
            className="rounded-2xl flex flex-col col-span-full h-full items-center justify-center overflow-hidden"
            imgClassName="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 &&
          images.slice(1).map((image, index) => (
            <div className="rounded-2xl items-center justify-center flex overflow-hidden">
              <img
                key={index}
                src={image.path}
                alt={image.caption}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
