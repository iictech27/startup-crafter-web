import { Blog, Help, Hero, Events } from "../components";
import About from "../components/landing_page/about/About";
import footerSVG from "../assets/vectors/footerSVG.png";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Help />
      <Blog />
      <Events />
      <About />
      <section>
        <img
          src={footerSVG}
          alt="footer"
          className="relative w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
        />
      </section>
    </div>
  );
}
