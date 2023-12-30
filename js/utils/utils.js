import { setRouter } from "../router/router.js";

setRouter();

const backendURL = "https://1c27-103-123-40-10.ngrok-free.app/api";

function showAlert(type, message) {
  const alertDiv = document.querySelector(`.alert.alert-${type}`);
  if (alertDiv) {
    alertDiv.classList.remove("d-none");
    alertDiv.textContent = message;

  }
}

export { backendURL, showAlert, setRouter };