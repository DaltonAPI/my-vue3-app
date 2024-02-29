import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyA5rUE_Qe4-RFWfAYLfK4fMdtfIRw0-0v8",
    authDomain: "reminder-app-a3d94.firebaseapp.com",
    projectId: "reminder-app-a3d94",
    storageBucket: "reminder-app-a3d94.appspot.com",
    messagingSenderId: "460231822490",
    appId: "1:460231822490:web:6784b7b4353f159837e323",
    measurementId: "G-3HDJ69FHCL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
