import { supa } from "../js/supabase_config.js";

console.log("Supabase initialisiert")

// Funktion zum Einfügen eines neuen Workouts
const hochladen  = document.querySelector('#uploadButton');
hochladen.addEventListener('click', insertWorkout);


// ist der user eingeloggt?
async function insertWorkout() {
  const user = supa.auth.user();

  if (!user) {
    window.location.href = 'login.html';
    return;
}

// HTML-Elemente und Checkboxen abrufen, um die Workout-Daten zu sammeln.
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

  // Es wird überprüft, ob alle erforderlichen Felder ausgefüllt sind. Andernfalls wird eine Fehlermeldung angezeigt.

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


    // Es wird überprüft, ob die URL ein Youtube-Link ist. Andernfalls wird eine Fehlermeldung angezeigt.
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

    // Workout-Daten mithilfe von Supabase in die Tabelle "workoutdata" eingefügt (Video-URL, Muskelgruppe, Zeit, Beschreibung, Titel)
    
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
      
// Bei einem Fehler wird eine Fehlermeldung angezeigt, ansonsten eine Erfolgsmeldung. Die Felder werden geleert.

    if (error) {
      ausgabefeld.textContent = 'Fehler beim Speichern der Änderungen: ' + error.message;
  } else {
    ausgabefeld.textContent = 'Workout erfolgreich hochgeladen!';

    url.value = '';
  workoutTitel.value = '';
  workoutBeschreibung.value = '';
  workoutMuskelgruppe.value = '';
  workoutDauer.value = '';
  document.getElementById("bettbutton").checked = false;
  document.getElementById("stuhlbutton").checked = false;
  document.getElementById("hantelbutton").checked = false;
  document.getElementById("tischbutton").checked = false;
  }

  setTimeout(() => {
    ausgabefeld.textContent = '';
}, 3000);
      
}