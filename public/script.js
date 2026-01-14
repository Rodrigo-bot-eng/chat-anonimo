const names = [
  "Rodrigo",
  "Ana Beatriz",
  "Carlos",
  "Mariana",
  "Lucas",
  "Fernanda",
  "João",
  "Paula",
  "Rafael",
  "Camila"
];

const notification = document.getElementById("purchaseNotification");
const buyerName = document.getElementById("buyerName");

function showNotification() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  buyerName.textContent = randomName;

  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hidden");
  }, 4000);
}

// começa após 5s e repete a cada 10s
setTimeout(() => {
  showNotification();
  setInterval(showNotification, 10000);
}, 5000);
