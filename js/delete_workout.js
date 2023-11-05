import { supa } from "../js/supabase_config.js";

async function deleteWorkoutData() {
    const user = supa.auth.user();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }


    if (user) {
        const { id } = user;

        // Parse the URL to get the parameters from the query string
        const urlParams = new URLSearchParams(window.location.search);

        // Extract the parameters you passed in the URL
        const embedLink = urlParams.get('embedLink');
        const beschreibung = urlParams.get('beschreibung');
        const dauer = urlParams.get('dauer');
        const muskelgruppe = urlParams.get('muskelgruppe');

        if (embedLink && beschreibung && dauer && muskelgruppe) {
            const { data, error } = await supa
                .from('workoutdata')
                .delete()
                .eq('user_id', id)
                .eq('video', embedLink)
                .eq('beschreibung', beschreibung)
                .eq('zeit', dauer)
                .eq('muskelgruppe', muskelgruppe);

            if (error) {
                console.error('Fehler beim Löschen des Workouts: ', error);
            } else {
                console.log('Workout erfolgreich gelöscht!');
                window.location.href = "/meineworkouts.html";
            }
        } else {
            console.error('Ein Paramter konnte leider nicht mitgegeben werden.');
        }
    }
}

// Eventlistener für den "deleteaccount"-Button hinzufügen
document.getElementById('deleteworkout').addEventListener('click', deleteWorkoutData);
