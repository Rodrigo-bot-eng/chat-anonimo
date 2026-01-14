/* TIMER 10 MIN */
let time = 600;
const el = document.getElementById("time");

setInterval(() => {
  if (time <= 0) return;
  time--;
  const m = String(Math.floor(time / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  el.innerText = `${m}:${s}`;
}, 1000);

/* COPIAR PIX */
function copiarPix() {
  const chave = document.getElementById("pixKey").innerText;
  navigator.clipboard.writeText(chave).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.style.display = "block";
    setTimeout(() => msg.style.display = "none", 3000);
  });
}
