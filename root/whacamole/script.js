const squares = document.querySelectorAll('.square');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const mole = document.querySelector('.mole');

let result = 0;
let timerId = null;
let hitPosition;
let currentTime = 10;

const randomSquare = () => {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomNum = squares[Math.floor(Math.random() * 9)];
    randomNum.classList.add('mole');

    hitPosition = randomNum.id;
}

squares.forEach(square => {
    square.addEventListener('mouseover', () => {
        if(square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

const countMole = () => {
    timerId = setInterval(randomSquare, 500);
}

countMole();

const countDown = () => {
    currentTime--;
    time.textContent = currentTime;

    if(currentTime == 0) {
        clearInterval(countDownTimer);
        clearInterval(timerId);
        alert(`Your score is ${result}`);
    }
}

let countDownTimer = setInterval(countDown, 1000);