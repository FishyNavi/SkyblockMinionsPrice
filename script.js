document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch minion data from an external file
    fetch('minionData.json')
        .then(response => response.json())
        .then(data => {
            populateMinionDropdown(data);
        })
        .catch(error => console.error('Error fetching minion data:', error));

    // Function to populate the minion dropdown
    function populateMinionDropdown(data) {
        const minionSelect = document.getElementById('minionSelect');
        for (const minion in data) {
            const option = document.createElement('option');
            option.value = minion;
            option.textContent = minion;
            minionSelect.appendChild(option);
        }

        // Event listener for dropdown change
        minionSelect.addEventListener('change', function () {
            const selectedMinion = this.value;
            displayMinionDetails(data[selectedMinion]);
        });
    }

    // Function to display minion details
    function displayMinionDetails(minion) {
        const minionDetails = document.getElementById('minionDetails');
        minionDetails.innerHTML = ''; // Clear previous details

        // Create a table for the details
        const table = document.createElement('table');

        // Create table headers
        const headers = ['Tier', 'Delay (s)', 'Storage'];
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Populate table with minion details
        for (let i = 0; i < minion.tierDelay.length; i++) {
            const row = document.createElement('tr');
            row.id = `row-${i}`;
            row.className = 'minion-row';

            const tierCell = document.createElement('td');
            tierCell.className = 'minion-cell';
            tierCell.textContent = i + 1;

            const delayCell = document.createElement('td');
            delayCell.className = 'minion-cell';
            delayCell.textContent = minion.tierDelay[i];

            const storageCell = document.createElement('td');
            storageCell.className = 'minion-cell';
            storageCell.textContent = minion.storage[i];

            row.appendChild(tierCell);
            row.appendChild(delayCell);
            row.appendChild(storageCell);

            table.appendChild(row);
        }

        // Append the table to the minionDetails div
        minionDetails.appendChild(table);
    }
});
