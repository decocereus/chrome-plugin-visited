import { runtime } from "webextension-polyfill";
import { sendVisitedUrl } from "../popup/utils/apiCalls";
import { AuthUser, LogUrlMessage } from "../popup/lib/definitions";

let CURRENT_USER_ID: null | string = null;

const handleVisitedUrl = async (visitedUrl: string) => {
  let response = await sendVisitedUrl({
    visitedUrl: visitedUrl,
    googleId: CURRENT_USER_ID,
  });
  console.log(response);
};

runtime.onInstalled.addListener(() => {
  console.log("[background] loaded ");
});

runtime.onMessage.addListener(
  (message: LogUrlMessage, sender, sendResponse) => {
    if (message.type === "logUrl") {
      if (CURRENT_USER_ID) {
        console.log("Received URL:", message.url, CURRENT_USER_ID);
        handleVisitedUrl(message.url);
      }
    }
  }
);

runtime.onMessage.addListener((message: AuthUser, sender, sendResponse) => {
  if (message.type === "authUser") {
    CURRENT_USER_ID = message.googleId;
  }
});

export {};
