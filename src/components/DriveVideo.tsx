import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/DriveVideo.css";

export default function DriveVideo({ id, title }: { id: string; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => () => { dialog.current?.close(); }, []);

  const play = () => {
    dialog.current?.showModal();
    setOpen(true);
    // Request from the user's click; unsupported browsers keep the full-window dialog.
    player.current?.requestFullscreen?.().catch(() => {});
  };

  const close = () => {
    if (document.fullscreenElement === player.current) {
      document.exitFullscreen?.().catch(() => {});
    }
    dialog.current?.close();
    setOpen(false);
  };

  return (
    <div className="work-image work-drive" data-cursor="disable">
      <button className="drive-play" onClick={play} aria-label={`Play ${title} in full screen`}>
        <img src={`https://drive.google.com/thumbnail?id=${id}&sz=w1000`} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
        <span className="drive-play-label"><span aria-hidden="true">▶</span> Play video</span>
      </button>
      {createPortal(
        <dialog ref={dialog} className="drive-dialog" aria-label={title} onClose={() => setOpen(false)}>
          <div ref={player} className="drive-fullscreen" data-cursor="disable">
            <div className="drive-toolbar">
              <span>{title}</span>
              <button autoFocus onClick={close} aria-label="Close video">Close ×</button>
            </div>
            {open && <iframe
              src={`https://drive.google.com/file/d/${id}/preview?autoplay=1`}
              title={`${title} video`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />}
            <a className="drive-fallback" href={`https://drive.google.com/file/d/${id}/view`} target="_blank" rel="noopener noreferrer">Open in Google Drive ↗</a>
          </div>
        </dialog>, document.body
      )}
    </div>
  );
}
