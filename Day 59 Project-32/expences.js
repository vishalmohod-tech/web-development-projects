const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const typeSelect = document.getElementById("typeSelect");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function renderTransactions() {
  transactionList.innerHTML = "";

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = t.type;
    li.innerHTML = `
      <span>${t.title} - $${t.amount}</span>
      <button onclick="deleteTransaction(${index})">🗑</button>
    `;
    transactionList.appendChild(li);

    if (t.type === "income") incomeTotal += t.amount;
    else expenseTotal += t.amount;
  });

  balanceEl.textContent = incomeTotal - expenseTotal;
  incomeEl.textContent = incomeTotal;
  expensesEl.textContent = expenseTotal;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}
function addTransaction() {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (title && !isNaN(amount) && amount > 0) {
    transactions.push({
      title,
      amount,
      type: typeSelect.value
    });
    titleInput.value = "";
    amountInput.value = "";
    renderTransactions();
  } else {
    alert("Please enter a valid title and amount.");
  }
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

addBtn.addEventListener("click", addTransaction);

renderTransactions();
