const backdrop = document.querySelector(".backdrop");
const warningText = document.querySelector(".warning");
const destination = document.querySelector(".destination");
const depart = document.querySelector(".depart");
const returning = document.querySelector(".returning");
const onlyLettersRegExp = /^[a-zA-Z\s]+$/;
const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

export function validateInputs() {
  if (destination.value === "") {
    // desination empty
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "Destination cannot be empty";
    return false;
  } else if (!onlyLettersRegExp.test(destination.value)) {
    // destination contain letters only
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "Destination should contain letters only";
    return false;
  } else if (!dateRegex.test(depart.value)) {
    // departing empty
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "you should select a departing date";
    return false;
  } else if (
    // test if departing date < actual Date
    +(new Date().getTime() / 1000).toFixed() >
    +(new Date(depart.value).getTime() / 1000).toFixed()
  ) {
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "you should select a future date for departing ";
    return false;
  } else if (!dateRegex.test(returning.value)) {
    // empty returning
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "you should select a returning date";
    return false;
  } else if (
    // test if returning date < actual Date
    +(new Date().getTime() / 1000).toFixed() >
    +(new Date(returning.value).getTime() / 1000).toFixed()
  ) {
    backdrop.classList.add("showBackdrop");
    warningText.innerText = "you should select a future date for returning";
    return false;
  } else if (
    // departing > returning
    +(new Date(returning.value).getTime() / 1000).toFixed() -
      +(new Date(depart.value).getTime() / 1000).toFixed() <
    0
  ) {
    backdrop.classList.add("showBackdrop");
    warningText.innerText =
      "you should  select a date after departing for your returning";
    return false;
  } else if (
    // departing == returning
    +(new Date(returning.value).getTime() / 1000).toFixed() -
      +(new Date(depart.value).getTime() / 1000).toFixed() <
    86400
  ) {
    backdrop.classList.add("showBackdrop");
    warningText.innerText =
      "your returning should be after at least one day from your departing date";
    return false;
  } else {
    return true;
  }
}
