import { supa } from "../js/supabase_config.js";

// Function to sign up using email and password
async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('name').value;

     if (!email || !password || !firstname || !lastname) {
        ausgabefeld.textContent = 'Bitte fülle alle Felder aus!';
        setTimeout(function() {
        ausgabefeld.textContent = '';
    }, 3000);
        return;
    }

    // Überprüfen, ob die E-Mail-Adresse gültig ist
    if (!isValidEmail(email)) {
        ausgabefeld.textContent = 'Die eingegebene E-Mail-Adresse ist ungültig!';
        return;
    }

    console.log(email + " " + firstname + " " + lastname);

    const { error } = await supa.auth.signUp(
        {
            "email" : email,
            "password": password
        },{
            "data": {
                  "first_name": firstname,
                  "last_name": lastname
                }
              });

    if (error) {
        ausgabefeld.textContent = 'Fehler beim einloggen:' + error.message;
    } else {
        console.log("Signed up as ", email);
        window.location.href = "registersuccess.html";
    }
}

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

document.getElementById('signupButton').addEventListener('click', signUp);

// Listener for authentication state changes
supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        console.log("User signed in: ", session.user);
        updateUserStatus(session.user);
    } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        updateUserStatus(null);
    }
});