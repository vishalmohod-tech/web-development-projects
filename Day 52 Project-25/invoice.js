const form = document.getElementById('invoiceForm');
const itemsContainer = document.getElementById('itemsContainer');
const addItemBtn = document.getElementById('addItem');
const invoicePreview = document.getElementById('invoicePreview');


// Add new item row
addItemBtn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <input type="text" placeholder="Item Name" class="itemName" required>
    <input type="number" placeholder="Quantity" class="itemQty" value="1" min="1">
    <input type="number" placeholder="Price" class="itemPrice" value="0" min="0">
    <button type="button" class="removeItem">❌</button>`;
  itemsContainer.appendChild(div);
});

// Remove item row
itemsContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('removeItem')) {
    e.target.parentElement.remove();
  }
});

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  generateInvoice();
});

// Generate invoice preview
function generateInvoice() {
  const client = document.getElementById('clientName').value;
  const invoiceNo = document.getElementById('invoiceNumber').value;
  const taxPercent = parseFloat(document.getElementById('tax').value);
  const discountPercent = parseFloat(document.getElementById('discount').value);

  const items = Array.from(document.querySelectorAll('.item')).map(i => ({
    name: i.querySelector('.itemName').value,
    qty: parseFloat(i.querySelector('.itemQty').value),
    price: parseFloat(i.querySelector('.itemPrice').value)
  }));

  let subtotal = 0;
  items.forEach(i => subtotal += i.qty * i.price);
  const tax = subtotal * (taxPercent / 100);
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal + tax - discount;

  let html = `<h2>Invoice #${invoiceNo}</h2><p>Client: ${client}</p>`;
  html += `<table border="1" cellpadding="5" cellspacing="0" width="100%">
    <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>`;
  items.forEach(i => {
    html += `<tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>₹${i.price.toFixed(2)}</td>
      <td>₹${(i.qty*i.price).toFixed(2)}</td>
    </tr>`;
  });
  html += `</table>`;
  html += `<p>Subtotal: ₹${subtotal.toFixed(2)}</p>`;
  html += `<p>Tax (${taxPercent}%): ₹${tax.toFixed(2)}</p>`;
  html += `<p>Discount (${discountPercent}%): -₹${discount.toFixed(2)}</p>`;
  html += `<h3>Total: ₹${total.toFixed(2)}</h3>`;

  invoicePreview.innerHTML = html;
  
}


