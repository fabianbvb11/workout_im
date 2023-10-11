import { supa } from "../js/supabase_config.js";

// Funktion zum Abrufen und Anzeigen des Benutzernamens

async function displayUserDisplayName() {

    const user = supa.auth.user();

    if (user) {

        const { id } = user;

        // Abrufen der Benutzerdaten aus der 'userdata'-Tabelle

        const { data, error } = await supa
            .from('userdata')
            .select('vorname')
            .eq('id', id)
            .single();


        if (error) {

            console.log('Fehler beim Abrufen der Benutzerdaten:', error);
            document.getElementById('userDisplayName').textContent = "unbekannt";

        } else {

            // Den Vornamen und Nachnamen anzeigen
            const displayName = `${data.vorname}`;
            document.getElementById('userDisplayName').textContent = "Hallo " + displayName + "!";

        }

    }

}



// Führen Sie die Funktion aus, um den Benutzernamen anzuzeigen

displayUserDisplayName();

