import "./scss/style.scss";
import { getData } from "./js/app";
import { backdrop, okButton, form } from "./js/_eventsListeners";

form.addEventListener("submit", getData);
