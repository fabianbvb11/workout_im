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



const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    }
});
