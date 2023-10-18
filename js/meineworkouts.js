import { supa } from "../js/supabase_config.js";

// Funktion zum Abrufen der Workouts des angemeldeten Benutzers
async function getMyWorkouts() {
    const user = supa.auth.user();

    if (!user) {
        ausgabefeld.textContent = 'Benutzer ist nicht eingeloggt:' + error.message;
        return;
    }

    const { data, error } = await supa
        .from('workoutdata')
        .select('titel, beschreibung, muskelgruppe, zeit, bett, stuhl, hantel, tisch, video')
        .eq('user_id', user.id);


    if (error) {
        ausgabefeld.textContent = 'Fehler beim Abrufen der Workouts:' + error.message;
    } else {
        if (data.length > 0) {
            const ausgabefeld = document.getElementById('ausgabefeld');

            ausgabefeld.innerHTML = '';

            // ...

            data.forEach(workout => {
                const workoutItem = document.createElement('div');
                workoutItem.classList.add('ansicht_workout');

                let equipmentText = 'Ausstattung: ';

                if (workout.bett === true) {
                    equipmentText += 'Bett, ';
                }

                if (workout.stuhl === true) {
                    equipmentText += 'Stuhl, ';
                }

                if (workout.hantel === true) {
                    equipmentText += 'Hantel, ';
                }

                if (workout.tisch === true) {
                    equipmentText += 'Tisch, ';
                }

                equipmentText = equipmentText.slice(0, -2);

                const embedLink = `https://www.youtube.com/embed/${getVideoIDFromURL(workout.video)}`;

                workoutItem.innerHTML = `
        <iframe width="560" height="315" src="${embedLink}" frameborder="0" allowfullscreen></iframe>
        <h2>${workout.titel}</h2>
        <h5>Beschreibung: ${workout.beschreibung}</h5>
        <h5>Muskelgruppe: ${workout.muskelgruppe}</h5>
        <h5>Dauer: ${workout.zeit} Min</h5>
        <h5>${equipmentText}</h5>
        
    `;
    ausgabefeld.appendChild(workoutItem);
            });

            // Funktion, um die Video-ID aus einer YouTube-Video-URL zu extrahieren
            function getVideoIDFromURL(url) {
                const videoID = url.split('v=')[1];
                const ampersandPosition = videoID.indexOf('&');
                if (ampersandPosition !== -1) {
                    return videoID.substring(0, ampersandPosition);
                }
                return videoID;
            }

        } else {
            ausgabefeld.textContent = 'Keine Workouts gefunden.';
        }
    }
}

// Rufe die Funktion zum Abrufen der Workouts des Benutzers auf
getMyWorkouts();
