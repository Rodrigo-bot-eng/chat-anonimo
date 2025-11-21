// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIG do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyD9xAD0aahy0e3FJOcXXDb6lQy10nQZ45g",
    authDomain: "chat-anonimo-fbe41.firebaseapp.com",
    projectId: "chat-anonimo-fbe41",
    storageBucket: "chat-anonimo-fbe41.firebasestorage.app",
    messagingSenderId: "568352252762",
    appId: "1:568352252762:web:735f6eb009839f23c3c963",
    measurementId: "G-0HGPG6VEJE"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);
