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
  return (
    <div className="techstack-new">
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
