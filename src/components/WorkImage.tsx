import DriveVideo from "./DriveVideo";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { isExternalLink as isExternal } from "../config";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  aspectRatio?: number;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const video = props.video ?? "";
  const isExternalLink = isExternal(props.link ?? "");

  const handleMouseEnter = () => {
    if (props.video) setIsVideo(true);
  };

  let driveId = "";
  try {
    const url = new URL(video);
    if (url.hostname === "drive.google.com") {
      driveId = url.pathname.match(/^\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? url.searchParams.get("id") ?? "";
    }
  } catch { /* Local video paths use the native player below. */ }

  if (driveId) {
    return <DriveVideo id={driveId} title={props.alt || "Portfolio video"} image={props.image} aspectRatio={props.aspectRatio} />;
  }

  return (
    <div className="work-image">
      {props.link ? (
        isExternalLink ? (
          <a
            className="work-image-in"
            href={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVideo(false)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            <img src={props.image} alt={props.alt} loading="lazy" decoding="async" />
            {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
          </a>
        ) : (
          <Link
            className="work-image-in"
            to={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVideo(false)}
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            <img src={props.image} alt={props.alt} loading="lazy" decoding="async" />
            {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
          </Link>
        )
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor={"disable"}
        >
          <img src={props.image} alt={props.alt} loading="lazy" decoding="async" />
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
