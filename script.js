// Печатающийся текст
const text = "Я сделал этот сайт, потому что ты — самое важное в моей жизни ❤️";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// Музыка + старт
function startExperience() {
  document.getElementById("bgMusic").play();
  document.getElementById("reasons").scrollIntoView({ behavior: "smooth" });
}

// Счётчик отношений
const startDate = new Date("2025-07-07");
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("loveTimer").innerText =
    `${days} дней ${hours} часов ${minutes} минут вместе 💕`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Финальное письмо
function showFinal() {
  document.getElementById("finalText").innerText =
    "Зайчонок, спасибо, что ты есть. Каждый день рядом с тобой — подарок. Я люблю тебя бесконечно ❤️";
}

// Появление секций при скролле
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

// Фоновые сердечки
function createHeart() {
  const heart = document.createElement("span");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 300);

// Сердечки при касании
document.addEventListener("touchstart", e => {
  createTouchHeart(e.touches[0].clientX, e.touches[0].clientY);
});
document.addEventListener("click", e => {
  createTouchHeart(e.clientX, e.clientY);
});

function createTouchHeart(x, y) {
  const heart = document.createElement("span");
  heart.innerHTML = "💗";
  heart.style.position = "fixed";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = "20px";
  heart.style.pointerEvents = "none";
  heart.style.animation = "floatUp 2s ease-out forwards";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

// 📸 Автозагрузка галереи
let currentIndex = 0;
const gallery = document.getElementById("gallery");
let images = [];

fetch("images.json")
  .then(res => res.json())
  .then(files => {
    images = files;

    files.forEach(file => {
      const img = document.createElement("img");
      img.src = `images/${file}`;
      gallery.appendChild(img);
    });
  });

// Свайп
let startX = 0;

gallery.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

gallery.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
});

function handleSwipe(diff) {
  if (diff < -50 && currentIndex < images.length - 1) currentIndex++;
  if (diff > 50 && currentIndex > 0) currentIndex--;
  updateGallery();
}

function updateGallery() {
  gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
}
