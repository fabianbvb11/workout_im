import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

//Auswahl aus local storage ins console log schreiben
console.log(localStorage.getItem('bett'));
console.log(localStorage.getItem('stuhl'));
console.log(localStorage.getItem('hantel'));
console.log(localStorage.getItem('tisch'));

//testen ob local storage funktioniert
console.log(localStorage.getItem('activeDotID'));
console.log(localStorage.getItem('selectedTime'));

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
    .eq('zeit', workoutDauer)
    .eq('muskelgruppe', workoutMuskelgruppe)
    .eq('bett', workoutEquipmentbett)
    .eq('stuhl', workoutEquipmentstuhl)
    .eq('hantel', workoutEquipmenthantel)
    .eq('tisch', workoutEquipmenttisch);
    
    return data;
  }

console.log('Alle Workouts mit gleicher Zeit: ', selectAllWorkouts());a
