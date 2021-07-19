import firebase from "./firebase";

export const SIGNUP_CLICK = "signup_click";
export const ABOUT_CLICK = "about_click";

export const pageview = (url) => {
  firebase.analytics().setCurrentScreen(url);
  firebase.analytics().logEvent("screen_view");
};

export const event = ({ action, params }) => {
  firebase.analytics().logEvent(action, params);
};
