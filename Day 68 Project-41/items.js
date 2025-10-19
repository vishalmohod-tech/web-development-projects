let products = JSON.parse(localStorage.getItem("inventory")) || [];

const productTable = document.getElementById("productTable");

function saveProducts() {
    localStorage.setItem("inventory", JSON.stringify(products));
}

function renderProducts() {
    const searchValue = document.getElementById("searchBox").value.toLowerCase();
    productTable.innerHTML = "";

    products.sort((a, b) => a.name.localeCompare(b.name));

    products.forEach((p, index) => {
        if (p.name.toLowerCase().includes(searchValue)) {
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.qty}</td>
                <td class="actions">
                    <button class="edit" onclick="editProduct(${index})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;
            productTable.appendChild(row);
        }
    });
    
    saveProducts();
}

function addProduct() {
    const name = document.getElementById("productName").value.trim();

    const qty = document.getElementById("productQty").value.trim(); 

    if (!name || !qty) {
        alert("Please enter both a name and a quantity!");
        return;
    }
    
    products.push({ name, qty });
    
    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";

    renderProducts();
}

function editProduct(index) {
    const p = products[index];
    const newQty = prompt(`Update Quantity for ${p.name}:`, p.qty);
    
    if (newQty !== null) {
        if (newQty.trim() === "") {
             alert("Quantity cannot be empty.");
             return;
        }

        products[index].qty = newQty.trim();
        renderProducts();
    }
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to permanently delete this item?")) {
        products.splice(index, 1);
        renderProducts();
    }
}
document.getElementById("addProduct").addEventListener("click", addProduct);
document.getElementById("searchBox").addEventListener("input", renderProducts);

renderProducts();