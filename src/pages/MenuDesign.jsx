import ProjectTemplate from "../components/projectTemplate";

// Assets
import menuMockup from "../assets/menu/menu_mockup.webp";
import logo from "../assets/menu/logo.png";
import palette from "../assets/menu/palette.png";
import luckybreakMenu from "../assets/menu/luckybreak_menu.pdf";

export default function MenuDesign() {
  const overviewText =
    "The client, Lucky Break, is a brunch restaurant that needs a menu design that is easy to read and matches their family-friendly branding, as well as a fun logo that reflects the restaurant’s welcoming ambiance.";

  const rationaleText = [
    "A palette of bright, bold primary colours was chosen to create a playful feel that appeals to a target audience of families and children.",
    "The logo was designed to resemble freely arranged fridge magnets, calling back on fun childhood memories. The tail of the letter “y” forms a smiling face, further reinforcing the restaurant’s friendly and playful personality.",
    "A two-column layout was used to organize the client’s menu without overwhelming the reader. The narrower column width improves readability by making it easier for the eye to move from line to line. Red and blue branding colours were used to highlight key information and support quick scanning at the table.",
  ];

  const images = [
    { path: menuMockup, caption: "Lucky Break brunch menu mockup" },
    { path: logo, caption: "Lucky Break logo design" },
    { path: palette, caption: "Color palette for Lucky Break branding" },
  ];

  return (
    <ProjectTemplate
      title="Menu Design"
      timeline="April 2025"
      roles={["Graphic Designer"]}
      tools={["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"]}
      file={{ path: luckybreakMenu, text: "View Menu PDF" }}
      overview={overviewText}
      rationale={rationaleText}
      images={images}
    />
  );
}
