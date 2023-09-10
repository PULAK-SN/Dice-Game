'use strict';

// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;


const init = function(){
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();

const swithPlayer = function(){
    // switch the player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore=0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
// rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        const dice = Math.trunc(Math.random()*6+1);

        diceEl.src = `dice-${dice}.png`;    // templete literal

        diceEl.classList.remove('hidden');

        if(dice!==1){
            // add score to the current score
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;

        }else{
            // switch the player
            swithPlayer();
        }
    }
});


btnHold.addEventListener('click', function(){
    if(playing){
        // add current score to the active player score
        score[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // if player's score >=100, game finish
        if(score[activePlayer] >= 100){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            playing = false;
            diceEl.classList.add('hidden');
        } else {
            // switch to the next player
            swithPlayer();
        }
    } 
});

btnNew.addEventListener('click',init);