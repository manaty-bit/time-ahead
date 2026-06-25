const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const restartBtn = document.getElementById("restartBtn");

const startScreen = document.getElementById("startScreen");
const clockScreen = document.getElementById("clockScreen");
const resultScreen = document.getElementById("resultScreen");

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");

const reclaimedTime = document.getElementById("reclaimedTime");

let realStartTime;
let virtualStartTime;
let timerId;

const speed = 1.5;

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    clockScreen.classList.remove("hidden");

    realStartTime = Date.now();
    virtualStartTime = new Date();

    updateClock();
    timerId = setInterval(updateClock, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);

    const realElapsed = Date.now() - realStartTime;
    const virtualElapsed = realElapsed * speed;
    const gainedTime = virtualElapsed - realElapsed;

    const gainedMinutes = Math.floor(gainedTime / 1000 / 60);

    reclaimedTime.textContent = `+${gainedMinutes} min`;

    clockScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});

restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

function updateClock() {
    const realElapsed = Date.now() - realStartTime;
    const virtualElapsed = realElapsed * speed;

    const virtualNow = new Date(virtualStartTime.getTime() + virtualElapsed);

    const hours = virtualNow.getHours() % 12;
    const minutes = virtualNow.getMinutes();
    const seconds = virtualNow.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
    const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90;

    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
}