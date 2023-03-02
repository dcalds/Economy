import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBbOxfSE8JAt14M5XVHbDA1R2oIhLA5H_o",
    authDomain: "economy-7ba07.firebaseapp.com",
    projectId: "economy-7ba07",
    storageBucket: "economy-7ba07.appspot.com",
    messagingSenderId: "9740745398",
    appId: "1:9740745398:web:daa89ae78821bc7c1f8417",
    measurementId: "G-YEJK2JGN8D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);