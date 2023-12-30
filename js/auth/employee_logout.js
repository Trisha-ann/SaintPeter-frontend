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
            console.log("button click");

          const backendURL = "http://saintpeter-backend.test/api";
          //const backendURL = "https://69f4-103-123-40-11.ngrok-free.app/saintpeter-backend/public/api";
  
          fetch(backendURL + "/logout", {
            method: "GET",
            headers: {
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
  