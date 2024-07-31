document.addEventListener('DOMContentLoaded', function () {
    function displayErrorMessage(message) {
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.textContent = message;
        errorContainer.style.display = 'block'; // Show the error container
    }

    // Fetch minion data from minion_details.json
    fetch('minion_details.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayErrorMessage(''); // Clear any previous error messages
            populateMinionDropdown(data);
        })
        .catch(error => displayErrorMessage('Error fetching minion data: ' + error.message));

    // Populate the minion dropdown
    function populateMinionDropdown(data) {
        const minionSelect = document.getElementById('minionSelect');
        for (const minion in data) {
            const option = document.createElement('option');
            option.value = minion;
            option.textContent = minion;
            minionSelect.appendChild(option);
        }

        minionSelect.addEventListener('change', function () {
            const selectedMinion = this.value;
            if (selectedMinion) {
                displayMinionDetails(data[selectedMinion]);
            } else {
                document.getElementById('minionDetails').innerHTML = '';
            }
        });
    }

    function displayMinionDetails(minion) {
        const minionDetails = document.getElementById('minionDetails');
        minionDetails.innerHTML = ''; // Clear previous details

        const table = document.createElement('table');

        // Create table headers
        const headers = ['Tier'];
        minion.products.forEach(product => {
            headers.push(product.item);
        });
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Populate table rows
        for (let i = 0; i < 11; i++) {
            const row = document.createElement('tr');
            row.id = `row-${i}`;
            row.className = 'minion-row';

            const tierCell = document.createElement('td');
            tierCell.className = 'minion-cell';
            tierCell.textContent = `Tier ${i + 1}`;
            row.appendChild(tierCell);

            minion.products.forEach(product => {
                const amountCell = document.createElement('td');
                amountCell.className = 'minion-cell';
                amountCell.textContent = '0'; // Placeholder, will be updated on input
                row.appendChild(amountCell);
            });

            table.appendChild(row);
        }

        minionDetails.appendChild(table);

        // Set default hours value
        const hoursInput = document.getElementById('hoursAFK');
        hoursInput.value = 1; // Set default value to 1
        updateGeneratedAmounts(1); // Initialize with default value

        // Event listener for hours input
        hoursInput.addEventListener('input', function () {
            const hours = parseFloat(this.value) || 1; // Default to 1 if invalid
            updateGeneratedAmounts(hours);
        });
    }

    function updateGeneratedAmounts(hours) {
        const minion = getSelectedMinion(); // Get selected minion data
        if (!minion) return;

        const rows = document.querySelectorAll('#minionDetails .minion-row');
        rows.forEach((row, i) => {
            minion.products.forEach((product, index) => {
                const delay = minion.tierDelay[i]; // Get delay for the tier
                if (delay && product.perTime !== null) {
                    const itemsPerHour = (3600 / delay) * product.perTime;
                    
                    row.querySelectorAll('td')[index + 1].textContent = Math.floor(itemsPerHour * hours);
                } else {
                    row.querySelectorAll('td')[index + 1].textContent = 'N/A'; // Handle cases with no delay or perTime
                }
            });
        });
    }

    function getSelectedMinion() {
        const minionSelect = document.getElementById('minionSelect');
        const selectedMinion = minionSelect.value;
        return selectedMinion ? minion_details[selectedMinion] : null;
    }
});
