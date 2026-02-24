import MotionTemplate from "../components/motionTemplate";

// Assets
import video from "../assets/inklink/final_video.mp4";
import storyboard from "../assets/inklink/storyboard.png";

export default function InkLinkPromo() {
  const overviewText = [
    "When developing the storyboard, emphasis was placed on marketing the app to writers experiencing creative blocks or seeking new ways to approach storytelling. The narrative focused on highlighting the app as both a creative catalyst and a collaborative space.",
    "It was also important to clearly communicate how the app functions, as collaborative chain writing may be unfamiliar to some audiences. To make the concept easy to grasp, visuals of connected story segments and a branching narrative tree were used to represent how individual contributions link together and expand into evolving story paths.",
    "To highlight the app's creativity and collaborative spirit, dynamic animations and upbeat music was used to maintain an energetic tone throughout the video. Careful attention was given to timing key animation movements to specific beats in the music, creating a more cohesive and engaging viewing experience.",
  ];

  const images = [{ path: storyboard, caption: "Storyboard for InkLink animated short" }];

  return (
    <MotionTemplate
      title="InkLink Promotional Video"
      timeline="May 2025"
      roles={["Motion Designer"]}
      tools={["Adobe After Effects", "Adobe Illustrator"]}
      overview={overviewText}
      video={video}
      images={images}
    />
  );
}
