import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0VbPYiHIudIm7uiOld0a3bqsnx6oT3SY",
    authDomain: "medical-academy-89b12.firebaseapp.com",
    projectId: "medical-academy-89b12",
    storageBucket: "medical-academy-89b12.firebasestorage.app",
    messagingSenderId: "214326053138",
    appId: "1:214326053138:web:57c05c73173d1278e30bcb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);
const db = getFirestore(app);
const storage = getStorage(app);

// 🚀 هذا السطر يتيح لباقي الملفات استخدام الـ Database والـ Auth
export { app, auth, db, storage };