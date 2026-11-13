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

const adobeMarks: Record<string, { text: string; color: string }> = {
  "Adobe After Effects": { text: "Ae", color: "#a99bff" },
  "Adobe Premiere Pro": { text: "Pr", color: "#a99bff" },
  "Adobe Photoshop": { text: "Ps", color: "#31a8ff" },
  "Adobe Illustrator": { text: "Ai", color: "#ff9a00" },
};

const ToolIcon = ({ tech }: { tech: TechItem }) => {
  const mark = adobeMarks[tech.name];
  if (mark) return <span className="tool-bare-mark" aria-hidden="true" style={{ color: mark.color }}>{mark.text}</span>;
  if (tech.name === "DaVinci Resolve") return (
    <svg className="tool-bare-icon" viewBox="0 0 64 64" aria-hidden="true">
      <path fill="#28c6d4" d="M32 29C23 22 19 16 22 9C26-2 43 1 44 12C45 19 38 25 32 29Z" />
      <path fill="#f0dc61" d="M29 34C28 45 24 54 16 55C4 56 0 42 9 36C15 32 23 33 29 34Z" />
      <path fill="#f36b6b" d="M36 34C47 31 55 34 58 41C63 52 49 61 41 52C37 47 36 40 36 34Z" />
    </svg>
  );
  return <img src={tech.icon} alt="" loading="lazy" decoding="async" />;
};

const TechStackNew = () => {
  const section = useRef<HTMLDivElement>(null);
  const orbit = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setRevealed(entry.isIntersecting), { threshold: 0.2 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
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
  useEffect(() => {
    const stage = orbit.current;
    if (!stage || !revealed) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>(".techstack-item"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let frame = 0;
    let last = 0;
    let phase = 0;
    let targetX = 0, targetY = 0, tiltX = 0, tiltY = 0;
    const resize = new ResizeObserver(() => { width = stage.clientWidth; height = stage.clientHeight; });
    resize.observe(stage);
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - .5;
      targetY = (event.clientY - rect.top) / rect.height - .5;
    };
    const leave = () => { targetX = 0; targetY = 0; };
    const draw = (now: number) => {
      if (!document.hidden && (!last || now - last >= 32)) {
        const delta = last ? Math.min(now - last, 64) : 0;
        last = now;
        if (!reduced) phase += delta * .00016;
        tiltX += (targetX - tiltX) * .045;
        tiltY += (targetY - tiltY) * .045;
        items.forEach((item, index) => {
          const angle = index / items.length * Math.PI * 2 + phase;
          const depth = (Math.sin(angle) + 1) / 2;
          const x = Math.cos(angle) * (width / 2 - (width < 700 ? 48 : 65));
          const y = Math.sin(angle) * height * .34 + Math.cos(angle) * tiltX * 65 + tiltY * 22;
          const scale = .65 + depth * .4;
          item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
          item.style.opacity = `${.45 + depth * .55}`;
          item.style.zIndex = `${Math.round(depth * 10) + 1}`;
        });
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, [revealed]);
  return (
    <div className="techstack-new tools-orbit" ref={section}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}><defs><filter id="tool-icon-white" colorInterpolationFilters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" result="cutout" /><feComposite in="cutout" in2="SourceGraphic" operator="in" /></filter></defs></svg>
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
        
        <div className="techstack-pyramid" ref={orbit}>
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  <ToolIcon tech={tech} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;

