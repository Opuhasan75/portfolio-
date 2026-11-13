import { CSSProperties, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/DriveVideo.css";

export default function YouTubeVideo({ id, title, aspectRatio = 16 / 9 }: { id: string; title: string; aspectRatio?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const close = () => {
    setPlaying(false);
    if (document.fullscreenElement === player.current) document.exitFullscreen?.().catch(() => {});
    dialog.current?.close();
  };
  const play = () => {
    setPlaying(true);
    dialog.current?.showModal();
    player.current?.requestFullscreen?.().catch(() => {});
  };
  return (
    <div className={`work-image work-drive ${aspectRatio < 1 ? "drive-reel" : "drive-landscape"}`} style={{ "--video-ratio": aspectRatio } as CSSProperties} data-cursor="disable">
      <button className="drive-play" onClick={play} aria-label={`Play ${title} in full screen`}>
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
        <span className="drive-play-label"><span aria-hidden="true">▶</span> Play video</span>
      </button>
      {createPortal(
        <dialog ref={dialog} className="drive-dialog" aria-label={title} onClose={() => setPlaying(false)}>
          <div ref={player} className="drive-fullscreen" data-cursor="disable">
            <div className="drive-toolbar"><span>{title}</span><button autoFocus onClick={close} aria-label="Close video">Close ×</button></div>
            {playing && <iframe title={`${title} YouTube player`} src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
            <a className="drive-fallback" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Open in YouTube ↗</a>
          </div>
        </dialog>, document.body
      )}
    </div>
  );
}
