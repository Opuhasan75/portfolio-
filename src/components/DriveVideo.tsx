import { CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/DriveVideo.css";

export default function DriveVideo({ id, title, image, aspectRatio = 16 / 9 }: { id: string; title: string; image?: string; aspectRatio?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => { dialog.current?.close(); }, []);

  const play = () => {
    dialog.current?.showModal();
    setFailed(false);
    const video = media.current;
    if (video) {
      video.src = `/api/video?id=${id}`;
      // Start during the original click, before fullscreen consumes user activation.
      video.play().catch(() => { /* Native controls remain available. */ });
    }
    // Request from the user's click; unsupported browsers keep the full-window dialog.
    player.current?.requestFullscreen?.().catch(() => {});
  };

  const close = () => {
    if (document.fullscreenElement === player.current) {
      document.exitFullscreen?.().catch(() => {});
    }
    dialog.current?.close();
    media.current?.pause();
  };

  return (
    <div className={`work-image work-drive ${aspectRatio < 1 ? "drive-reel" : "drive-landscape"}`} style={{ "--video-ratio": aspectRatio } as CSSProperties} data-cursor="disable">
      <button className="drive-play" onClick={play} aria-label={`Play ${title} in full screen`}>
        <img src={image || `https://drive.google.com/thumbnail?id=${id}&sz=w1000`} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
        <span className="drive-play-label"><span aria-hidden="true">▶</span> Play video</span>
      </button>
      {createPortal(
        <dialog ref={dialog} className="drive-dialog" aria-label={title} onClose={() => media.current?.pause()}>
          <div ref={player} className="drive-fullscreen" data-cursor="disable">
            <div className="drive-toolbar">
              <span>{title}</span>
              <button autoFocus onClick={close} aria-label="Close video">Close ×</button>
            </div>
            <video
              ref={media}
              className="drive-native-video"
              poster={image}
              controls
              playsInline
              preload="none"
              aria-label={`${title} video`}
              onError={() => setFailed(true)}
            />
            {failed && <p className="drive-video-error" role="alert">This video could not load. Please try opening it in Google Drive below.</p>}
            <a className="drive-fallback" href={`https://drive.google.com/file/d/${id}/view`} target="_blank" rel="noopener noreferrer">Open in Google Drive ↗</a>
          </div>
        </dialog>, document.body
      )}
    </div>
  );
}


