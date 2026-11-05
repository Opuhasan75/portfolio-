import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config, fullName } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const { firstName, lastName, greeting, headline, photo } = config.profile;

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{greeting}</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>{headline.prefix}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{headline.accent[0]}</div>
              {headline.accent[1] && (
                <div className="landing-h2-2">{headline.accent[1]}</div>
              )}
            </h2>
            <h2>
              <div className="landing-h2-info">{headline.main[0]}</div>
              {headline.main[1] && (
                <div className="landing-h2-info-1">{headline.main[1]}</div>
              )}
            </h2>
          </div>
          <div className="mobile-headline"><p>{headline.accent[0]} {headline.main[0]}</p><span>Animation &amp; Video Editing</span></div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          {photo && (
            <div className="mobile-photo">
              <img
                src={photo}
                alt={fullName}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
