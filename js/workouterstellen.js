import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

// Funktion zum Einfügen eines neuen Workouts
const hochladen  = document.querySelector('#uploadButton');
hochladen.addEventListener('click', insertWorkout);


async function insertWorkout() {
  const user = supa.auth.user();

  // Check if the user is authenticated
  if (!user) {
      console.log('User is not authenticated.');
      return;
  }


    console.log("insertWorkout() ausgeführt")
    const url = document.querySelector('#ytUrl');
    const workoutTitel = document.querySelector('#titel');
    const workoutBeschreibung = document.querySelector('#description');
    const workoutMuskelgruppe = document.querySelector('#muskelgruppe');
    const workoutDauer = document.querySelector('#zeit');
  
    const workoutEquipmentbett = document.getElementById("bettbutton").checked;
    const workoutEquipmentstuhl = document.getElementById("stuhlbutton").checked;
    const workoutEquipmenthantel = document.getElementById("hantelbutton").checked;
    const workoutEquipmenttisch = document.getElementById("tischbutton").checked;

    if (
      !url.value ||
      !workoutTitel.value ||
      !workoutBeschreibung.value ||
      !workoutMuskelgruppe.value ||
      !workoutDauer.value
    ) {
      ausgabefeld.textContent = 'Bitte fülle alle Felder aus!';
  
      setTimeout(() => {
        ausgabefeld.textContent = '';
      }, 3000);
      return;
    }

    if (!url.value.includes('youtube.com')) {
      ausgabefeld.textContent = 'Die URL muss ein Youtubelink sein!';
      

      setTimeout(() => {
        ausgabefeld.textContent = '';
      }, 3000);
      return;
    }
   
    console.log(url.value);
    console.log(workoutTitel.value);
    console.log(workoutBeschreibung.value);
    console.log(workoutMuskelgruppe.value);
    console.log(workoutDauer.value);
    // console.log(workoutEquipment);

     const { data, error } = await supa
    .from('workoutdata')
    .insert([
      {
        video: url.value,
        muskelgruppe: workoutMuskelgruppe.value,
        zeit: workoutDauer.value,
        beschreibung: workoutBeschreibung.value,
        titel: workoutTitel.value,
        
        // equipment: workoutEquipment,

        bett: workoutEquipmentbett,
        stuhl: workoutEquipmentstuhl,
        hantel: workoutEquipmenthantel,
        tisch: workoutEquipmenttisch,
        user_id: user.id,
      }
    ]);
      

    if (error) {
      ausgabefeld.textContent = 'Fehler beim Speichern der Änderungen: ' + error.message;
  } else {
    ausgabefeld.textContent = 'Änderungen erfolgreich gespeichert!';
  }

  setTimeout(() => {
    ausgabefeld.textContent = '';
}, 3000);
      
}