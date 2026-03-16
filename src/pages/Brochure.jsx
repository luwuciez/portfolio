import ProjectTemplate from "../components/projectTemplate";

// Assets
import mockup from "../assets/travel/mockup.webp";
import pages from "../assets/travel/pages.webp";
import proof from "../assets/travel/proof.pdf";

export default function Brochure() {
  const overviewText =
    "Aloe Alien is a beverage brand specializing in sparkling aloe drinks infused with fruit flavours. This project aims to design a series of can packages that embody the brand’s quirky, space-inspired aesthetic while creating a cohesive and visually engaging product line.";

  const rationaleText = [
    "The drink primarily appeals to a young demographic with its punchy flavour profile. Therefore, the can packaging is designed to be bold and energetic, visually reflecting the drink’s vibrant taste while resonating with its target audience.",
    "A space girl serves as the brand’s mascot and the central focal point on the can, making the brand instantly recognizable on shelves.The layout draws inspiration from comic panels, incorporating dynamic compositions and vivid colours to create a high-energy feel that resonates with its target audience.",
    "Additional graphics are designed to resemble warning stickers, reinforcing the alien and space theme.",
  ];

  const images = [
    { path: mockup, caption: "GAdventure tour brochure mockup" },
    { path: pages, caption: "Aloe Alien branding and mascot design" },
    {
      path: pages,
      caption: "Sticker designs for can packaging",
    },
    {
      path: pages,
      caption: "Tour brochure spreads",
    },
  ];

  return (
    <ProjectTemplate
      title="Tour Brochure"
      timeline="October 2025"
      roles={["Graphic Designer"]}
      tools={["Adobe InDesign", "Adobe Photoshop"]}
      file={{ path: proof, text: "View Proof PDF" }}
      overview={overviewText}
      rationale={rationaleText}
      images={images}
    />
  );
}
