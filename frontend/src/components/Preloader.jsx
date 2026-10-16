import { useEffect, useState } from "react";
import "./Preloader.css";

const SESSION_KEY = "enigma-preloader-seen";

function hasSeenPreloader() {
  try {
    return Boolean(window.sessionStorage.getItem(SESSION_KEY));
  } catch {
    return false;
  }
}

export default function Preloader() {
  const [visible, setVisible] = useState(() => !hasSeenPreloader());
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Keep the preloader usable when storage is blocked.
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animationDuration = reducedMotion ? 500 : 2900;
    const minimumVisible = reducedMotion ? 500 : 2600;
    const startedAt = performance.now();
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    let pageLoaded = document.readyState === "complete";
    let animationComplete = false;
    let hasStartedExit = false;
    let minimumTimer;
    let exitTimer;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const beginExitWhenReady = () => {
      if (!pageLoaded || !animationComplete || hasStartedExit) return;
      hasStartedExit = true;
      const remainingMinimum = Math.max(0, minimumVisible - (performance.now() - startedAt));
      minimumTimer = window.setTimeout(() => {
        setExiting(true);
        exitTimer = window.setTimeout(() => setVisible(false), 600);
      }, remainingMinimum);
    };

    const handleLoad = () => {
      pageLoaded = true;
      beginExitWhenReady();
    };
    if (!pageLoaded) window.addEventListener("load", handleLoad, { once: true });

    const animationTimer = window.setTimeout(() => {
      animationComplete = true;
      beginExitWhenReady();
    }, animationDuration);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.clearTimeout(animationTimer);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(exitTimer);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`enigma-preloader${exiting ? " is-exiting" : ""}`} role="status" aria-label="Loading">
      <svg className="enigma-preloader__mark" viewBox="0 0 200 220" aria-hidden="true">
        <polygon className="enigma-preloader__outer" points="100,6 188,56 188,164 100,214 12,164 12,56" pathLength="1" />
        <polygon className="enigma-preloader__inner" points="100,28 168,67 168,153 100,192 32,153 32,67" />
        <text className="enigma-preloader__word" x="100" y="116" textAnchor="middle">ENIGMA</text>
      </svg>
    </div>
  );
}

