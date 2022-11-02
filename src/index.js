import main from "./js/main";
import { networkHandler } from "./js/utils/network/automerge";

(async () => {
  networkHandler.addItem("buy bananas");
  const aa = await networkHandler.getDocById("some");
  console.log("aa 👉", aa);

  main();
})();
