import { supa } from "../js/supabase_config.js";

async function deleteUserData() {
  const user = supa.auth.user();

  if (!user) {
    window.location.href = 'login.html';
    return;
}


  if (user) {
    const { id } = user;


      const { data, error } = await supa
       .from('historydata')
       .delete()
       .eq('user_id', id);

    if (error) {
      console.error('Fehler beim Löschen der Daten aus "historydata":', error);
    } else {
      console.log('Daten aus "historydata" erfolgreich gelöscht.');


      const { data: workoutIds, error: workoutIdsError } = await supa
    .from('workoutdata')
    .select('id')
    .eq('user_id', user.id);

if (workoutIdsError) {
    console.error('Fehler beim Abrufen der workout_ids aus "workoutdata":', workoutIdsError);
} else {
    // Löschen der Einträge in der historydata-Tabelle, basierend auf workout_id
    const { data: historyData, error: historyError } = await supa
        .from('historydata')
        .delete()
        .in('workout_id', workoutIds.map(item => item.id));

    if (historyError) {
        console.error('Fehler beim Löschen der Daten aus "historydata":', historyError);
    } else {
        console.log('Daten aus "historydata" erfolgreich gelöscht.');
    }
}
    }


    const { dataWorkout, errorWorkout } = await supa
      .from('workoutdata')
      .delete()
      .eq('user_id', id);

    if (errorWorkout) {
      console.error('Fehler beim Löschen der Daten aus "workoutdata":', errorWorkout);
    } else {
      console.log('Daten aus "workoutdata" erfolgreich gelöscht.');
    }

    const { dataUserimage, errorUserimage } = await supa
    .from('userimage')
    .delete()
    .eq('id', id);

  if (errorUserimage) {
    console.error('Fehler beim Löschen der Daten aus "userimage":', errorUserimage);
  } else {
    console.log('Daten aus "userimage" erfolgreich gelöscht.');
  }


  const { dataUser, errorUser } = await supa
  .from('userdata')
  .delete()
  .eq('id', id);

if (errorUser) {
  console.error('Fehler beim Löschen der Daten aus "userdata":', errorUser);
} else {
  if (dataUser) {
      console.log(`Daten aus "userdata" erfolgreich gelöscht.`);
      window.location.href = "login.html";
  } else {
      console.log('Keine Daten aus "userdata" gelöscht. Benutzer mit der angegebenen ID nicht gefunden.');
      window.location.href = "login.html";
  } 
}

    // Delete user from authentication
    const { errorAuth } = await supa.auth.deleteUser();
    if (errorAuth) {
      console.error('Fehler beim Löschen des Benutzers aus der Authentifizierung:', errorAuth);
    } else {
      console.log('Benutzer erfolgreich aus der Authentifizierung gelöscht.');
    }
    
  }
}

// Eventlistener für den "deleteaccount"-Button hinzufügen
document.getElementById('deleteaccount').addEventListener('click', deleteUserData);
