import { setRouter } from "../router/router.js";

setRouter();

//const backendURL = "http://saintpeter-backend.test/api";
const backendURL = "http://d796-103-123-40-11.ngrok-free.app/api";

function showAlert(type, message) {
  const alertDiv = document.querySelector(`.alert.alert-${type}`);
  if (alertDiv) {
    alertDiv.classList.remove("d-none");
    alertDiv.textContent = message;

  }
}

export { backendURL, showAlert, setRouter };