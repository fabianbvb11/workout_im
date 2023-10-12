import { supa } from "../js/supabase_config.js";



document.addEventListener('DOMContentLoaded', (event) => {
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', uploadPhoto);
});

async function uploadPhoto() {
    const user = supa.auth.user();
    if (!user) {
        console.error('Benutzer ist nicht eingeloggt.');
        return;
    }

    const fileInput = document.getElementById('photoInput');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const filePath = `profilbilder/${user.id}/${file.name}`;

        const { data: existingImageData, error: existingImageError } = await supa.from('userimage').select('url').eq('id', user.id);

        if (existingImageError) {
            console.error('Fehler beim Abfragen des vorhandenen Bilds:', existingImageError);
            return;
        }

        if (existingImageData.length > 0) {
            const existingImagePath = existingImageData[0].url;
            const { error: deleteError } = await supa.storage.from('profilbilder').remove([existingImagePath]);

            if (deleteError) {
                console.error('Fehler beim Löschen des vorhandenen Bilds:', deleteError);
                return;
            }

            const { error: deleteUserDataError } = await supa.from('userimage').delete().eq('id', user.id);

            if (deleteUserDataError) {
                console.error('Fehler beim Löschen des alten Datensatzes:', deleteUserDataError);
                return;
            }
        }

        const { error: uploadError } = await supa.storage.from('profilbilder').upload(filePath, file);

        if (uploadError) {
            console.error('Fehler beim Hochladen der Datei:', uploadError);
            return;
        }

        // Einfügen der Daten in die Tabelle "userimage" mit Benutzer-ID
        const { data, error } = await supa.from('userimage').insert([
            {
                url: filePath,
                id: user.id // Hinzufügen der Benutzer-ID
            }
        ]);

        if (error) {
            console.error('Fehler beim Speichern in der Tabelle "userimage":', error);
        } else {
            console.log('Erfolgreich hochgeladen und gespeichert:', data);
            alert('Profilbild erfolgreich hochgeladen!');
        }
    } else {
        console.log('Keine Datei ausgewählt.');
    }
}




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

async function fetchAndDisplayUserPhoto() {
    const user = supa.auth.user();
    if (!user) {
        console.error('Benutzer ist nicht eingeloggt.');
        return;
    }

    const { data, error } = await supa.from("userimage").select("url").eq("id", user.id);
    if (error) {
        console.error("Error fetching user's photo:", error);
        return;
    }

    const photosContainer = document.getElementById('profilbild_anzeige');
    
    if (data.length > 0) {
        const userPhoto = data[0];
        const signedUrl = await getSignedUrl(userPhoto.url);
        if (signedUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = signedUrl;
            imgElement.alt = "Uploaded photo";
            imgElement.width = 200;
            photosContainer.appendChild(imgElement);
        }
    }
}

fetchAndDisplayUserPhoto();
