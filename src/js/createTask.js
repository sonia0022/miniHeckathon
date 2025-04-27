
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






    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    userImage.src = user?.profile_pic || "";
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