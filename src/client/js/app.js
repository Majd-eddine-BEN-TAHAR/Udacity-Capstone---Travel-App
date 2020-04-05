import { validateInputs } from "./_validateInputs";
import { sendRequest } from "./_sendRequest";

const postUrl = `http://localhost:8085/POST`;
const backdrop = document.querySelector(".backdrop");
const destination = document.querySelector(".destination");
const depart = document.querySelector(".depart");
const returning = document.querySelector(".returning");
const warningText = document.querySelector(".warning");
const temperature = document.querySelector(".temperature");
const tempImgSection = document.querySelector(".temp-img-section");
const img = document.querySelector(".img");
const trip = document.querySelector(".trip");
const going = document.querySelector(".going");
const back = document.querySelector(".back");
const weather = document.querySelector(".weather");
const spinner = document.querySelector(".spinner");
tempImgSection.style.display = "none";
let dataTosend = {};

export function getData() {
  if (validateInputs()) {
    const todayDate = (new Date().getTime() / 1000).toFixed();
    const sevenDaysInSeconds = 24 * 60 * 60 * 7;
    const departing = (new Date(depart.value).getTime() / 1000).toFixed();
    const theDepartingDate = depart.value;
    const theReturningDate = returning.value;
    // If the trip is within a week
    if (departing - todayDate < sevenDaysInSeconds) {
      dataTosend = {
        destination: destination.value,
        departing: todayDate,
        // returning: (new Date(returning.value).getTime() / 1000).toFixed(),
      };
      spinner.style.display = "block";
      sendRequest(postUrl, dataTosend)
        .then((res) => {
          spinner.style.display = "none";
          if (res.data.error === undefined) {
            trip.innerText = `next trip is to : ${destination.value}`;
            going.innerText = `depart date : ${theDepartingDate}`;
            back.innerText = `return date : ${theReturningDate}`;
            temperature.innerText = `temperature : ${res.data.temperature} F`;
            weather.innerText = `summary : ${res.data.summary}`;
            img.src = res.data.image;
            tempImgSection.style.display = "block";
          } else if (res.data.error == "destination") {
            backdrop.classList.add("showBackdrop");
            warningText.innerText = "invalid destination name";
          } else {
            backdrop.classList.add("showBackdrop");
            warningText.innerText = res.data.error;
          }
        })
        .catch((error) => {
          spinner.style.display = "none";
          backdrop.classList.add("showBackdrop");
          warningText.innerText = error.message;
        });
    } else {
      // else the trip is in the future
      dataTosend = {
        destination: destination.value,
        departing: departing,
        // returning: (new Date(returning.value).getTime() / 1000).toFixed(),
      };
      spinner.style.display = "block";
      sendRequest(postUrl, dataTosend)
        .then((res) => {
          spinner.style.display = "none";
          if (res.data.error === undefined) {
            trip.innerText = `next trip is to : ${destination.value}`;
            going.innerText = `depart date : ${theDepartingDate}`;
            back.innerText = `return date : ${theReturningDate}`;
            temperature.innerText = `temperature : ${res.data.temperature} F`;
            weather.innerText = `summary : ${res.data.summary}`;
            img.src = res.data.image;
            tempImgSection.style.display = "block";
          } else if (res.data.error == "destination") {
            backdrop.classList.add("showBackdrop");
            warningText.innerText = "invalid destination name";
          } else {
            backdrop.classList.add("showBackdrop");
            warningText.innerText = res.data.error;
          }
        })
        .catch((error) => {
          spinner.style.display = "none";
          backdrop.classList.add("showBackdrop");
          warningText.innerText = error.message;
        });
    }
  }
}
