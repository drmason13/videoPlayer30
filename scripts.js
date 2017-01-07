/* DOM Targets */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Functions */
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►': '❚ ❚';
  toggle.textContent = icon;
}

function skip(amount) {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
  if (!e.buttons) return;
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  // go full-screen
  if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
  }
}

/* Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', toggleFullscreen);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => {
  if (!e.buttons) return;
  scrub(e) });

skipButtons.forEach(button => {
  button.addEventListener('click', skip); });
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate); });
