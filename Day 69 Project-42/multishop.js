 let inventory = []; 
        let completedProducts = []; 
        let productIdCounter = 1;
        let projectTypes = [
            'Hardware', 'Software', 'Documentation', 'Service'
        ];

        // Get DOM elements
        const productForm = document.getElementById('productForm');
        const projectTypeSelect = document.getElementById('projectType');
        const inventoryTableBody = document.querySelector('#inventoryTable tbody');
        const completedTableBody = document.querySelector('#completedTable tbody');
        const customTypeInputDiv = document.getElementById('customTypeInput');
        const customTypeInput = document.getElementById('customType');
        const totalAmountSpan = document.getElementById('totalAmount'); // NEW

        // Helper function for Rupee formatting
        function formatRupees(amount) {
             // Check if amount is a valid number, otherwise return 'N/A'
            if (typeof amount !== 'number' || isNaN(amount) || amount === null) {
                return 'N/A';
            }
            // Use toLocaleString for standard Indian Rupee formatting
            return '₹ ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // --- FUNCTION 1: Type Dropdown Management ---
        function populateTypeDropdown() {
            projectTypeSelect.innerHTML = '';
            
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Select or Specify Type";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            projectTypeSelect.appendChild(defaultOption);

            projectTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                projectTypeSelect.appendChild(option);
            });

            const otherOption = document.createElement('option');
            otherOption.value = 'Other (Specify)';
            otherOption.textContent = 'Other (Specify)';
            projectTypeSelect.appendChild(otherOption);
        }

        // --- FUNCTION 2: Toggle Custom Type Input ---
        function toggleCustomTypeInput(selectedValue) {
            if (selectedValue === 'Other (Specify)') {
                customTypeInputDiv.style.display = 'block';
                customTypeInput.required = true;
            } else {
                customTypeInputDiv.style.display = 'none';
                customTypeInput.required = false;
                customTypeInput.value = '';
            }
        }

        // --- FUNCTION 3: Calculate and Display Total ---
        function calculateTotalBill() {
            const total = completedProducts.reduce((sum, product) => {
                // Ensure finalPrice is a number before adding, default to 0
                const price = product.finalPrice || 0;
                return sum + price;
            }, 0);

            totalAmountSpan.textContent = formatRupees(total);
        }

        // --- FUNCTION 4: Core Rendering ---
        function renderAllTables() {
            renderInventory();
            renderCompletedProducts();
            calculateTotalBill(); // Calculate and update the total whenever tables render
        }

        // --- FUNCTION 5: RENDER ACTIVE INVENTORY ---
        function renderInventory() {
            inventoryTableBody.innerHTML = '';
            inventory.sort((a, b) => a.type.localeCompare(b.type));
            let currentType = null;

            inventory.forEach(product => {
                if (product.type !== currentType) {
                    currentType = product.type;
                    const headerRow = inventoryTableBody.insertRow();
                    headerRow.className = 'category-header';
                    const headerCell = headerRow.insertCell();
                    headerCell.colSpan = 5; 
                    headerCell.textContent = `Category: ${currentType}`;
                }

                const row = inventoryTableBody.insertRow();

                row.insertCell().textContent = product.id;
                row.insertCell().textContent = product.name;
                row.insertCell().textContent = product.type;
                row.insertCell().textContent = product.quantity;

                const actionCell = row.insertCell();
                
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.className = 'complete-btn';
                completeButton.addEventListener('click', () => completeProduct(product.id));
                actionCell.appendChild(completeButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                deleteButton.addEventListener('click', () => deleteProduct(product.id));
                actionCell.appendChild(deleteButton);
            });
        }
        
        // --- FUNCTION 6: RENDER COMPLETED PRODUCTS TABLE ---
        function renderCompletedProducts() {
            completedTableBody.innerHTML = '';

            completedProducts.forEach(product => {
                const row = completedTableBody.insertRow();
                
                row.insertCell().textContent = product.id;
                row.insertCell().textContent = product.name;
                row.insertCell().textContent = product.type;
                row.insertCell().textContent = product.quantity;
                
                // Display final price using Rupee format
                row.insertCell().textContent = formatRupees(product.finalPrice);
                
                const actionCell = row.insertCell();
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remove'; 
                deleteButton.className = 'delete-btn';
                deleteButton.addEventListener('click', () => removeCompletedProduct(product.id));
                actionCell.appendChild(deleteButton);
            });
        }
        
        // --- FUNCTION 7: Add Product Handler ---
        function addProduct(event) {
            event.preventDefault();

            const name = document.getElementById('productName').value;
            let type = document.getElementById('projectType').value;
            const quantity = parseInt(document.getElementById('productQuantity').value);
            
            // Handle custom type entry and persistence
            if (type === 'Other (Specify)') {
                const customType = customTypeInput.value.trim();
                if (customType) {
                    type = customType;
                    if (!projectTypes.includes(type)) {
                        projectTypes.push(type);
                        populateTypeDropdown(); 
                    }
                } else {
                    type = 'Uncategorized';
                }
            }

            const newProduct = {
                id: productIdCounter++,
                name: name,
                type: type,
                quantity: quantity
            };

            inventory.push(newProduct);
            renderAllTables();
            productForm.reset();
            toggleCustomTypeInput(''); 
        }

        // --- FUNCTION 8: COMPLETE PRODUCT (With Price Prompt) ---
        function completeProduct(id) {
            const productIndex = inventory.findIndex(p => p.id === id);
            if (productIndex === -1) return;

            const [productToComplete] = inventory.splice(productIndex, 1);
            
            let finalPrice = null;
            let input = prompt(`Enter the Final Price (₹) for "${productToComplete.name}":`);
            
            if (input !== null && input.trim() !== '') {
                 let parsedPrice = parseFloat(input);
                 if (!isNaN(parsedPrice) && parsedPrice >= 0) {
                    finalPrice = parsedPrice;
                 } else {
                     alert("Invalid price entered. Price will be recorded as N/A.");
                 }
            }

            completedProducts.push({
                ...productToComplete, 
                finalPrice: finalPrice, 
            });

            renderAllTables();
        }

        // --- FUNCTION 9: DELETE ACTIVE PRODUCT ---
        function deleteProduct(id) {
            if (confirm("Are you sure you want to delete this active item?")) {
                inventory = inventory.filter(product => product.id !== id);
                renderAllTables();
            }
        }

        // --- FUNCTION 10: REMOVE COMPLETED PRODUCT ---
        function removeCompletedProduct(id) {
            if (confirm("Are you sure you want to remove this completed record?")) {
                completedProducts = completedProducts.filter(product => product.id !== id);
                renderAllTables();
            }
        }

        // Initialization
        populateTypeDropdown();
        productForm.addEventListener('submit', addProduct);
        renderAllTables();