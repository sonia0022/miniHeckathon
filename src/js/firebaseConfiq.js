import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signOut, sendPasswordResetEmail, signInWithPopup, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, deleteDoc, serverTimestamp, onSnapshot, collection, query, where, getDocs, orderBy, updateDoc, limit, startAfter } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUovf8vPvSLYnWxCyclQs7Z6Ls7eMGvyQ",
    authDomain: "miniheckathon-f3c8f.firebaseapp.com",
    projectId: "miniheckathon-f3c8f",
    storageBucket: "miniheckathon-f3c8f.firebasestorage.app",
    messagingSenderId: "720997768596",
    appId: "1:720997768596:web:bd57c8f9478dd18be64381"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);  // not getFirestore()
export{app , getAuth , auth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , GoogleAuthProvider, signOut , signInWithPopup ,  sendPasswordResetEmail  ,  getFirestore, doc, setDoc, getDoc ,serverTimestamp ,onSnapshot , addDoc ,collection ,  query, where,getDocs, updatePassword, reauthenticateWithCredential, EmailAuthProvider, orderBy , deleteDoc , updateDoc ,limit , startAfter ,db}
