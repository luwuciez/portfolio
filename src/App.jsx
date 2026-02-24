import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import NavbarMobile from "./components/navbarMobile";
import Home from "./pages/Home";
import Play from "./pages/Play";
import About from "./pages/About";
import MenuDesign from "./pages/MenuDesign";
import CanDesign from "./pages/CanDesign";
import Background from "./components/background";
import Footer from "./components/footer";
import BackToTop from "./components/backToTop";
import SafeSpace from "./pages/SafeSpace";
import SmoothScroll from "./components/smoothScroll";
import ScrollToTop from "./components/scrollToTop";
import InkLinkPromo from "./pages/InkLinkPromo";

function App() {
  return (
    <>
      <Background />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <BrowserRouter>
            <ScrollToTop />
            <SmoothScroll>
              <div className="fixed top-0 left-0 w-full z-10">
                {/* Desktop navbar */}
                <div className="hidden sm:block">
                  <Navbar />
                </div>
                {/* Mobile navbar */}
                <div className="sm:hidden">
                  <NavbarMobile />
                </div>
              </div>
              <div className="relative z-5">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/play" element={<Play />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu-design" element={<MenuDesign />} />
                  <Route path="/can-design" element={<CanDesign />} />
                  <Route path="/safespace" element={<SafeSpace />} />
                  <Route path="/inklink-promo" element={<InkLinkPromo />} />
                </Routes>
              </div>
            </SmoothScroll>
          </BrowserRouter>
        </div>
        <BackToTop />
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
