import { supa } from "../js/supabase_config.js";

// Logout logic
async function logout() {
    const { error } = await supa.auth.signOut();
    if (error) {
        console.error("Error during logout:", error);
    } else {
        console.log("User logged out successfully.");
        window.location.href = "welcome.html";
    }
}

document.getElementById('logoutButton').addEventListener('click', logout);

supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
        console.log("Benutzer ausgeloggt.");
    }
});

const user = supa.auth.user();
if (!user) {
    console.log("Benutzer ausgeloggt.");
}

