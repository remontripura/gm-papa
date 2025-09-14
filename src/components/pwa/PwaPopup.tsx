"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // already installed check
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      console.log("PWA already installed ✅");
      return; // never show again
    }

    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    const nextShow = localStorage.getItem("pwaInstallNextShow");
    const shouldShow = !nextShow || Date.now() > parseInt(nextShow, 10);

    if (isMobile && shouldShow) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      };

      window.addEventListener("beforeinstallprompt", handler as any);

      return () =>
        window.removeEventListener("beforeinstallprompt", handler as any);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);

    if (choiceResult.outcome === "accepted") {
      // permanently block since installed
      localStorage.setItem("pwaInstalled", "true");
    } else {
      // if dismissed by rejecting the prompt → 6 hour block
      const nextShow = Date.now() + 6 * 60 * 60 * 1000;
      localStorage.setItem("pwaInstallNextShow", nextShow.toString());
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    // user clicked "Maybe Later" → 6 hour block
    const nextShow = Date.now() + 6 * 60 * 60 * 1000;
    localStorage.setItem("pwaInstallNextShow", nextShow.toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-2 text-indigo-600">📲 Install App</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Would you like to install this app for a better experience?
        </p>

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={handleInstall}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Install Now
          </button>
          <button
            onClick={handleDismiss}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
