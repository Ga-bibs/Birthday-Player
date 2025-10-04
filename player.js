const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

let index = 0;
let isShuffling = false;
let isRepeating = false;

const playlist = [
  {
    title: "FRIENDS",
    artist: "Mig & Gib",
    src: "Friends - BTS (youtube).mp3",
    cover: "foto.jpg"
  },
//   {
//     title: "Música 2",
//     artist: "Outro Artista",
//     src: "musicas/musica2.mp3",
//     cover: "imagens/capa2.jpg"
//   },
//   {
//     title: "Música 3",
//     artist: "Banda Exemplo",
//     src: "musicas/musica3.mp3",
//     cover: "imagens/capa3.jpg"
//   }
];

// Carregar música
function loadMusic(i) {
  audio.src = playlist[i].src;
  title.textContent = playlist[i].title;
  artist.textContent = playlist[i].artist;
  cover.src = playlist[i].cover;
}
loadMusic(index);

// Play/Pause
playBtn.addEventListener("click", () => {
  if(audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "►";
  }
});

// Atualizar barra e tempo
audio.addEventListener("timeupdate", () => {
  if(audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;
    
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Alterar progresso manualmente
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Botões next/prev
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

function nextMusic() {
  if(isShuffling) {
    index = Math.floor(Math.random() * playlist.length);
  } else {
    index = (index + 1) % playlist.length;
  }
  loadMusic(index);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevMusic() {
  index = (index - 1 + playlist.length) % playlist.length;
  loadMusic(index);
  audio.play();
  playBtn.textContent = "⏸";
}

// Shuffle
shuffleBtn.addEventListener("click", () => {
  isShuffling = !isShuffling;
  shuffleBtn.style.color = isShuffling ? "#1db954" : "white";
});

// Repeat
repeatBtn.addEventListener("click", () => {
  isRepeating = !isRepeating;
  repeatBtn.style.color = isRepeating ? "#1db954" : "white";
});

// Quando música terminar
audio.addEventListener("ended", () => {
  if(isRepeating) {
    audio.play();
  } else {
    nextMusic();
  }
});
