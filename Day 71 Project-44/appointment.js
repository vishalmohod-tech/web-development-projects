let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const apptTable = document.getElementById("apptTable");

function saveAppointments() {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

function renderAppointments() {
  const searchValue = document.getElementById("searchBox").value.toLowerCase();
  const filterService = document.getElementById("filterService").value;
  apptTable.innerHTML = "";

  appointments.forEach((a, index) => {
    if (
      (a.name.toLowerCase().includes(searchValue)) &&
      (filterService === "" || a.service === filterService)
    ) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${a.name}</td>
        <td>${a.phone}</td>
        <td>${a.service}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td class="actions">
          <button class="edit" onclick="editAppt(${index})">Edit</button>
          <button class="delete" onclick="deleteAppt(${index})">Delete</button>
        </td>
      `;
      apptTable.appendChild(row);
    }
  });
  saveAppointments();
}

function addAppt() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const date = document.getElementById("apptDate").value;
  const time = document.getElementById("apptTime").value;
  const service = document.getElementById("serviceType").value;

  if (!name || !phone || !date || !time || !service) {
    alert("Please fill all fields!");
    return;
  }

  appointments.push({ name, phone, date, time, service });
  document.getElementById("clientName").value = "";
  document.getElementById("clientPhone").value = "";
  document.getElementById("apptDate").value = "";
  document.getElementById("apptTime").value = "";
  document.getElementById("serviceType").value = "";

  renderAppointments();
}

function editAppt(index) {
  const a = appointments[index];
  const newDate = prompt("Enter new date (YYYY-MM-DD):", a.date);
  const newTime = prompt("Enter new time (HH:MM):", a.time);
  if (newDate && newTime) {
    appointments[index].date = newDate;
    appointments[index].time = newTime;
    renderAppointments();
  }
}

function deleteAppt(index) {
  if (confirm("Delete this appointment?")) {
    appointments.splice(index, 1);
    renderAppointments();
  }
}

document.getElementById("addAppt").addEventListener("click", addAppt);
document.getElementById("searchBox").addEventListener("input", renderAppointments);
document.getElementById("filterService").addEventListener("change", renderAppointments);

renderAppointments();