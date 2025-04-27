import { auth, onAuthStateChanged, doc, setDoc, serverTimestamp, onSnapshot, db } from "./firebaseConfiq.js";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dyrvpyc8f/image/upload";
const cloudinaryUploadPreset = "praticeCloudinary";

document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.querySelector("form");
    const profilePicInput = document.getElementById("profilePic");
    const imagePreview = document.getElementById("profileImage");

    if (!profileForm) {
        console.error("Profile form not found!");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);

            onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    document.getElementById("email").value = userData?.email || user.email;
                    document.getElementById("fullName").value = userData?.name || '';
                    document.getElementById("phone").value = userData?.phone || '';
                    document.getElementById("gender").value = userData?.gender || '';
                    imagePreview.src = userData?.profile_pic || "";
                } else {
                    console.log("No user data found. Creating new document...");
                    setDoc(userRef, {
                        uid: user.uid,
                        email: user.email,
                        name: "",
                        phone: "",
                        gender: "",
                        role: "",
                        profile_pic: "",
                        createdAt: serverTimestamp()
                    });
                }
            });
        } else {
            console.error("User is not logged in.");
        }
    });

    profilePicInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const gender = document.getElementById("gender").value;

        const file = profilePicInput.files[0];

        const user = auth.currentUser;
        if (!user) {
            alert("No authenticated user found. Please login again.");
            return;
        }

        let imageUrl = imagePreview.src; // Default: existing image URL

        if (file) {
            imageUrl = await uploadImageToCloudinary(file);
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                email,
                phone,
                gender,
                profile_pic: imageUrl,
                updatedAt: serverTimestamp()
            }, { merge: true });

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again later.");
        }
    });
});

async function uploadImageToCloudinary(file) {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);

    try {
        const response = await fetch(cloudinaryUploadUrl, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error("Upload failed");
        }
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        alert("Image upload failed. Please try again!");
        return "";
    }
}
