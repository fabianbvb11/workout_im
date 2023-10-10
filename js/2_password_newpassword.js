import { supa } from "../js/supabase_config.js";

// Function to change password
async function changePassword() {
    const newPassword = document.getElementById('passwordInput').value;
    const newPasswordRepeat = document.getElementById('passwordInputRepeat').value;

    // Überprüfe, ob die beiden Passwörter übereinstimmen
    if (newPassword !== newPasswordRepeat) {
        alert("Die eingegebenen Passwörter stimmen nicht überein.");
        return;
    }

    try {
        const user = supa.auth.user();
        const { error } = await supa.auth.update({ password: newPassword });

        if (error) {
            alert("Fehler beim Ändern des Passworts: " + error.message);
        } else {
            alert("Passwort erfolgreich geändert.");
            window.location.href = "startseite.html";
        }
    } catch (error) {
        console.error(error);
        alert("Fehler beim Ändern des Passworts: " + error.message);
    }
}

// Event listener für das Formular
const changePasswordForm = document.querySelector('form');
changePasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    changePassword();
});
