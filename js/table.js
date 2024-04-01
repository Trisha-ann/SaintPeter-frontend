window.addEventListener('DOMContentLoaded', event => {
  // Simple-DataTables
  // https://github.com/fiduswriter/Simple-DataTables/wiki

  // const datatablesSimple = document.getElementById('paymentTable');
  // if (datatablesSimple) {
  //     new simpleDatatables.DataTable(datatablesSimple);
  // }

  const backendURL = "https://afb6-112-198-99-46.ngrok-free.app/api";
  const token = localStorage.getItem("employee_token");
  const employee_id = localStorage.getItem("employee_id");

  fetch(`${backendURL}/payment`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Filter data for the logged-in employee
    const employeeData = data.filter(
      (customer) => customer.employee_id === employee_id
    );

    // Initialize Simple-DataTables with the filtered data
    const dataTable = new simpleDatatables.DataTable("#paymentTable", {
      data: {
        headings: [
          "Customer ID",
          "Plan Name",
          "Amount Purchased",
          "Amount Received",
          "Balance",
          "Payment Duration",
        ],
        data: employeeData.map((customer) => [
          "C-" + customer.customers_id,
          customer.plan_id,
          customer.purchased_payable,
          customer.amount_received,
          customer.balance,
          customer.payment_duration,
        ]),
      },
    });

    if (dataTable) {
      new simpleDatatables.DataTable(dataTable);
    }
  })
});