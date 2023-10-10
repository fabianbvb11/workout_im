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

// Check and display the initial user status
// const initialUser = supa.auth.user();
// updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginButton').addEventListener('click', login);
// document.getElementById('signupButton').addEventListener('click', signUp);

// Listener for authentication state changes
// supa.auth.onAuthStateChange((event, session) => {
//     if (event === "SIGNED_IN") {
//         console.log("User signed in: ", session.user);
//         updateUserStatus(session.user);
//     } else if (event === "SIGNED_OUT") {
//         console.log("User signed out");
//         updateUserStatus(null);
//     }
// });

// Logout logic
// async function logout() {
//     const { error } = await supa.auth.signOut();
//     if (error) {
//         console.error("Error during logout:", error);
//     } else {
//         updateUserStatus(null);
//         console.log("User logged out successfully.");
//     }
// }

// document.getElementById('logoutButton').addEventListener('click', logout);
