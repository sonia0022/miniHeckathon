
import {
    auth,
    onAuthStateChanged,
    doc,
    onSnapshot,
    db,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    deleteDoc
} from "./firebaseConfiq.js";

document.addEventListener("DOMContentLoaded", () => {
    const userImage = document.getElementById("userImage");
    const userId = document.querySelector("#userId");
    const userEmail = document.getElementById("userEmail");
    const userRole = document.getElementById("userRole");
    const userPhone = document.getElementById("userPhone");
    const userGender = document.getElementById("userGender");

    const blogContainer = document.getElementById("blogContainer");






    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);

            onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    userId.textContent = userData?.name || "No Name";
                    userEmail.textContent = userData?.email || user.email;
                    userRole.textContent = userData?.role || "User";
                    userPhone.textContent = userData?.phone || "0000-0000000";
                    userGender.textContent = userData?.gender || "other";
                    userImage.src = userData?.profile_pic || "";

                    // fetchUserBlogs(user.uid, userData);
                } else {
                    console.log("User data not found in Firestore.");
                    blogContainer.innerHTML = "<p>Please log in to see your blogs.</p>";
                }
            });
        } else {
            console.log("User is not logged in.");
        }
    });
});