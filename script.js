async function fetchMinionData() {
    try {
        const response = await fetch('minion_details.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const minionData = await response.json();
        return minionData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function populateDropdown(minionData) {
    const minionSelect = document.getElementById('minionSelect');
    for (const minionName in minionData) {
        const option = document.createElement('option');
        option.value = minionName;
        option.textContent = minionName;
        minionSelect.appendChild(option);
    }
}

function displayMinionDetails(minionName, minionData) {
    const minionDetails = document.getElementById('minionDetails');
    minionDetails.innerHTML = '';

    if (!minionName) return;

    const minion = minionData[minionName];
    const minionContainer = document.createElement('div');
    minionContainer.className = 'minion';

    // Construct the image path based on the minion name
    const img = document.createElement('img');
    img.src = `images/${minionName.replace("_"," ")}.png`; // Ensure image name matches the minion name
    img.alt = `${minionName} Image`;
    img.onerror = () => {
        img.src = 'images/default.png'; // Fallback image if specific image not found
    };
    minionContainer.appendChild(img);

    const minionInfo = document.createElement('div');
    minionInfo.className = 'minion-details';

    minionInfo.innerHTML += `<h2>${minionName}</h2>`;
    minionInfo.innerHTML += `<p><strong>Tier Delay:</strong> ${minion.tierDelay.join(', ')}</p>`;
    minionInfo.innerHTML += `<p><strong>Storage:</strong> ${minion.storage.join(', ')}</p>`;

    minion.products.forEach(product => {
        minionInfo.innerHTML += `<div class="product">
            <h3>${product.item}</h3>
            ${product.perTime ? `<p><strong>Per Time:</strong> ${product.perTime}</p>` : ''}
            <p><strong>Variants:</strong> ${product.variants.join(', ')}</p>
        </div>`;
    });

    minionContainer.appendChild(minionInfo);
    minionDetails.appendChild(minionContainer);
}

document.addEventListener('DOMContentLoaded', async () => {
    const minionData = await fetchMinionData();
    if (minionData) {
        populateDropdown(minionData);

        const minionSelect = document.getElementById('minionSelect');
        minionSelect.addEventListener('change', () => {
            const selectedMinion = minionSelect.value;
            displayMinionDetails(selectedMinion, minionData);
        });
    }
});
