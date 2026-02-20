import ProjectTemplate from "../components/projectTemplate";

// Assets
import canMockup from "../assets/aloealien/mockup.png";
import logo from "../assets/aloealien/logo.png";
import stickers from "../assets/aloealien/stickers.png";
import turnaround1 from "../assets/aloealien/turnaround1.png";
import turnaround2 from "../assets/aloealien/turnaround2.png";
import turnaround3 from "../assets/aloealien/turnaround3.png";
import proof from "../assets/aloealien/proof.pdf";

export default function CanDesign() {
  const overviewText =
    "Aloe Alien is a beverage brand specializing in sparkling aloe drinks infused with fruit flavours. This project aims to design a series of can packages that embody the brand’s quirky, space-inspired aesthetic while creating a cohesive and visually engaging product line.";

  const rationaleText = [
    "The drink primarily appeals to a young demographic with its punchy flavour profile. Therefore, the can packaging is designed to be bold and energetic, visually reflecting the drink’s vibrant taste while resonating with its target audience.",
    "A space girl serves as the brand’s mascot and the central focal point on the can, making the brand instantly recognizable on shelves.The layout draws inspiration from comic panels, incorporating dynamic compositions and vivid colours to create a high-energy feel that resonates with its target audience.",
    "Additional graphics are designed to resemble warning stickers, reinforcing the alien and space theme.",
  ];

  const images = [
    { path: canMockup, caption: "Aloe Alien drink can mockups" },
    { path: logo, caption: "Aloe Alien branding and mascot design" },
    {
      path: stickers,
      caption: "Sticker designs for can packaging",
    },
    {
      path: turnaround1,
      caption: "Original flavour can design mockup",
    },
    {
      path: turnaround2,
      caption: "Grape flavour can design mockup",
    },
    {
      path: turnaround3,
      caption: "Peach flavour can design mockup",
    },
  ];

  return (
    <ProjectTemplate
      title="Can Packaging Design"
      timeline="November 2025"
      roles={["Graphic Designer"]}
      tools={["Adobe Illustrator", "Adobe Photoshop"]}
      file={{ path: proof, text: "View Proof PDF" }}
      overview={overviewText}
      rationale={rationaleText}
      images={images}
    />
  );
}
