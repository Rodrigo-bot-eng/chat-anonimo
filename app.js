import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Certifique-se de que a instância 'db' é importada corretamente.
import { db } from "./firebase.js";

// --- Envolver o código principal na função DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Obtenção dos elementos DOM deve ocorrer aqui
    const form = document.getElementById("askForm");
    const input = document.getElementById("questionInput");
    const list = document.getElementById("questionsList");

    // Adiciona uma verificação de segurança caso um elemento não seja encontrado
    if (!form || !input || !list) {
        console.error("Erro: Um ou mais elementos DOM não foram encontrados. Verifique o HTML.");
        return;
    }

    // 1. Enviar pergunta
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        try {
            // A chamada collection(db, "questions") agora está protegida
            await addDoc(collection(db, "questions"), {
                text,
                createdAt: serverTimestamp()
            });

            input.value = "";
        } catch (error) {
            console.error("Erro ao adicionar documento ao Firestore:", error);
            // Mostrar uma mensagem de erro na UI em vez de apenas no console
            alert("Não foi possível enviar a pergunta. Verifique sua conexão ou as regras do Firestore.");
        }
    });

    // 2. Listar perguntas em tempo real
    try {
        const q = query(
            collection(db, "questions"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            list.innerHTML = "";

            snapshot.forEach((doc) => {
                const li = document.createElement("li");
                
                // Formatação simples para melhor visualização
                li.className = "p-3 bg-white shadow-md rounded-lg mb-2"; 
                
                li.textContent = doc.data().text;
                list.appendChild(li);
            });
        }, (error) => {
             console.error("Erro ao receber updates do Firestore:", error);
             alert("Não foi possível carregar as perguntas recentes.");
        });

    } catch (error) {
        console.error("Erro na configuração do query do Firestore:", error);
    }
});

// AQUI ESTÁ SEU ARQUIVO firebase.js (apenas para referência, não precisa ser alterado)
/*
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ... config ...
const firebaseConfig = { ... };

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

