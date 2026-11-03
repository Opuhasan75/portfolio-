import {
  FaBehance,
  FaDribbble,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaVimeoV,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { activeSocials, config } from "../config";

// Values allowed for "icon" in portfolio.json socials
const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  vimeo: FaVimeoV,
  dribbble: FaDribbble,
  behance: FaBehance,
  medium: FaMedium,
  email: FaEnvelope,
  website: FaGlobe,
};

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {activeSocials
          .filter((social) => social.showInSidebar)
          .map((social) => {
            const Icon = socialIcons[social.icon] ?? FaGlobe;
            return (
              <span key={social.name}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                  <Icon />
                </a>
              </span>
            );
          })}
      </div>
      {config.profile.resume && (
        <a className="resume-button" href={config.profile.resume} target="_blank" rel="noopener noreferrer">
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
