import { proxyURL, backendURL, showAlert, setRouter } from "../utils/utils.js";

setRouter();

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("employee_login");

  if (!loginForm) {
    console.error("Error: Unable to find the login form");
    return;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var employeeIdInput = loginForm.querySelector('input[type="text"]');
    var passwordInput = loginForm.querySelector('input[type="password"]');

    if (!employeeIdInput || !passwordInput) {
      console.error("Error: Unable to find input elements");
      return;
    }

    var employee_id = employeeIdInput.value;
    var password = passwordInput.value;

    fetch(proxyURL + backendURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: employee_id,
        password: password,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
            // Employee ID not found
            showAlert("danger", "Employee ID not found");
            throw new Error("Employee ID not found");
          } else {
            throw new Error("Error: " + response.statusText);
          }
      })
      .then(function (responseJson) {
        if (responseJson.employee) {
          showAlert("success", "Login successful!");
          localStorage.setItem("employee_token", responseJson.employee_token);
          localStorage.setItem("first_name", responseJson.employee.first_name);
          localStorage.setItem("last_name", responseJson.employee.last_name);
          loginForm.reset();
          setTimeout(function () {
            window.location.href = "/dashboard.html";
          }, 1000); // Delay of 1 second
        } else {
          showAlert("danger", "You are not an employee");
          loginForm.reset();
        }
      })
      .catch(function (error) {
        if (error.message !== "Employee ID not found") {
          // Show error alert only if it's not due to employee ID not found
          console.error("Error:", error);
          showAlert("danger", "Incorrect Credentials!");
        }
      });
  });
});
