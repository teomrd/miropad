export const registerSW = serviceWorker => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register(serviceWorker);
    });
    console.log("serviceWorker registered!");
  } else {
    console.log("serviceWorker 😬!");
  }
};
