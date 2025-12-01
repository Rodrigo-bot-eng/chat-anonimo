import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

// ---- IMPORT para Realtime Database (contador online)
import {
    getDatabase,
    ref,
    onDisconnect,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("askForm");
    const input = document.getElementById("questionInput");
    const list = document.getElementById("questionsList");

    // Contador online (onde vai aparecer)
    const onlineBox = document.getElementById("onlineCounter");

    // ============================
    //     0 — CONTADOR ONLINE (CORRIGIDO)
    // ============================

    // Garante que cada visitante só tenha 1 ID (mesmo recarregando a página)
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
        visitorId = "user_" + Math.random().toString(36).slice(2);
        localStorage.setItem("visitorId", visitorId);
    }

    const rtdb = getDatabase();
    const userRef = ref(rtdb, "online/" + visitorId);

    // Marca usuário como online
    set(userRef, {
        online: true,
        timestamp: Date.now()
    });

    // Remove quando usuário sai
    onDisconnect(userRef).remove();

    // Atualiza contador
    const totalRef = ref(rtdb, "online");
    onValue(totalRef, (snapshot) => {
        const data = snapshot.val();
        const count = data ? Object.keys(data).length : 0;

        if (onlineBox) {
            onlineBox.textContent = `👤 ${count} online`;
        }
    });

    // ============================
    //      1 — ENVIAR PERGUNTA
    // ============================
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
            console.error("Erro ao adicionar documento:", error);
            alert("Não foi possível enviar a pergunta.");
        }
    });

    // ============================
    //      2 — LISTAR PERGUNTAS
    // ============================
    try {
        const q = query(
            collection(db, "questions"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(
            q,
            (snapshot) => {
                list.innerHTML = "";
                snapshot.forEach((doc) => {
                    const li = document.createElement("li");
                    li.className =
                        "p-3 bg-white shadow-md rounded-lg mb-2";
                    li.textContent = doc.data().text;
                    list.appendChild(li);
                });
            },
            (error) => {
                console.error("Erro ao receber updates:", error);
                alert("Não foi possível carregar perguntas.");
            }
        );
    } catch (error) {
        console.error("Erro no Firestore:", error);
    }
});
