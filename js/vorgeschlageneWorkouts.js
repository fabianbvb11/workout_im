import { supa } from "../js/supabase_config.js";
console.log("Supabase initialisiert")

// YT API Key
const API_KEY = 'AIzaSyD62p9odxLl0hhLyUbCV76TVnndslpe_x8';

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
        window.location.href = 'login.html';
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
// ...

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

    const resultContainer = document.querySelector("#result-container");

    for (const workout of data) {
        console.log(workout.titel);

        // Replace 'YOUR_YOUTUBE_URL' with the YouTube URL you want to extract a thumbnail from
        const YOUTUBE_URL = `${workout.video}`;
        // Parse the video ID from the YouTube URL
        const videoId = new URL(YOUTUBE_URL).searchParams.get('v');

        // Use the YouTube Data API to get video details, including thumbnails
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.items && data.items.length > 0) {
                    const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
                    console.log('Thumbnail URL:', thumbnailUrl);

                    const thumbnailImage = document.createElement('img'); // Create the thumbnail image element for each video
                    thumbnailImage.src = thumbnailUrl;

                    resultContainer.innerHTML += `
                    <a href="./videoplayer.html?id=${workout.id}">
                        <div class="Button1">
                            <img class="thumbnail" src="${thumbnailImage.src}" alt="YouTube Thumbnail">
                            <h6>${workout.titel}</h6>
                        </div>
                    </a>
                    `;
                } else {
                    console.error('Unable to fetch thumbnail.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

selectAllWorkouts();







