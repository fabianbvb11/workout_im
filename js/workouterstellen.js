import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

// Funktion zum Einfügen eines neuen Workouts
const hochladen  = document.querySelector('#uploadButton');
hochladen.addEventListener('click', insertWorkout);
// console.log("Eventlistener hochladen aktiviert")

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
    // const workoutEquipment = {
    //     bett: document.getElementById("bettbutton").checked,
    //     stuhl: document.getElementById("stuhlbutton").checked,
    //     hantel: document.getElementById("hantelbutton").checked,
    //     tisch: document.getElementById("tischbutton").checked,
    //   };

    const workoutEquipmentbett = document.getElementById("bettbutton").checked;
    const workoutEquipmentstuhl = document.getElementById("stuhlbutton").checked;
    const workoutEquipmenthantel = document.getElementById("hantelbutton").checked;
    const workoutEquipmenttisch = document.getElementById("tischbutton").checked;
    
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
      workoutupload.textContent = 'Fehler beim Speichern der Änderungen: ' + error.message;
  } else {
      workoutupload.textContent = 'Änderungen erfolgreich gespeichert.';
  }

  setTimeout(() => {
    workoutupload.textContent = ''; // Leer den Textinhalt, um das Element auszublenden
}, 3000);
      
}