'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    //Generate random number for dice
    const dice = Math.trunc(Math.random() * 6 + 1);

    //Display the generated dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice > 1) {
      //update current score
      currentScore = currentScore + dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    //update score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    //update score on the user interface
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore;
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER';
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  diceEl.classList.remove('hidden');
  document.querySelector(`#name--0`).textContent = 'PLAYER 1';
  document.querySelector(`#name--1`).textContent = 'PLAYER 2';
  playing = true;
});
