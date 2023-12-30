document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has a valid token
    var employeeToken = localStorage.getItem("employee_token");
  
    if (!employeeToken) {
      // Redirect to the login page or take appropriate action
      window.location.href = "/index.html";
    } else {
      // The user has a valid token, proceed with the logout functionality
      var logoutButton = document.getElementById("employee_logout");
  
      if (logoutButton) {
        logoutButton.addEventListener("click", function () {
          // Perform the logout API request
          const backendURL = "https://1c27-103-123-40-10.ngrok-free.app/api";
  
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
              window.location.href = "/index.html";
            })
            .catch(function (error) {
              // Handle errors during logout
              console.error("Logout error:", error);
            });
        });
      }
    }
  });
  