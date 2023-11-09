import { supa } from "../js/supabase_config.js";

// Function to change password

async function changePassword() {

    const newPassword = document.getElementById('passwordInput').value;
    const newPasswordRepeat = document.getElementById('passwordInputRepeat').value;

    // Überprüfe, ob die beiden Passwörter übereinstimmen

    if (newPassword !== newPasswordRepeat) {
        ausgabefeld.innerHTML = "Die eingegebenen Passwörter stimmen nicht überein.";
        return;
    }

    try {
        const user = supa.auth.user();
        const { error } = await supa.auth.update({ password: newPassword });

        if (error) {
            ausgabefeld.innerHTML = "Fehler beim Ändern des Passworts: " + error.message;
            setTimeout(() => {
                ausgabefeld.textContent = '';
            }, 3000);
        } else {

            ausgabefeld.innerHTML = "Passwort erfolgreich geändert.";
            window.location.href = "/startscreen.html";
        }

    } catch (error) {
        console.error(error);
        ausgabefeld.innerHTML = "Fehler beim Ändern des Passworts: " + error.message;
        setTimeout(() => {
            ausgabefeld.textContent = '';
        }, 3000);
    }
}


const changePasswordForm = document.querySelector('form');
changePasswordForm.addEventListener('submit', function (e) {

    e.preventDefault();
    changePassword();
});

