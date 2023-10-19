// Funktion zum Einfügen eines neuen Workouts
const weiterButton  = document.querySelector('#equipmentAbfrage');
weiterButton.addEventListener('click', abfrageEquipment);

// Funktion zur Zurücksetzung der anderen Buttons
function resetOtherButtons() {
    const buttons = ["bettbutton", "stuhlbutton", "hantelbutton", "tischbutton"];
    buttons.forEach((buttonId) => {
        document.getElementById(buttonId).checked = false;
    });
}

// Funktion zur Behandlung des "Nichtsbutton" Klicks
function handleNichtsButtonClick() {
    resetOtherButtons();
}

// Event Listener für den "Nichtsbutton"
const nichtsButton = document.getElementById("nichtsbutton");
nichtsButton.addEventListener('change', function() {
    if (nichtsButton.checked) {
        handleNichtsButtonClick();
    }
});

// Funktion zur Zurücksetzung des "Nichtsbutton"
function resetNichtsButton() {
    document.getElementById("nichtsbutton").checked = false;
}

// Funktion zur Behandlung des Klicks auf die anderen Buttons
function handleOtherButtonClick() {
    resetNichtsButton();
}

// Event Listener für die anderen Buttons
const otherButtons = document.querySelectorAll(".container input:not(#nichtsbutton)");
otherButtons.forEach((button) => {
    button.addEventListener('change', function () {
        if (button.checked) {
            handleOtherButtonClick();
        }
    });
});

// Event Listener für den "Nichtsbutton"


async function abfrageEquipment() {
 
    console.log("abfrage ausgeführt")

    const workoutEquipmentbett = document.getElementById("bettbutton").checked;
    const workoutEquipmentstuhl = document.getElementById("stuhlbutton").checked;
    const workoutEquipmenthantel = document.getElementById("hantelbutton").checked;
    const workoutEquipmenttisch = document.getElementById("tischbutton").checked;
    const workoutEquipmentnichts = document.getElementById("nichtsbutton").checked;


    //Auswahl ins local storage schreiben
    localStorage.setItem('bett', workoutEquipmentbett);
    localStorage.setItem('stuhl', workoutEquipmentstuhl);
    localStorage.setItem('hantel', workoutEquipmenthantel);
    localStorage.setItem('tisch', workoutEquipmenttisch);
    localStorage.setItem('nichts', workoutEquipmentnichts);

    //Auswahl aus local storage ins console log schreiben
    console.log(localStorage.getItem('bett'));
    console.log(localStorage.getItem('stuhl'));
    console.log(localStorage.getItem('hantel'));
    console.log(localStorage.getItem('tisch'));
    console.log(localStorage.getItem('nichts'));

    window.location.href = "vorgeschlageneworkouts.html";
}


//testen ob local storage funktioniert
console.log(localStorage.getItem('activeDotID'));
console.log(localStorage.getItem('selectedTime'));
