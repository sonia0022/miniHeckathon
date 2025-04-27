import { auth, signOut , onAuthStateChanged } from './firebaseConfiq.js';


document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector("#logoutBtn");

    // Check user login state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in:", user);
            localStorage.setItem("userLoggedIn", "true");
        } else {
            console.log("User is logged out");
            localStorage.removeItem("userLoggedIn"); // Remove login state
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                console.log("User signed out");
                localStorage.removeItem("userLoggedIn"); // Remove login state
                window.location.replace("/src/pages/login.html");
                // window.location.href = "../pages/login.html"; 
            } catch (error) {
                console.error("Logout error:", error.message);
            }
        });
    }
});
