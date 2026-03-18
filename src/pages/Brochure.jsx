import ProjectTemplate from "../components/projectTemplate";

// Assets
import mockup from "../assets/travel/mockup.webp";
import pages from "../assets/travel/pages.webp";
import proof from "../assets/travel/proof.pdf";
import closeup from "../assets/travel/closeup.png";
import closeup2 from "../assets/travel/closeup2.png";

export default function Brochure() {
  const overviewText =
    "G Adventures is a travel company offering immersive, small-group tours around the world. This project aims to design a tour brochure that clearly presents the itinerary while capturing the excitement and spirit of adventure, creating a cohesive and visually engaging piece that informs and inspires potential travelers.";

  const rationaleText = [
    "The tour primarily appeals to travelers seeking an immersive experience in nature, with a focus on exploring the landscapes of Yellowstone and Grand Teton. Therefore, the brochure is designed with a rugged, scrapbook-inspired aesthetic that reflects the raw beauty and sense of adventure associated with the journey.",
    "A journal-style layout serves as the foundation of the design, with elements arranged to resemble collected memories from a trip. Photographs are edited to mimic polaroids and stickers, reinforcing the idea of a personal travel log and creating a more authentic feel.",
    "The colour palette is composed of earthy greens and warm beige tones, accented with touches of sunny orange. This combination reflects the natural environment of the tour destinations while adding warmth and visual interest.",
  ];

  const images = [
    { path: mockup, caption: "G Adventure tour brochure mockup" },
    { path: closeup2, caption: "Simplified map of the tour" },
    {
      path: closeup,
      caption: "Photos and stickers arranged in a journal style layout",
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
