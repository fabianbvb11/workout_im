import { supa } from "../js/supabase_config.js";

// Function to reset password using email
async function resetPassword(email) {
    try {
        const { error } = await supa.auth.api.resetPasswordForEmail(email);

        if (error) {
            alert("Fehler beim Zurücksetzen des Passworts.");
        } else {
            alert("Eine E-Mail zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.");
        }
    } catch (error) {
        console.error(error);
        alert("Fehler beim Zurücksetzen des Passworts: " + error.message);
    }
}

// Event listener for the form submission
const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailpasswordreset').value;
    resetPassword(email);
});


