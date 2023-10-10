import { supa } from "../js/supabase_config.js";

// Function to sign up using email and password
async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('name');

    console.log(email + " " + firstname + " " + lastname);

    const { error } = await supa.auth.signUp(
        {
            email,
            password,
            options: {
                data: {
                  first_name: firstname,
                  last_name: lastname,
                }
              }});

    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
        window.location.href = "registersuccess.html";
    }
}

// Function to update user status
// function updateUserStatus(user) {
//     const userStatusElement = document.getElementById('userStatus');

//     if (user) {
//         userStatusElement.textContent = `Authenticated as: ${user.email}`;
//     } else {
//         userStatusElement.textContent = "Not authenticated.";
//     }
// }

// Check and display the initial user status
// const initialUser = supa.auth.user();
// updateUserStatus(initialUser);

// Event listeners for the buttons
// document.getElementById('loginButton').addEventListener('click', login);
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

// Logout logic
async function logout() {
    const { error } = await supa.auth.signOut();
    if (error) {
        console.error("Error during logout:", error);
    } else {
        updateUserStatus(null);
        console.log("User logged out successfully.");
    }
}

// document.getElementById('logoutButton').addEventListener('click', logout);
