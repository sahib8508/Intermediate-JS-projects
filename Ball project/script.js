const ball = document.getElementById('ball');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const reverse = document.getElementById('reverse');
const speedUp = document.getElementById('speed-up');
const speedDown = document.getElementById('speed-down');

const rollAnimation = [
  {
    transform: 'rotate(0deg) translate3D(-50%, -50%, 0)',
    color: 'white',
  },
  {
    color: 'blue',
    offset: 0.3,
  },
  {
    color: 'red',
    offset: 0.5,
  },
  {
    color: 'green',
    offset: 0.7,
  },
  {
    transform: 'rotate(360deg) translate3D(-50%, -50%, 0)',
    color: 'white',
  },
];

const rollOptions = {
  duration: 3000,
  iterations: Infinity,
};

const roll = ball.animate(rollAnimation, rollOptions);

play.addEventListener('click', () => {
  roll.playbackRate = 1;
  roll.play();
});

pause.addEventListener('click', () => {
  roll.pause();
});

reverse.addEventListener('click', () => {
  roll.reverse();
});
