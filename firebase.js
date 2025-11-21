import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
    getDatabase, 
    ref, 
    onDisconnect, 
    set 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// CONFIG do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyD9xAD0aahy0e3FJOcXXDb6lQy10nQZ45g",
    authDomain: "chat-anonimo-fbe41.firebaseapp.com",
    projectId: "chat-anonimo-fbe41",
    storageBucket: "chat-anonimo-fbe41.firebasestorage.app",
    messagingSenderId: "568352252762",
    appId: "1:568352252762:web:735f6eb009839f23c3c963",
    measurementId: "G-0HGPG6VEJE",
    databaseURL: "https://chat-anonimo-fbe41-default-rtdb.firebaseio.com" // IMPORTANTE!
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Firestore (perguntas)
export const db = getFirestore(app);

// Realtime Database (usuários online)
export const rtdb = getDatabase(app);

// -------------------------
// SISTEMA DE USUÁRIOS ONLINE
// -------------------------

// cria um id único p/ cada visitante
const userId = "user_" + Math.random().toString(36).substring(2);

// caminho onde o usuário será registrado
const userStatusRef = ref(rtdb, "online/" + userId);

// marca como ONLINE
set(userStatusRef, true);

// quando ele sair da página → remover do banco
onDisconnect(userStatusRef).remove();
