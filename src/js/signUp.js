
import { auth, createUserWithEmailAndPassword} from './firebaseConfiq.js'

// ========================================================================= *******Sign Up

document.addEventListener("DOMContentLoaded", () => {
    const signUp = document.querySelector("#signUpbtn");
    if (signUp) {
        signUp.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User Created:", userCredential.user);
                window.location = './home.html';
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.message);
            }
        });
    } else {
        console.error("SignUp button not found!");
    }
});

