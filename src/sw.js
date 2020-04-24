/* eslint-disable no-undef */
import { precacheAndRoute } from "workbox-precaching";
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

precacheAndRoute(self.__WB_MANIFEST);

workbox.precaching.precacheAndRoute([]);
