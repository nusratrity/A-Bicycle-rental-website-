// Form and summary elements
const form = document.getElementById('rentalForm');
const summaryContainer = document.getElementById('summaryContainer');
const summary = document.getElementById('summary');
const errorContainer = document.createElement('div');
errorContainer.className = 'error-message';

// Predefined bike rates per hour in USD
const bikesAvailable = {
    Dhanmondi: ['Duranta Steel 1-Speed Muscular Premier', 'Duranta Mascular-26" (Multi-Speed) Premier', 'Duranta Durjoy 2-Bar 26" (Single speed)'],
    Uttara: ['Duranta Mascular-26" (Multi-Speed) Premier', 'Veloce Stunt Master', 'Phoniex YE20S2902D'],
    Banani: ['Duranta Durjoy 2-Bar 26" (Single speed)', 'Phoniex TORNADO'],
    Mirpur: ['Veloce Inferno 3.0', 'Veloce Inferno 1.0', 'Veloce Dark 1.0'],
    Gulshan: ['Veloce Outrage-605 grayscaled', 'Phoniex YE16A2601SES', 'Phoniex YE16A267065'],
    Motijheel: ['Phoniex YE20S234ERST', 'Phoniex YE16A267065']
};

const costPerHour = {
    Dhanmondi: 0.55,
    Uttara: 0.65,
    Banani: 0.75,
    Mirpur: 0.55,
    Gulshan: 1,
    Motijheel: 0.75
};

function updateAvailableBikes() {
    const selectedLocation = form.location.value;
    const availableBikes = bikesAvailable[selectedLocation] || [];
    const bikeList = availableBikes.map(bike => `<li>${bike}</li>`).join('');
    document.getElementById('availableBikes').innerHTML = bikeList;
}

// Listen for location change to update available bikes
form.location.addEventListener('change', updateAvailableBikes);

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const location = form.location.value;
    const cycleType = form.cycleType.value;
    const start = form.start.value;
    const stop = form.stop.value;
    const errors = [];

    // Validate form inputs
    if (!location) errors.push('Location');
    if (!cycleType) errors.push('Cycle Type');
    if (!start) errors.push('Pick-up Date');
    if (!stop) errors.push('Return Date');
    if (start && stop && new Date(start) >= new Date(stop)) {
        errors.push('Return date must be after pick-up date.');
    }

    // Notification alerts for missing fields
    if (!location) {
        alert('Location is required. Please select a location.');
        return;
    }
    if (!cycleType) {
        alert('Cycle type is required. Please select a cycle type.');
        return;
    }
    if (!start) {
        alert('Pick-up date is required. Please select a valid date.');
        return;
    }
    if (!stop) {
        alert('Return date is required. Please select a valid date.');
        return;
    }

    // If there are validation errors, show them
    if (errors.length > 0) {
        errorContainer.innerHTML = errors.map(err => `<p>${err} is required</p>`).join('');
        form.insertBefore(errorContainer, summaryContainer);
        summaryContainer.style.display = 'none';
        return;
    } else {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }

    // Calculate the total cost
    const costInUSD = calculateCost(start, stop, location);
    const costInTK = costInUSD * 110;

    // Display the summary
    summary.innerHTML = 
        `<strong>Location:</strong> ${location}<br>
        <strong>Cycle:</strong> ${cycleType}<br>
        <strong>Pick-up Date:</strong> ${start}<br>
        <strong>Return Date:</strong> ${stop}<br>
        <strong>Total Cost:</strong> TK ${costInTK.toFixed(2)}<br>
        <strong>Total Time:</strong> ${calculateTotalTime(start, stop)} hours`;
    summaryContainer.style.display = 'block';

    // Additional notifications
    alert('Booking successful! Please review your rental summary below.');

});

// Function to calculate total rental cost
function calculateCost(start, stop, location) {
    const startDate = new Date(start);
    const endDate = new Date(stop);
    const hours = (endDate - startDate) / (1000 * 60 * 60);

    // Return cost per hour multiplied by the number of hours
    if (hours <= 0) {
        return 0;
    }

    const cost = hours * costPerHour[location];
    return cost;
}

// Function to calculate total rental time in hours
function calculateTotalTime(start, stop) {
    const startDate = new Date(start);
    const endDate = new Date(stop);
    const hours = (endDate - startDate) / (1000 * 60 * 60);
    return hours.toFixed(2);
}

// Go back functionality for summary container
document.querySelector('.back__link').addEventListener('click', function (event) {
    event.preventDefault();
    summaryContainer.style.display = 'none';
});


// Login & Signup

document.addEventListener('DOMContentLoaded', function () {
    // Get the Login button
    const loginButton = document.getElementById('login-btn');

    // Add a click event listener
    loginButton.addEventListener('click', function () {
        // Redirect to the signin.html page
        window.location.href = 'signin.html';
    });
});
