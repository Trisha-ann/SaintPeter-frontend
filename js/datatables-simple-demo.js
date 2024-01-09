window.addEventListener("DOMContentLoaded", (event) => {
  const backendURL = "http://saintpeter-backend.test/api";
  const token = localStorage.getItem("employee_token");
  const employee_id = localStorage.getItem("employee_id");

  fetch(`${backendURL}/customers`, {
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

      // Count the number of entries
      const dataCount = employeeData.length;

      // Display the count in the HTML
      document.getElementById("totalCustomersCount").textContent = dataCount;

      // Count the number of customers with non-null death_date
      const customersDiedCount = employeeData.filter(
        (customer) => customer.death_date !== null
      ).length;

      // Display the count in the HTML
      document.getElementById("numberOfCustomersDied").textContent =
        customersDiedCount;

      // Initialize Simple-DataTables with the filtered data
      const dataTable = new simpleDatatables.DataTable("#datatablesSimple", {
        data: {
          headings: [
            "Customer ID",
            "Last Name",
            "First Name",
            "Address",
            "Age",
            "Gender",
            "Birth Date",
            "Death Date",
            "Update",
            "Delete",
          ],
          data: employeeData.map((customer) => [
            "C-" + customer.customers_id,
            customer.last_name,
            customer.first_name,
            customer.address,
            customer.age,
            customer.gender,
            formatDate(customer.birth_date),
            customer.death_date !== null ? formatDate(customer.death_date) : "",
            `<button class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#updateCustomer" data-customer-id="${customer.customers_id}"><i class="fas fa-user-edit"></i> Update</button>`,
            `<button class="btn btn-danger delete-btn" data-customer-id="${customer.customers_id}"><i class="fas fa-trash"></i> Delete</button>`,
          ]),
        },
      });

      if (dataTable) {
        new simpleDatatables.DataTable(dataTable);
      }

      // Function to format date as MM/DD/YYYY
      function formatDate(dateString) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

    })
    .catch((error) => {});

});

