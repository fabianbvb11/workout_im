import { supa } from "../js/supabase_config.js";

// Function to reset password using email
async function resetPassword(email) {
    try {
        const { error } = await supa.auth.api.resetPasswordForEmail(email);

        if (error) {
            ausgabefeld.innerHTML = "Fehler beim Zurücksetzen des Passworts.";
        } else {
            ausgabefeld.innerHTML = "Eine E-Mail zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.";
        }

        setTimeout(() => {
            ausgabefeld.textContent = '';
        }, 3000);
    } catch (error) {
        console.error(error)
        ausgabefeld.innerHTML = "Fehler beim Zurücksetzen des Passworts: " + error.message;
        setTimeout(() => {
            ausgabefeld.textContent = '';
        }, 3000);
    }
}

// Event listener for the form submission
const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailpasswordreset').value;
    resetPassword(email);
});


