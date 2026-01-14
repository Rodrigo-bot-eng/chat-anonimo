// 🔊 ATIVAR ÁUDIO AO CLICAR
const video = document.getElementById("bgVideo");

function ativarAudio() {
  video.muted = false;
  video.volume = 0.25;
  video.play().catch(() => {});
  document.removeEventListener("click", ativarAudio);
  document.removeEventListener("touchstart", ativarAudio);
}

document.addEventListener("click", ativarAudio);
document.addEventListener("touchstart", ativarAudio);

// 📋 COPIAR PIX
function copiarPix() {
  const pix = document.getElementById("pixKey").innerText;
  navigator.clipboard.writeText(pix);

  document.getElementById("copyMsg").classList.add("show");
}

// ⏳ TIMER 10 MINUTOS
let tempo = 10 * 60; // 10 minutos em segundos
const timeEl = document.getElementById("time");
const timerBox = document.getElementById("timerBox");

const contador = setInterval(() => {
  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  timeEl.innerText =
    `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  if (tempo <= 0) {
    clearInterval(contador);
    timerBox.innerHTML = "⛔ Tempo esgotado. Gere um novo pagamento.";
    timerBox.style.color = "#ff6b6b";
  }

  tempo--;
}, 1000);
