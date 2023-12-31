import { setRouter } from "../router/router.js";

setRouter();

//const backendURL = "http://saintpeter-backend.test/api";
const backendURL = "https://f4cd-175-176-84-51.ngrok-free.app/saintpeter-backend/public/api";

function showAlert(type, message) {
  const alertDiv = document.querySelector(`.alert.alert-${type}`);
  if (alertDiv) {
    alertDiv.classList.remove("d-none");
    alertDiv.textContent = message;

  }
}

export { backendURL, showAlert, setRouter };