
let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let allBtns = document.querySelectorAll(".btn");
let btns = ["red", "yellow", "blue", "green"];
let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    console.log("Key pressed!");
    if (started == false) {
        console.log("Game started!");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    console.log("Button flashed! added");
    setTimeout(function () {
        btn.classList.remove("flash");
        console.log("Button flashed! removed");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${level}`;

    let rndIdx = Math.floor(Math.random() * 4);
    let rndCol = btns[rndIdx];

    gameSeq.push(rndCol);
    console.log(gameSeq);
    let rndBtn = document.querySelector(`.${rndCol}`);
    btnFlash(rndBtn);
}



for (let btn of allBtns) {
    btn.addEventListener("click", function () {
        if (!started) return;

        let userBtn = this;
        let userColor = userBtn.classList[1];
        console.log(`User clicked ${userColor}`);
        userSeq.push(userColor);
        btnFlash(userBtn);
        console.log(userSeq);
        checkAnswer(userSeq.length - 1);
    });
}

function checkAnswer(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(function () {
                levelUp();
                console.log("Level up!");
            }, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerHTML = `Game Over! Your score was<b> ${level - 1}.</b> <br> Press any key to restart.`;

        resetGame();
    }
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
