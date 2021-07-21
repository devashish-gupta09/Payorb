import firebase from "./firebase";

export const SIGNUP_CLICK = "signup_click";
export const ABOUT_CLICK = "about_click";
export const SIGNUP_DONE = "signup_done";

export const pageview = (url) => {
  if (!isProd()) {
    return;
  }
  firebase.analytics().setCurrentScreen(url);
  firebase.analytics().logEvent("screen_view");
};

export const event = ({ action, params }) => {
  if (!isProd()) {
    return;
  }
  firebase.analytics().logEvent(action, params);
};

const isProd = () => process.env.NODE_ENV === "production";
