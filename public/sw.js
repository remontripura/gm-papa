import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute([
  { url: "/manifest.json", revision: "1" },
  { url: "/favicon.ico", revision: "1" },
  { url: "/logo2.png", revision: "1" },
]);
