function setRouter() {
    switch (window.location.pathname) {
      case "/":
      case "/index.html":
        if (localStorage.getItem("employee_token") !== null) {
          window.location.pathname = "/dashboard.html";
        }
        break;
    }
  }
  
  export { setRouter };