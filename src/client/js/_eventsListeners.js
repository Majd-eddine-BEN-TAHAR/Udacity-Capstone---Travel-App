export const backdrop = document.querySelector(".backdrop");
export const okButton = document.querySelector(".ok");
export const form = document.querySelector(".form");

backdrop.addEventListener("click", (e) => {
  if (e.target.classList.contains("backdrop")) {
    backdrop.classList.remove("showBackdrop");
  }
});
okButton.addEventListener("click", () => {
  backdrop.classList.remove("showBackdrop");
});
