const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//songs title
const songs = ['Hey', 'Ukulele', 'Prernu'];

//keep track of song

let songIndex = 2;

//initially load song details

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
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

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const audioElement = e.target; // or e.srcElement
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  const duration = audio.duration;
  console.log(duration);
  audio.currentTime = (clickX / width) * duration;
}

function init() {
  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  audio.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);
}
init();
