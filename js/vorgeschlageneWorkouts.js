import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

//testen ob local storage funktioniert
console.log(localStorage.getItem('activeDotID'));
console.log(localStorage.getItem('selectedTime'));

//Auswahl aus local storage ins console log schreiben
console.log(localStorage.getItem('bett'));
console.log(localStorage.getItem('stuhl'));
console.log(localStorage.getItem('hantel'));
console.log(localStorage.getItem('tisch'));

//Variablen für die Auswahl der Übungen
let workoutEquipmentbett = localStorage.getItem('bett');
let workoutEquipmentstuhl = localStorage.getItem('stuhl');
let workoutEquipmenthantel = localStorage.getItem('hantel');
let workoutEquipmenttisch = localStorage.getItem('tisch');
let workoutMuskelgruppe = localStorage.getItem('activeDotID');
let workoutDauer = localStorage.getItem('selectedTime');

//abfrage von Supabase
async function selectAllWorkouts() {
    
    const { data, error } = await supa
    .from("workoutdata")
    .select()
    .lte('zeit', workoutDauer)
    .eq('muskelgruppe', workoutMuskelgruppe)
    .eq('bett', workoutEquipmentbett)
    .eq('stuhl', workoutEquipmentstuhl)
    .eq('hantel', workoutEquipmenthantel)
    .eq('tisch', workoutEquipmenttisch)
    
    if (error) {
        console.log("error", error);
        return;
    }
    console.log("data", data);

    for (const workout of data) {
        console.log(workout.titel);

        const resultContainer = document.querySelector("#result-container");

        resultContainer.innerHTML += `
        <a href="./videoplayer.html?id=${workout.id}">
            <div class="Button1">
                <img src="../img/Play_Icon.svg" alt="Workout">
                <div class="WorkoutButton">
                    <h6>${workout.titel}</h6>
                </div>
            </div>
        </a>
        `;


    }


    // return data;
  }

  selectAllWorkouts();

// console.log('Alle Workouts mit gleicher Zeit: ', selectAllWorkouts());
