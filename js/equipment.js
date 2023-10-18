// Funktion zum Einfügen eines neuen Workouts
const weiterButton  = document.querySelector('#equipmentAbfrage');
weiterButton.addEventListener('click', abfrageEquipment);


async function abfrageEquipment() {
 
    console.log("abfrage ausgeführt")

    const workoutEquipmentbett = document.getElementById("bettbutton").checked;
    const workoutEquipmentstuhl = document.getElementById("stuhlbutton").checked;
    const workoutEquipmenthantel = document.getElementById("hantelbutton").checked;
    const workoutEquipmenttisch = document.getElementById("tischbutton").checked;
    
    //Auswahl ins local storage schreiben
    localStorage.setItem('bett', workoutEquipmentbett);
    localStorage.setItem('stuhl', workoutEquipmentstuhl);
    localStorage.setItem('hantel', workoutEquipmenthantel);
    localStorage.setItem('tisch', workoutEquipmenttisch);

    //Auswahl aus local storage ins console log schreiben
    console.log(localStorage.getItem('bett'));
    console.log(localStorage.getItem('stuhl'));
    console.log(localStorage.getItem('hantel'));
    console.log(localStorage.getItem('tisch'));

    window.location.href = "vorgeschlageneworkouts.html";
}


//testen ob local storage funktioniert
console.log(localStorage.getItem('activeDotID'));
console.log(localStorage.getItem('selectedTime'));
