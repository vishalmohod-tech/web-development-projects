let items = JSON.parse(localStorage.getItem('billItems')) || [];

    const itemName = document.getElementById('itemName');
    const itemAmount = document.getElementById('itemAmount');
    const itemList = document.getElementById('itemList');
    const resultBox = document.getElementById('resultBox');

    function renderItems() {
      itemList.innerHTML = items.map((item, index) => `
        <div class="list-item">
          <span>${item.name}</span>
          <span>₹${item.amount}</span>
          <button onclick="deleteItem(${index})">✖</button>
        </div>
      `).join('');
      localStorage.setItem('billItems', JSON.stringify(items));
    }

    function addItem() {
      const name = itemName.value.trim();
      const amount = parseFloat(itemAmount.value);
      if (!name || isNaN(amount) || amount <= 0) {
        alert('Enter valid item and amount!');
        return;
      }
      items.push({ name, amount });
      itemName.value = '';
      itemAmount.value = '';
      renderItems();
    }

    function deleteItem(index) {
      items.splice(index, 1);
      renderItems();
    }

    function calculateBill() {
      const numPeople = parseInt(document.getElementById('numPeople').value);
      const tipPercent = parseFloat(document.getElementById('tipPercent').value) || 0;
      if (items.length === 0 || isNaN(numPeople) || numPeople <= 0) {
        alert('Add items and number of people first!');
        return;
      }

      const total = items.reduce((sum, item) => sum + item.amount, 0);
      const tip = (total * tipPercent) / 100;
      const grandTotal = total + tip;
      const each = grandTotal / numPeople;

      document.getElementById('totalBill').innerText = `Total Bill: ₹${grandTotal.toFixed(2)}`;
      document.getElementById('tipAmount').innerText = `Tip Added: ₹${tip.toFixed(2)}`;
      document.getElementById('eachShare').innerText = `Each Person Pays: ₹${each.toFixed(2)}`;
      resultBox.style.display = 'block';
    }

    function resetAll() {
      if (confirm('Clear all data?')) {
        items = [];
        localStorage.removeItem('billItems');
        renderItems();
        resultBox.style.display = 'none';
      }
    }

    renderItems();