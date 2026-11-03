import { Link } from "react-router-dom";
import { config, hireUrl, isExternalLink } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const { play, hire } = config.callToAction;
  const showPlay = play.enabled && config.play.enabled;

  return (
    <div className="cta-section">
      <div className="cta-buttons">
        {showPlay && (
          <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
            {play.label}
          </Link>
        )}

        <a
          href={hireUrl}
          target={isExternalLink(hireUrl) && !hireUrl.startsWith("mailto:") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          {hire.label}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
