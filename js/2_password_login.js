import { supa } from "../js/supabase_config.js";

// Function to login using email and password
async function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signIn({ email, password });

    if (error) {
        fehlermeldung.innerHTML = "Fehler während dem Login: " + error.message;
    } else {
        console.log("Logged in as ", email);
        window.location.href = "/startscreen.html";
    }
}

document.getElementById('loginButton').addEventListener('click', login);
