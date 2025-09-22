// "use client";

// import { useEffect, useState } from "react";

// export default function InstallPrompt() {
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const isStandalone =
//       window.matchMedia("(display-mode: standalone)").matches ||
//       (window.navigator as any).standalone === true;

//     if (isStandalone) {
//       console.log("PWA already installed ✅");
//       return;
//     }

//     const mobile =
//       /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
//         navigator.userAgent
//       );
//     setIsMobile(mobile);

//     const nextShow = localStorage.getItem("pwaInstallNextShow");
//     const shouldShow = !nextShow || Date.now() > parseInt(nextShow, 10);

//     if (shouldShow) {
//       const handler = (e: Event) => {
//         e.preventDefault();
//         setDeferredPrompt(e);
//         setShowPrompt(true);
//       };

//       window.addEventListener("beforeinstallprompt", handler as any);

//       return () =>
//         window.removeEventListener("beforeinstallprompt", handler as any);
//     }
//   }, []);

//   const handleInstall = async () => {
//     if (!deferredPrompt) return;

//     deferredPrompt.prompt();
//     const choiceResult = await deferredPrompt.userChoice;
//     console.log("User choice:", choiceResult.outcome);

//     if (choiceResult.outcome === "accepted") {
//       localStorage.setItem("pwaInstalled", "true");
//     } else {
//       const nextShow = Date.now() + 6 * 60 * 60 * 1000;
//       localStorage.setItem("pwaInstallNextShow", nextShow.toString());
//     }

//     setDeferredPrompt(null);
//     setShowPrompt(false);
//   };

//   const handleDismiss = () => {
//     const nextShow = Date.now() + 6 * 60 * 60 * 1000;
//     localStorage.setItem("pwaInstallNextShow", nextShow.toString());
//     setShowPrompt(false);
//   };

//   if (!showPrompt) return null;

//   return (
//     <>
//       {isMobile ? (
//         // 📱 Mobile → Bottom Full-width Popup
//         <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 p-4 shadow-xl border-t rounded-t-2xl z-50">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-base font-bold text-indigo-600 flex items-center">
//                 📲 Install App
//               </h2>
//               <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
//                 Would you like to install this app for a better experience?
//               </p>
//             </div>
//             <button
//               onClick={handleDismiss}
//               className="text-gray-500 hover:text-gray-800 dark:hover:text-white ml-3"
//             >
//               ✖
//             </button>
//           </div>

//           <div className="mt-3 flex justify-end gap-2">
//             <button
//               onClick={handleInstall}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//             >
//               Install
//             </button>
//           </div>
//         </div>
//       ) : (
//         // 💻 Desktop → Small bottom-right modal
//         <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg w-72 z-50">
//           <div className="flex justify-between items-start">
//             <h2 className="text-sm font-bold text-indigo-600">📲 Install App</h2>
//             <button
//               onClick={handleDismiss}
//               className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
//             >
//               ✖
//             </button>
//           </div>
//           <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
//             Install this app for a better experience.
//           </p>

//           <button
//             onClick={handleInstall}
//             className="mt-3 w-full bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Install
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
