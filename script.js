// Product data with all state images
const products = [
    {
        name: 'Coffee Maker',
        droppedImage: 'images/Coffee maker capsule dropped.webp',
        openedImage: 'images/Coffee maker opened.webp'
    },
    {
        name: 'Water Bottle',
        droppedImage: 'images/Water bottle dropped.webp',
        openedImage: 'images/Water bottle opened.webp'
    },
    {
        name: 'Badminton Plush Toy',
        droppedImage: 'images/Badminton plush toy dropped.webp',
        openedImage: 'images/Badminton plush toy opened.webp'
    },
    {
        name: 'Cat Slippers',
        droppedImage: 'images/Cat slippers dropped.webp',
        openedImage: 'images/Cat slippers opened.webp'
    }
];

let availableProducts = [...products];
let currentProduct = null;
let currentState = 'default'; // States: 'default', 'dropped', 'opened'

// DOM elements
const machineImage = document.getElementById('machineImage');
const knobHotspot = document.getElementById('knobHotspot');
const capsuleHotspot = document.getElementById('capsuleHotspot');
const collectHotspot = document.getElementById('collectHotspot');

// Event listeners
knobHotspot.addEventListener('click', handleKnobClick);
capsuleHotspot.addEventListener('click', handleCapsuleClick);
collectHotspot.addEventListener('click', handleCollectClick);

// Initialize UI
updateUI();

function handleKnobClick() {
    if (currentState !== 'default' || availableProducts.length === 0) {
        if (availableProducts.length === 0) {
            alert('All products have been collected! The machine will reset.');
            resetMachine();
        }
        return;
    }

    // Add spinning animation
    knobHotspot.classList.add('spinning');

    setTimeout(() => {
        knobHotspot.classList.remove('spinning');
        dropProduct();
    }, 600);
}

function dropProduct() {
    // Select random product
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    currentProduct = availableProducts[randomIndex];

    // Remove from available products
    availableProducts.splice(randomIndex, 1);

    // Change to dropped state
    currentState = 'dropped';
    machineImage.src = currentProduct.droppedImage;

    updateUI();
}

function handleCapsuleClick() {
    if (currentState !== 'dropped') return;

    // Add click animation
    capsuleHotspot.classList.add('clicking');

    setTimeout(() => {
        capsuleHotspot.classList.remove('clicking');
        openCapsule();
    }, 300);
}

function openCapsule() {
    // Change to opened state
    currentState = 'opened';
    machineImage.src = currentProduct.openedImage;

    // Adjust collect button position for specific products
    if (currentProduct.name === 'Badminton Plush Toy') {
        collectHotspot.style.bottom = '25%';
    } else {
        collectHotspot.style.bottom = '15%';
    }

    updateUI();
}

function handleCollectClick() {
    if (currentState !== 'opened') return;

    // Add button animation
    collectHotspot.classList.add('collecting');

    setTimeout(() => {
        collectHotspot.classList.remove('collecting');
        returnToDefault();
    }, 300);
}

function returnToDefault() {
    // Reset to default state
    currentState = 'default';
    currentProduct = null;
    machineImage.src = 'images/Vending machine default state.webp';

    updateUI();
}

function resetMachine() {
    availableProducts = [...products];
    returnToDefault();
}

function updateUI() {
    // Show/hide elements based on current state
    switch(currentState) {
        case 'default':
            knobHotspot.style.display = 'block';
            capsuleHotspot.style.display = 'none';
            collectHotspot.style.display = 'none';
            break;
        case 'dropped':
            knobHotspot.style.display = 'none';
            capsuleHotspot.style.display = 'block';
            collectHotspot.style.display = 'none';
            break;
        case 'opened':
            knobHotspot.style.display = 'none';
            capsuleHotspot.style.display = 'none';
            collectHotspot.style.display = 'block';
            break;
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (currentState === 'default') {
            handleKnobClick();
        } else if (currentState === 'dropped') {
            handleCapsuleClick();
        } else if (currentState === 'opened') {
            handleCollectClick();
        }
    }
});
