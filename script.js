document.addEventListener('DOMContentLoaded', function() {
    const itemNameInput = document.getElementById('item-name');
    const itemQuantityInput = document.getElementById('item-quantity');
    const addItemBtn = document.getElementById('add-item-btn');
    const itemList = document.getElementById('item-list');

    let inventory = [];

    addItemBtn.addEventListener('click', addItem);

    itemNameInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    itemQuantityInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const name = itemNameInput.value.trim();
        const quantity = parseInt(itemQuantityInput.value);

        if (name && !isNaN(quantity)) {
            const existingItem = inventory.find(item => item.name.toLowerCase() === name.toLowerCase());
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                const item = {
                    id: Date.now(),
                    name: name,
                    quantity: quantity
                };
                inventory.push(item);
            }
            renderInventory();
            clearInputs();
        } else {
            alert('Please enter valid item details.');
        }
    }

    function renderInventory() {
        itemList.innerHTML = '';

        // Update datalist with unique item names
        const datalist = document.getElementById('item-names');
        datalist.innerHTML = '';
        const uniqueNames = [...new Set(inventory.map(item => item.name))];
        uniqueNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            datalist.appendChild(option);
        });

        inventory.forEach(item => {
            const li = document.createElement('li');
            li.className = 'item';
            li.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong>
                </div>
                <div class="item-controls">
                    <span class="quantity">${item.quantity}</span>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            itemList.appendChild(li);
        });

        // Add event listeners for buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }

    function removeItem(e) {
        const id = parseInt(e.target.dataset.id);
        inventory = inventory.filter(item => item.id !== id);
        renderInventory();
    }

    function clearInputs() {
        itemNameInput.value = '';
        itemQuantityInput.value = '';
        itemNameInput.focus();
    }
});
