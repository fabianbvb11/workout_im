import { supa } from "../js/supabase_config.js";

const ausgabefeld = document.getElementById('ausgabefeld');

// Funktion zum Abrufen und Anzeigen des Benutzernamens

async function displayUserDisplayName() {
    const user = supa.auth.user();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }


    if (user) {

        const { id } = user;

        const { data, error } = await supa
            .from('userdata')
            .select('vorname')
            .eq('id', id)
            .single();

        if (error) {
            console.log('Fehler beim Abrufen der Benutzerdaten:', error);
            document.getElementById('userDisplayName').textContent = "unbekannt";
        } else {
            const displayName = `${data.vorname}`;
            document.getElementById('userDisplayName').textContent = "Hallo " + displayName + "!";

        }

    }

}

displayUserDisplayName();

// Profilbild anzeigen
async function getSignedUrl(filePath) {
    const user = supa.auth.user();
    if (!user) {
        console.error('Benutzer ist nicht eingeloggt.');
        return;
    }

    const { data, error } = await supa.storage.from('profilbilder').createSignedUrl(filePath, 300);
    if (error) {
        console.error('Fehler beim Laden des Bildes:', error);
        return null;
    }
    return data.signedURL;
}

async function fetchAndDisplayPhotos() {
    const user = supa.auth.user();
    if (!user) {
        console.error('Benutzer ist nicht eingeloggt.');
        return;
    }

    const { data, error } = await supa.from("userimage").select("url").eq("id", user.id);
    if (error) {
        console.error("Error fetching photos:", error);
        return;
    }
    const photosContainer = document.getElementById('photosContainer');
    for (const photo of data) {
        const signedUrl = await getSignedUrl(photo.url);
        if (signedUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = signedUrl;
            imgElement.alt = "Uploaded photo";
            imgElement.width = 200;
            photosContainer.appendChild(imgElement);
            const captionElement = document.createElement('p');
            captionElement.textContent = photo.caption;
            photosContainer.appendChild(captionElement);
        }
    }
}

fetchAndDisplayPhotos();

async function getMyVisitedWorkouts() {
    const user = supa.auth.user();

    if (!user) {
        ausgabefeld.textContent = 'Benutzer ist nicht eingeloggt:' + error.message;
        return;
    }

    const { data, error } = await supa
        .from('historydata')
        .select(`
            workout_id, timestamp,
            workoutdata(id, titel, beschreibung, muskelgruppe, zeit, bett, stuhl, hantel, tisch, video)
        `)
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });



// const originalDate = "2023-11-05 16:57:00.841242";

// const dateObj = new Date(originalDate);

// function addLeadingZero(number) {
//     return number < 10 ? `0${number}` : number;
// }

// const formattedDate = `${addLeadingZero(dateObj.getDate())}.${addLeadingZero(dateObj.getMonth() + 1)}.${dateObj.getFullYear()}, ${addLeadingZero(dateObj.getHours())}:${addLeadingZero(dateObj.getMinutes())}`;


   
    if (error) {
        ausgabefeld.textContent = 'Fehler beim Abrufen der Workouts:' + error.message;
    } else {
        if (data.length > 0) {
            console.log(data);
            const ausgabefeld = document.getElementById('ausgabefeld');
            ausgabefeld.innerHTML = '';

            // ...

            for (const index in data) {
                const workout = data[index];

                const workoutItem = document.createElement('div');
                workoutItem.classList.add('ansicht_workout');
                let equipmentText = 'Ausstattung: ';
                if (workout.workoutdata.bett === true) {
                    equipmentText += 'Bett, ';
                }
                if (workout.workoutdata.stuhl === true) {
                    equipmentText += 'Stuhl, ';
                }
                if (workout.workoutdata.hantel === true) {
                    equipmentText += 'Hantel, ';
                }
                if (workout.workoutdata.tisch === true) {
                    equipmentText += 'Tisch, ';
                }
                equipmentText = equipmentText.slice(0, -2);

                const embedLink = `https://www.youtube.com/embed/${getVideoIDFromURL(workout.workoutdata.video)}`;
                const embedLinkdelete = `https://www.youtube.com/watch?v=${getVideoIDFromURL(workout.workoutdata.video)}`;


                //Timestamp 
                const originalDate = workout.timestamp;

                const dateObj = new Date(originalDate);

                dateObj.setHours(dateObj.getHours() + 1);

                function addLeadingZero(number) {
                    return number < 10 ? `0${number}` : number;
                }

                const formattedDate = `${addLeadingZero(dateObj.getDate())}.${addLeadingZero(dateObj.getMonth() + 1)}.${dateObj.getFullYear()}, ${addLeadingZero(dateObj.getHours())}:${addLeadingZero(dateObj.getMinutes())}`;

            

                workoutItem.innerHTML = `
                
                <iframe width="560" height="315" src="${embedLink}" frameborder="0" allowfullscreen></iframe>
                <h2>${workout.workoutdata.titel}</h2>
                <h4>Beschreibung: ${workout.workoutdata.beschreibung}</h4>
                <h4>Muskelgruppe: ${workout.workoutdata.muskelgruppe}</h4>
                <h4>Dauer: ${workout.workoutdata.zeit} Min</h4>
                <h4>${equipmentText}</h4>
                <h4>Ausgeführt am: ${formattedDate}</h4>
            `;
            ausgabefeld.appendChild(workoutItem);
            }

            function getVideoIDFromURL(url) {
                const videoIDMatch = /(?:[?&]v=|\/embed\/|\/videos\/|youtu\.be\/|\/embed\?video_id=)([a-zA-Z0-9_-]+)/.exec(url);
                if (videoIDMatch) {
                    return videoIDMatch[1];
                }
                return null; // Oder einen Standardwert, wenn keine passende Video-ID gefunden wurde
            }
        } else {
            ausgabefeld.textContent = 'Keine Workouts gefunden.';
        }
    }
}

getMyVisitedWorkouts();
