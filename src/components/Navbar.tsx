import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px)", () => {
      const scroll = new Lenis({ duration: 1.7, smoothWheel: true, wheelMultiplier: 1.7 });
      lenis = scroll;
      let frame = 0;
      const raf = (time: number) => { scroll.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      const navigate = (event: Event) => {
        const link = event.currentTarget as HTMLAnchorElement;
        const section = link.getAttribute("data-href");
        const target = section ? document.querySelector<HTMLElement>(section) : null;
        if (target) { event.preventDefault(); scroll.scrollTo(target, { duration: 1.2 }); }
      };
      const links = document.querySelectorAll(".header ul a");
      links.forEach(link => link.addEventListener("click", navigate));
      return () => {
        cancelAnimationFrame(frame);
        links.forEach(link => link.removeEventListener("click", navigate));
        scroll.destroy();
        if (lenis === scroll) lenis = null;
      };
    });
    return () => media.revert();
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {config.site.logo}
        </a>
        <a
          href={`mailto:${config.profile.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.profile.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
