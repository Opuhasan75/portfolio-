// All site content lives in src/data/portfolio.json.
// This file only adds types and a few derived helpers on top of it.
import data from "./data/portfolio.json";

export interface Project {
  title: string;
  category: string;
  tech: string[];
  image: string;
  /** Optional preview clip (e.g. /videos/reel.mp4) that plays on hover. */
  video?: string;
  description: string;
  link: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Service {
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  url: string;
}

export interface Social {
  name: string;
  icon: string;
  url: string;
  showInSidebar: boolean;
}

export interface PortfolioConfig {
  site: {
    title: string;
    description: string;
    logo: string;
    url: string;
    theme: {
      accentColor: string;
      highlightColor: string;
      backgroundColor: string;
    };
  };
  profile: {
    firstName: string;
    lastName: string;
    greeting: string;
    photo: string;
    location: string;
    email: string;
    resume: string;
    headline: {
      prefix: string;
      accent: string[];
      main: string[];
    };
  };
  loader: {
    brand: string;
    marquee: string[];
  };
  about: {
    title: string;
    description: string;
  };
  services: Service[];
  experience: Experience[];
  projects: Project[];
  techStack: {
    title: string;
    items: TechItem[];
  };
  socials: Social[];
  callToAction: {
    play: { enabled: boolean; label: string };
    hire: { label: string; url: string };
  };
  play: {
    enabled: boolean;
    opponentName: string;
    opponentLabel: string;
    engineDepth: number;
  };
  avatar: {
    enabled: boolean;
    model: string;
    encrypted: boolean;
    decryptionKey: string;
    dracoDecoderPath: string;
    environmentMap: string;
    environmentIntensity: number;
    headTracking: boolean;
    colors: Record<string, string>;
    lights: {
      keyColor: string;
      keyIntensity: number;
      screenColor: string;
    };
    monitor: {
      screenColor: string;
      glowColor: string;
    };
    camera: {
      fov: number;
      position: number[];
      zoom: number;
    };
  };
}

export const config: PortfolioConfig = data;

export const fullName = [config.profile.firstName, config.profile.lastName]
  .filter(Boolean)
  .join(" ");

/** Socials that have a URL filled in. */
export const activeSocials = config.socials.filter((social) => social.url);

/** Where the "Hire Me" button points: explicit URL, else LinkedIn, else email. */
export const hireUrl =
  config.callToAction.hire.url ||
  activeSocials.find((social) => social.icon === "linkedin")?.url ||
  `mailto:${config.profile.email}`;

/** The 3D avatar only renders on desktop-sized screens. */
export const showAvatar = () => config.avatar.enabled && window.innerWidth > 1024;

export const isExternalLink = (link: string) => Boolean(link) && !link.startsWith("/");
