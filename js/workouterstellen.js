import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

// Funktion zum Einfügen eines neuen Workouts
const hochladen  = document.querySelector('#uploadButton');
hochladen.addEventListener('click', insertWorkout);
console.log("Eventlistener hochladen aktiviert")

async function insertWorkout() {
    console.log("insertWorkout() ausgeführt")
    const url = document.querySelector('#ytUrl');
    const workoutTitel = document.querySelector('#titel');
    const workoutBeschreibung = document.querySelector('#description');
    const workoutMuskelgruppe = document.querySelector('#muskelgruppe');
    const workoutDauer = document.querySelector('#zeit');
    const workoutEquipment = {
        checkbox1: document.getElementById('#bettbutton').checked,
        checkbox2: document.getElementById('#stuhlbutton').checked,
        checkbox3: document.getElementById('#hantelbutton').checked,
        checkbox4: document.getElementById('#tischbutton').checked,
      };

    const { data, error } = await supa.from("workoutdata").insert([
      {
        video: url.value,
        titel: workoutTitel.value, 
        beschreibung: workoutBeschreibung.value,
        muskelgruppe: workoutMuskelgruppe.value, 
        zeit: workoutDauer.value,
        equipment: workoutEquipment.value,
        
    }

    ]);

    console.log(workoutEquipment); // Display the object in the console

    // In reality, all fields (first_name, last_name, birth_date and nationality) would be inserted via input field.
    if (data) {
      console.log('Entry was created successfully', data);
    } else {
      console.log('Error occured')
    }
  }