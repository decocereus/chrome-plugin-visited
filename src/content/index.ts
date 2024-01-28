import { runtime } from "webextension-polyfill";

const isALoginPage = () => {
  const loginForm = document.querySelector<HTMLFormElement>(
    'form[action*="login"]'
  );
  const passwordField = document.querySelector<HTMLFormElement>(
    'form[type*="password"]'
  );
  const signOrLoginUrl =
    window.location.href.toLowerCase().includes("signin") ||
    window.location.href.toLowerCase().includes("login");
  return !!loginForm || !!passwordField || !!signOrLoginUrl;
};

const getVisitedUrl = () => {
  return window.location.href;
};

if (!isALoginPage()) {
  const currentUrl: string = getVisitedUrl();
  if (
    currentUrl !==
    "chrome-extension://mjiolbnjlbfeadfiebfhnabjkhmadkml/index.html"
  ) {
    runtime.sendMessage({ type: "logUrl", url: currentUrl });
  }
} else {
  console.log("This is a login page");
}

export {};
