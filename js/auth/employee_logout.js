document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has a valid token
    var employeeToken = localStorage.getItem("employee_token");
  
    if (!employeeToken) {
      // Redirect to the login page or take appropriate action
      window.location.href = "/";
    } else {
      // The user has a valid token, proceed with the logout functionality
      var logoutButton = document.getElementById("employee_logout");
  
      if (logoutButton) {
        logoutButton.addEventListener("click", function () {

          const backendURL = "https://b1f9-112-198-99-46.ngrok-free.app/api";
          //const backendURL = "https://f4cd-175-176-84-51.ngrok-free.app/saintpeter-backend/public/api";
  
          fetch(backendURL + "/logout", {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
              Authorization: "Bearer " + employeeToken,
            },
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Error: " + response.statusText);
              }
            })
            .then(function (responseJson) {
              // Handle successful logout
              alert("Logout Successfully");
              console.log("Logout successful:", responseJson);
              localStorage.removeItem("employee_token");
              localStorage.removeItem("first_name");
              localStorage.removeItem("last_name");
              localStorage.removeItem("sb|sidebar-toggle");
              localStorage.removeItem("employee_id");
              localStorage.removeItem("planId");
              localStorage.removeItem("customers_id");
              localStorage.removeItem("planPrice");
              window.location.href = "/";
            })
            .catch(function (error) {
              // Handle errors during logout
              console.error("Logout error:", error);
            });
        });
      }
    }
  });
  