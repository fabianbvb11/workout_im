const timeOptions = document.querySelectorAll(".scrollable-time ul li");
const selectedTimeElement = document.getElementById("selectedTime");
const buttons = document.querySelectorAll('.button-list button');
const values = document.querySelectorAll('button.value');

// let selectedTime = 5; // Initial selected time in minutes

localStorage.removeItem("selectedTime");

// Function to update the selected time
function updateSelectedTime() {
    selectedTimeElement.textContent = `${selectedTime} Minutes`;
}

let activeButton = null;

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (activeButton) {
            // Reset the color of the previously active button to black
            activeButton.style.color = 'black';
        }
        // Set the current button as the active button
        activeButton = button;
        // Change the color of the clicked button to white
        button.style.color = 'white';

        // Save the selected time to local storage when a button is clicked
        localStorage.setItem('selectedTime', activeButton.getAttribute('value'));
    });
});

// Add click event listeners to time options
timeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        selectedTime = parseInt(activeButton.getAttribute('value'));
        updateSelectedTime();

        // Log the selected time to the console
        console.log(localStorage.getItem('selectedTime'));
    });
});

const weiterButton = document.getElementById("weiterButton");

weiterButton.addEventListener("click", () => {
    const selectedTimeValue = localStorage.getItem('selectedTime');
    if (selectedTimeValue) {
        // A time is selected, redirect to "muskelgruppen.html"
        window.location.href = "muskelgruppen.html";
    } else {
        // No time selected, display an error message in "ausgabefeld"
        const ausgabefeld = document.getElementById("ausgabefeld");
        ausgabefeld.innerHTML = "Please select a time before proceeding.";
    }
});

// Initialize selected time
updateSelectedTime();

