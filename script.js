document.addEventListener('DOMContentLoaded', () => {
    const newButton = document.getElementById('newButton');
    const newOptions = document.getElementById('newOptions');
    const itemsContainer = document.getElementById('itemsContainer');
    const autofillToggle = document.getElementById('autofillToggle');

    // Initialize autofill state
    let autofillEnabled = false;

    // Handle toggle change
    autofillToggle.addEventListener('change', (event) => {
        autofillEnabled = event.target.checked;
        console.log(`Autofill enabled: ${autofillEnabled}`);
    });

    // Show options when New button is clicked
    newButton.addEventListener('click', () => {
        newOptions.classList.toggle('hidden');
        newButton.classList.toggle('rotate');
    });

    // Handle option selection
    newOptions.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-button')) {
            const itemType = event.target.getAttribute('data-type');
            createNewItem(itemType);
            newOptions.classList.add('hidden');
            newButton.classList.remove('rotate');
        }
    });

    // Create new item function
    function createNewItem(type) {
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('data-type', type);

        const itemIcon = document.createElement('span');
        itemIcon.innerHTML = type === 'folder' ? '📁' : '🔑';

        const itemNameSpan = document.createElement('span');
        itemNameSpan.className = 'item-name';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = `Enter ${type} name`;
        nameInput.addEventListener('blur', () => {
            if (nameInput.value.trim() !== '') {
                itemNameSpan.textContent = nameInput.value;
                item.replaceChild(itemNameSpan, nameInput);
            } else {
                itemsContainer.removeChild(item);
            }
        });

        nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                nameInput.blur();
            }
        });

        const itemActions = document.createElement('div');
        itemActions.className = 'item-actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editItem(itemNameSpan));

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', () => copyItem(itemNameSpan.textContent));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(item));

        itemActions.append(editButton, copyButton, deleteButton);
        item.append(itemIcon, nameInput, itemActions);
        itemsContainer.appendChild(item);

        // Add double-click event listener
        item.addEventListener('dblclick', () => handleDoubleClick(item));

        nameInput.focus();
    }

    // Handle double-click event
    function handleDoubleClick(item) {
        const type = item.getAttribute('data-type');
        const itemName = item.querySelector('.item-name').textContent;

        if (type === 'folder') {
            // Replace alert with a more sophisticated folder view
            alert(`Navigating into folder: ${itemName}`);
            // Implement folder view logic here
        } else if (type === 'password') {
            const osPassword = prompt('Enter your operating system password:');
            if (osPassword === 'correct_password') {  // Replace with actual OS password verification
                const username = 'example_user';
                const password = 'example_password';
                alert(`Username: ${username}\nPassword: ${password}`);
            } else {
                alert('Incorrect password!');
            }
        }
    }

    // Edit item function
    function editItem(itemNameSpan) {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = itemNameSpan.textContent;
        nameInput.addEventListener('blur', () => {
            if (nameInput.value.trim() !== '') {
                itemNameSpan.textContent = nameInput.value;
                itemNameSpan.parentElement.replaceChild(itemNameSpan, nameInput);
            }
        });

        nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                nameInput.blur();
            }
        });

        itemNameSpan.parentElement.replaceChild(nameInput, itemNameSpan);
        nameInput.focus();
    }

    // Copy item function
    function copyItem(text) {
        navigator.clipboard.writeText(text).catch((error) => {
            console.error('Failed to copy text: ', error);
        }).then(() => {
            alert('Copied to clipboard');
        });
    }

    // Delete item function
    function deleteItem(item) {
        itemsContainer.removeChild(item);
    }
});
