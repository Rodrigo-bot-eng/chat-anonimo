/* ==================================================
   🔊 ATIVAR ÁUDIO DO VÍDEO AO CLICAR
   ================================================== */
const video = document.getElementById("bgVideo");

function ativarAudio() {
  if (!video) return;

  video.muted = false;
  video.volume = 0.25; // volume acessível
  video.play().catch(() => {});

  document.removeEventListener("click", ativarAudio);
  document.removeEventListener("touchstart", ativarAudio);
}

document.addEventListener("click", ativarAudio);
document.addEventListener("touchstart", ativarAudio);


/* ==================================================
   📋 COPIAR CHAVE PIX
   ================================================== */
function copiarPix() {
  const pixEl = document.getElementById("pixKey");
  const msg = document.getElementById("copyMsg");

  if (!pixEl) return;

  navigator.clipboard.writeText(pixEl.innerText).then(() => {
    if (msg) {
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 3000);
    }
  });
}


/* ==================================================
   ⏳ TIMER DE 10 MINUTOS
   ================================================== */
let tempo = 10 * 60; // 10 minutos
const timeEl = document.getElementById("time");

const contador = setInterval(() => {
  if (!timeEl) return;

  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  timeEl.innerText =
    `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  if (tempo <= 0) {
    clearInterval(contador);
    timeEl.innerText = "00:00";
  }

  tempo--;
}, 1000);


/* ==================================================
   ✅ SIMULA IDENTIFICAÇÃO DO PAGAMENTO (APÓS 3 MIN)
   NÃO PEDE SENHA — SOMENTE E-MAIL (SEGURO)
   ================================================== */
setTimeout(() => {
  const checkout = document.querySelector(".checkout");
  if (!checkout) return;

  const approvalBox = document.createElement("div");
  approvalBox.className = "approval-box";

  approvalBox.innerHTML = `
    <h3>✅ Pagamento identificado</h3>
    <p>
      Estamos finalizando seu acesso.<br>
      Informe seu e-mail para receber seu site profissional exclusivo.
    </p>

    <input 
      type="email" 
      id="emailEntrega"
      placeholder="Digite seu melhor e-mail"
    >

    <button onclick="confirmarEntrega()">
      Receber meu acesso 🚀
    </button>

    <small>
      O acesso será enviado automaticamente após a confirmação.
    </small>
  `;

  checkout.appendChild(approvalBox);
}, 3 * 60 * 1000); // 3 minutos


/* ==================================================
   📧 CONFIRMAÇÃO DE ENTREGA
   ================================================== */
function confirmarEntrega() {
  const email = document.getElementById("emailEntrega");

  if (!email || !email.value.includes("@")) {
    alert("Digite um e-mail válido para receber o acesso.");
    return;
  }

  alert(
    "✅ Pronto!\n\n" +
    "Seu acesso será enviado para:\n" +
    email.value
  );
}
