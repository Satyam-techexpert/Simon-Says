

let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let allBtns = document.querySelectorAll(".btn");
let btns = ["red", "yellow", "blue", "green"];
let h2 = document.querySelector("h2");
let resetBtn = document.querySelector(".reset");
let startBtn = document.querySelector(".start");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("high-score");
let highScore = Number(highScoreDisplay.innerText) || 0;


startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let rndIdx = Math.floor(Math.random() * btns.length);
    let rndCol = btns[rndIdx];

    gameSeq.push(rndCol);

    let rndBtn = document.querySelector(`.${rndCol}`);
    btnFlash(rndBtn);
}

for (let btn of allBtns) {
    btn.addEventListener("click", function () {
        if (!started) return;

        let userColor = btns.find(color =>
            this.classList.contains(color)
        );

        if (!userColor) return;

        userSeq.push(userColor);
        btnFlash(this);

        checkAnswer(userSeq.length - 1);
    });
}


function checkAnswer(idx) {
    if (gameSeq[idx] === userSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            scoreDisplay.innerText = level;

            if (level > highScore) {
                highScore = level;
                highScoreDisplay.innerText = highScore;
            }

            setTimeout(function () {
                if (started) {
                    levelUp();
                }
            }, 1000);
        }

    } else {
        h2.innerHTML =
            `Game Over! Your score was <b>${level - 1}</b>.`;

        restartGame();
    }
}


resetBtn.addEventListener("click", function () {
    h2.innerText = "Press the button to start";
     started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    highScore = Number(highScoreDisplay.innerText) || 0;
    highScoreDisplay.innerText = 0;
    scoreDisplay.innerText = 0;
});


function restartGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    highScore = Number(highScoreDisplay.innerText) || 0;
    scoreDisplay.innerText = 0;
}

let infoMessage = document.querySelector("#info-message");
let closeInfo = document.querySelector("#close-info");

info.addEventListener("click", function () {
    infoMessage.classList.toggle("hidden");
});

closeInfo.addEventListener("click", function () {
    infoMessage.classList.add("hidden");
});

