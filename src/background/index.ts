import { runtime } from "webextension-polyfill";

runtime.onInstalled.addListener(() => {
  console.log("[background] loaded ");
});

interface LogUrlMessage {
  type: "logUrl";
  url: string;
}
runtime.onMessage.addListener(
  (message: LogUrlMessage, sender, sendResponse) => {
    if (message.type === "logUrl") {
      console.log("Received URL:", message.url);
    }
  }
);

export {};
