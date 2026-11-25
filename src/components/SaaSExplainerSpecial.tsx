import YouTubeVideo from "./YouTubeVideo";
import "./styles/SaaSExplainerSpecial.css";

const videos = ["JSTlMyabV9U", "nA6tihpPenQ", "JPDONITYAEs", "BHhtpfsEIqw", "BMbw1FDUs8k"];

export default function SaaSExplainerSpecial() {
  return (
    <section className="saas-special" id="saas-explainer-special" aria-labelledby="saas-special-title">
      <header className="saas-special-header">
        <p className="saas-special-eyebrow">FEATURED WORK</p>
        <h2 id="saas-special-title">SaaS Explainer <span>Special</span></h2>
        <p>Product stories, brought to life through motion.</p>
      </header>
      <div className="saas-special-grid">
        {videos.map((id, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <article className="saas-special-card" key={id}>
              <YouTubeVideo id={id} title={`SaaS Explainer Special ${number}`} />
              <div className="saas-special-caption">
                <span className="saas-special-number">{number}</span>
                <h3>SaaS Explainer {number}</h3>
                <span className="saas-special-tag">Motion design</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
