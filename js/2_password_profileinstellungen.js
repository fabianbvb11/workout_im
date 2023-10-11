import { supa } from "../js/supabase_config.js";

// Funktion zum Abrufen und Anzeigen des Benutzernamens
async function displayUserName() {

    const user = supa.auth.user();

    if (user) {
        const { id } = user;

    // Abrufen der Benutzerdaten aus der 'userdata'-Tabelle

    const { data, error } = await supa
        .from('userdata')
        .select('vorname', 'nachname')
        .eq('id', id)
        .single();

    if (error) {
        console.log('Fehler beim Abrufen der Benutzerdaten:', error);
        document.getElementById('firstnameprofil').textContent = "unbekannt";
        document.getElementById('lastnameprofil').textContent = "unbekannt";
    } else {
            // Den Vornamen und Nachnamen anzeigen
            const vorname = `${data.vorname}`;
            const nachname = `${data.nachname}`
            document.getElementById('firstnameprofil').textContent = vorname;
            document.getElementById('lastnameprofil').textContent = nachname;
        }
    }
}

// Führen Sie die Funktion aus, um den Benutzernamen anzuzeigen

displayUserName();

