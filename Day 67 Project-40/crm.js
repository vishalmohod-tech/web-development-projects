  let clients = JSON.parse(localStorage.getItem('clients')) || [];

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const statusInput = document.getElementById('statusInput');
    const addClientBtn = document.getElementById('addClientBtn');
    const clientTable = document.getElementById('clientTable');
    const filterStatus = document.getElementById('filterStatus');
    const stats = document.getElementById('stats');

    function renderClients(filter = 'All') {
      clientTable.innerHTML = '';
      let leadCount = 0, activeCount = 0, closedCount = 0;

      clients.forEach((client, index) => {
        if (filter !== 'All' && client.status !== filter) return;

        if (client.status === 'Lead') leadCount++;
        else if (client.status === 'Active') activeCount++;
        else if (client.status === 'Closed') closedCount++;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${client.name}</td>
          <td>${client.email}</td>
          <td>${client.phone}</td>
          <td><span class="status ${client.status}">${client.status}</span></td>
          <td>
            <button class="edit-btn" onclick="editClient(${index})">✏️</button>
            <button class="delete-btn" onclick="deleteClient(${index})">🗑️</button>
          </td>
        `;
        clientTable.appendChild(tr);
      });

      stats.textContent = `Lead: ${leadCount} | Active: ${activeCount} | Closed: ${closedCount}`;
      saveToStorage();
    }

    function saveToStorage() {
      localStorage.setItem('clients', JSON.stringify(clients));
    }

    addClientBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const status = statusInput.value;

      if (!name || !email || !phone) return alert("Please fill all fields");

      clients.push({ name, email, phone, status });
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      renderClients(filterStatus.value);
    });

    function editClient(index) {
      const client = clients[index];
      const newName = prompt("Edit Name:", client.name);
      if (newName) client.name = newName;
      const newEmail = prompt("Edit Email:", client.email);
      if (newEmail) client.email = newEmail;
      const newPhone = prompt("Edit Phone:", client.phone);
      if (newPhone) client.phone = newPhone;
      const newStatus = prompt("Edit Status (Lead / Active / Closed):", client.status);
      if (newStatus) client.status = newStatus;
      renderClients(filterStatus.value);
    }

    function deleteClient(index) {
      if (confirm("Are you sure you want to delete this client?")) {
        clients.splice(index, 1);
        renderClients(filterStatus.value);
      }
    }

    filterStatus.addEventListener('change', () => {
      renderClients(filterStatus.value);
    });

    renderClients();