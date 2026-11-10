import { useEffect, useRef, useState } from "react";
import "./styles/TechStackNew.css";
import { config, TechItem } from "../config";

// Arrange the flat list from portfolio.json into an inverted pyramid,
// e.g. 30 items -> rows of 10, 8, 6, 4, 2.
const toPyramid = (items: TechItem[]): TechItem[][] => {
  let top = 1;
  const capacity = (size: number) => {
    let total = 0;
    for (let row = size; row > 0; row -= 2) total += row;
    return total;
  };
  while (capacity(top) < items.length) top++;

  const rows: TechItem[][] = [];
  let start = 0;
  for (let size = top; size > 0 && start < items.length; size -= 2) {
    rows.push(items.slice(start, start + size));
    start += size;
  }
  return rows;
};

const techStack = toPyramid(config.techStack.items);

const TechStackNew = () => {
  const section = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  useEffect(() => {
    // Decorative media should not compete with the avatar on phones.
    if (window.innerWidth <= 1024 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let nearby = false;
    const sync = () => {
      if (!video.current) return;
      if (nearby && !document.hidden) video.current.play().catch(() => {});
      else video.current.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) setLoadVideo(true);
      sync();
    }, { rootMargin: "100px" });
    if (section.current) observer.observe(section.current);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  useEffect(() => { if (loadVideo) { video.current?.load(); video.current?.play().catch(() => {}); } }, [loadVideo]);
  return (
    <div className="techstack-new" ref={section}>
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          ref={video}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          className="techstack-video"
        >
          {loadVideo && <source src="/video/video.webm" type="video/webm" />}
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>{config.techStack.title}</h2>
        
        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
