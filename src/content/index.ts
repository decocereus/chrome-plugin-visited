import { runtime } from "webextension-polyfill";

const isALoginPage = () => {
  const loginForm = document.querySelector<HTMLFormElement>(
    'form[action*="login"]'
  );
  const passwordField = document.querySelector<HTMLFormElement>(
    'form[type*="password"]'
  );
  return !!loginForm && !!passwordField;
};

const getVisitedUrl = () => {
  return window.location.href;
};

if (!isALoginPage()) {
  const currentUrl: string = getVisitedUrl();
  console.log(currentUrl);
  runtime.sendMessage({ type: "logUrl", url: currentUrl });
} else {
  console.log("This is a login page");
}

export {};
