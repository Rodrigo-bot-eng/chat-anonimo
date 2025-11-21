// app.js
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

const form = document.getElementById("askForm");
const input = document.getElementById("questionInput");
const list = document.getElementById("questionsList");

// Enviar pergunta
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    await addDoc(collection(db, "questions"), {
        text,
        createdAt: serverTimestamp()
    });

    input.value = "";
});

// Listar perguntas em tempo real
const q = query(
    collection(db, "questions"),
    orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    snapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        list.appendChild(li);
    });
});
