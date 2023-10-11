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
            document.getElementById('firstnameprofil').value = "unbekannt";
            document.getElementById('lastnameprofil').value = "unbekannt";
        } else {
            
            // Den Vornamen und Nachnamen in den Eingabefeldern anzeigen
            const vorname = `${data.vorname}`;
            const nachname = `${data.nachname}`;

            console.log(vorname + nachname)


            document.getElementById('firstnameprofil').value = vorname;
            document.getElementById('lastnameprofil').value = nachname;
        }
    }
}

// Führen Sie die Funktion aus, um den Benutzernamen anzuzeigen
displayUserName();
