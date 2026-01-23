import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAmuiusUxSrZ7ngBkkl5Sjd0Mzvr9ak9JM",
    authDomain: "newcomers-compass.firebaseapp.com",
    projectId: "newcomers-compass",
    storageBucket: "newcomers-compass.firebasestorage.app",
    messagingSenderId: "182663435298",
    appId: "1:182663435298:web:87ab4288d211abeca5e67b",
    measurementId: "G-NWK040V9YD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
