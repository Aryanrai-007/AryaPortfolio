import { useEffect, useState } from "react";

const WORDS = ["Full Stack", "AI", "Prompt Engineering", "Writing", "Building", "Code Blooded"];

export default function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const ratio = Math.min((now - start) / 1000, 1);
      setProgress(Math.floor(ratio * 100));
      if (ratio < 1) frame = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return <div className={`loader${done ? " done" : ""}`} aria-hidden="true">
    <div className="loader-panels" />
    <div className="loader-copy"><span>{WORDS[Math.min(WORDS.length - 1, Math.floor(progress / 17))]}</span><b>{progress}%</b></div>
  </div>;
}
