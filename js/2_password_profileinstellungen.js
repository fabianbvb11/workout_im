import { supa } from "../js/supabase_config.js";

async function displayUserName() {
    const user = supa.auth.user();

    if (user) {
        const { id } = user;

        const { data, error } = await supa
            .from('userdata')
            .select('vorname, nachname')
            .eq('id', id)
            .single();

        if (error) {
            console.log('Fehler beim Abrufen der Benutzerdaten:', error);
            document.getElementById('firstnameprofil').value = "unbekannt";
            document.getElementById('lastnameprofil').value = "unbekannt";
        } else {
            
            const vorname = `${data.vorname}`;
            const nachname = `${data.nachname}`;


            document.getElementById('firstnameprofil').value = vorname;
            document.getElementById('lastnameprofil').value = nachname;
        }
    }
}

displayUserName();





const saveButton = document.querySelector('.speichernButton button');
saveButton.addEventListener('click', saveChanges);


async function saveChanges() {
    const vorname = document.getElementById('firstnameprofil').value;
    const nachname = document.getElementById('lastnameprofil').value;

    const user = supa.auth.user();

    if (user) {
        const { id } = user;

   
        const { error } = await supa
            .from('userdata')
            .update({ vorname, nachname })
            .eq('id', id);

        if (error) {
            nameoutput.textContent = 'Fehler beim Speichern der Änderungen: ' + error.message;
        }  else {
            nameoutput.textContent = 'Änderungen erfolgreich gespeichert.';
        }

        setTimeout(() => {
            nameoutput.textContent = ''; // Leer den Textinhalt, um das Element auszublenden
        }, 30000);
    }
}
