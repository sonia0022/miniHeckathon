import {
    auth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "./firebaseConfiq.js";

// =============== Sign In ===============
document.addEventListener("DOMContentLoaded", () => {
    const login = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);

            // Save login state in localStorage
            localStorage.setItem("userLoggedIn", "true");
            // window.location.replace("/pages/login.html");
            window.location.href = "./home.html";
        } catch (error) {
            console.error("Login Error:", error.message);
            alert("Login failed. Check your email and password.");
        }
    };

    document.getElementById("signInButton")?.addEventListener("click", login);
});

// =============== Google Sign-In ===============
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User logged in with Google:", user);
        window.location.href = "./home.html";
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        alert("Google Sign-In failed");
    }
};

document.getElementById("google")?.addEventListener("click", googleLogin);

// =============== Forgot Password ===============

const forgotPassword = async (e) => {
    e.preventDefault();
    try {
        const email = document.getElementById("email").value;
        if (!email) {
            alert("Please enter your email first.");
            return;
        }
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
        alert("Password reset email sent. Please check your inbox/spam folder.");
    } catch (error) {
        console.error("Error sending password reset email:", error.code, error.message);
        alert("Error sending password reset email: " + error.message);
    }
};
document.getElementById("forgotPassword")?.addEventListener("click", forgotPassword);