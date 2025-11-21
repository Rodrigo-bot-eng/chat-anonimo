import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("askForm");
    const input = document.getElementById("questionInput");
    const list = document.getElementById("questionsList");

    if (!form || !input || !list) {
        console.error("Erro: Um ou mais elementos DOM não foram encontrados.");
        return;
    }

    // 1. Enviar pergunta
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        try {
            await addDoc(collection(db, "questions"), {
                text,
                createdAt: serverTimestamp()
            });
            input.value = "";
        } catch (error) {
            console.error("Erro ao adicionar documento ao Firestore:", error);
            alert("Não foi possível enviar a pergunta.");
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