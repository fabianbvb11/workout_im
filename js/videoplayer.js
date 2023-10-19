import { supa } from "../js/supabase_config.js";
console.log("Supabase initialisiert")

// Funktion zum Abrufen und Anzeigen des Benutzernamens

async function displayUserDisplayName() {
    const user = supa.auth.user();

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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const workoutID = urlParams.get('id');

const result = document.getElementById("resultat");

result.innerHTML = workoutID;

async function selectWorkout() {
    const { data, error } = await supa
        .from("workoutdata")
        .select()
        .eq('id', workoutID)
        

    if (error) {
        videocontainer.textContent = 'Fehler beim Abrufen des Workouts:' + error.message;
        console.log("error", error);
        return;
    
} else {
    if (data.length > 0) {
        const videocontainer = document.getElementById('ausgabefeld');

        videocontainer.innerHTML = '';

        // ...

        data.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('ansicht_workout');


            const embedLink = `https://www.youtube.com/embed/${getVideoIDFromURL(workout.video)}`;

            workoutItem.innerHTML = `
    <h2>${workout.titel}</h2>
    <h4 class= "beschreibung">Beschreibung:<br> ${workout.beschreibung}</h4>
    <iframe width="560" height="315" src="${embedLink}" frameborder="0" allowfullscreen></iframe>
    
    
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
        videocontainer.textContent = 'Keine Workouts gefunden.';
    }
}
}
selectWorkout();

// Funktion zum Speichern der Historie

async function saveHistory() {
    const user = supa.auth.user();
    if (!user) {
        console.error('Benutzer ist nicht eingeloggt.');
        return;
    }

    const { data, error } = await supa
        .from('historydata')
        .insert(
            { 
                user_id: user.id,
                workout_id: workoutID
            }
        );

    if (error) {
        console.log('Fehler beim Speichern der Historie:', error.message);
        return;
    }

    console.log('Historie gespeichert:', data);
}
saveHistory();
