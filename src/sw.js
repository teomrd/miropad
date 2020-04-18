/* eslint-disable no-undef */
import { precacheAndRoute } from "workbox-precaching";
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

precacheAndRoute(self.__WB_MANIFEST);

workbox.precaching.precacheAndRoute([]);
