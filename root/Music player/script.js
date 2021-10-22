const musicContainer = document.getElementById("audio-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["dream", "melody", "peace"];

// Keep track of song
let songIndex = 1;

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

window.onload = function () {
  // Initially load song details into DOM
  loadSong(songs[songIndex]);
};

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.removeChild(playBtn.childNodes[1]);

  playBtn.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
    `;

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.removeChild(playBtn.childNodes[1]);

  playBtn.innerHTML += `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-player-play"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#ffffff"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 4v16l13 -8z" />
  </svg>
    `;

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const {
    duration,
    currentTime
  } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);