const timeOptions = document.querySelectorAll(".scrollable-time ul li");
const selectedTimeElement = document.getElementById("selectedTime");

let selectedTime = 5; // Initial selected time in minutes

// Function to update the selected time
function updateSelectedTime() {
    selectedTimeElement.textContent = `${selectedTime} Minutes`;
}

// Add click event listeners to time options
timeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        selectedTime = parseInt(option.getAttribute("data-minutes"));
        updateSelectedTime();
    });
});

// Initialize selected time
updateSelectedTime();