function setRouter() {
    switch (window.location.pathname) {
      case "/":
      case "/index.html":
        if (localStorage.getItem("employee_token") !== null) {
          window.location.pathname = "/index.html";
        }
        break;
  
      case "/dashboard.html":
        if (localStorage.getItem("employee_token") === null) {
          window.location.pathname = "/index.html";
        }
  
        break;
      default:
        break;
    }
  }
  
  export { setRouter };