import "./styles/TechStackNew.css";
import { config } from "../config";

const TechStackNew = () => (
  <section className="techstack-new" aria-labelledby="toolkit-heading">
    <div className="techstack-content">
      <div className="toolkit-heading">
        <p className="toolkit-eyebrow">THE TOOLS BEHIND THE WORK</p>
        <h2 id="toolkit-heading">{config.techStack.title}</h2>
        <p className="toolkit-description">From the first idea to the final frame.</p>
      </div>
      <div className="techstack-pyramid">
        {config.techStack.items.map((tech) => (
          <a key={tech.name} href={tech.url} target="_blank" rel="noopener noreferrer" className="techstack-item" title={tech.name} data-cursor="disable">
            <span className="toolkit-icon"><img src={tech.icon} alt="" loading="lazy" decoding="async" /></span>
            <span className="toolkit-name">{tech.name}</span>
            <span className="toolkit-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackNew;
