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
        const workoutId = urlParams.get('workoutId');

        // Extract the parameters you passed in the URL
        const embedLink = urlParams.get('embedLink');
        const beschreibung = urlParams.get('beschreibung');
        const dauer = urlParams.get('dauer');
        const muskelgruppe = urlParams.get('muskelgruppe');

        if (workoutId) {
            // Löschen Sie alle Einträge in der "historydata"-Tabelle, bei denen die "workout_id" mit der extrahierten Workout-ID übereinstimmt
            const { data: historyData, error: historyError } = await supa
                .from('historydata')
                .delete()
                .eq('workout_id', workoutId);

            if (historyError) {
                console.error('Fehler beim Löschen der Einträge in der History-Tabelle: ', historyError);
            } else {
                // Nachdem die Verweise gelöscht wurden, können Sie das Workout aus der "workoutdata"-Tabelle löschen
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
            }
        } else {
            console.error('Ein Parameter konnte leider nicht übergeben werden.');
        }
    }
}

// Eventlistener für den "deleteaccount"-Button hinzufügen
document.getElementById('deleteworkout').addEventListener('click', deleteWorkoutData);
