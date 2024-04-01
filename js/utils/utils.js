import { setRouter } from "../router/router.js";

setRouter();

const backendURL = "https://b1f9-112-198-99-46.ngrok-free.app/api";
//const backendURL = "https://f4cd-175-176-84-51.ngrok-free.app/saintpeter-backend/public/api";

function showAlert(type, message) {
  const alertDiv = document.querySelector(`.alert.alert-${type}`);
  if (alertDiv) {
    alertDiv.classList.remove("d-none");
    alertDiv.textContent = message;

    setTimeout(() => {
      alertDiv.classList.add("d-none");
    }, 1000);
  }
}

export { backendURL, showAlert, setRouter };