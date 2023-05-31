const words = ["cat", "phone", "sound", "rabbit", "house"];

let score = 0;
let currentIndex = 0;
let scoreCorrect = 0;
let scoreIncorrect = 0;
let scoreFinal = 10;
let correctWords = [];
let incorrectWords = [];

const startBtn = document.getElementById("start-btn");
const userInput = document.getElementById("user-input");
const correctWordsTable = document.getElementById("correct-words");
const incorrectWordsTable = document.getElementById("incorrect-words");
const scoreDisplay = document.getElementById("score");

const scoreCorrectLabel = document.getElementById("score-correct");
const scoreIncorrectLabel = document.getElementById("score-incorrect");

const correctTabla = document.getElementById("table-correct");
const incorrectTabla = document.getElementById("table-incorrect");

const feedbackLabel = document.getElementById("feedback");
const printBtn = document.getElementById("print-btn");
const restartBtn = document.getElementById("restart-btn");

function startRecognition() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = checkPronunciation;

  feedbackLabel.textContent = "Pronounce the word: " + words[currentIndex];
  feedbackLabel.style.color = "black";
  feedbackLabel.style.fontSize = "20px";
  recognition.start();
}

startBtn.addEventListener("click", startRecognition);

function checkPronunciation(event) {
  const spokenWord =
    event.results[event.results.length - 1][0].transcript.toLowerCase();
  userInput.value = spokenWord;
  const currentWord = words[currentIndex].toLowerCase();

  if (spokenWord === currentWord) {
    score += 2;
    scoreCorrect += 2;
    scoreDisplay.innerText = score;
    correctWords.push(spokenWord);
    const newRow = document.createElement("tr");
    const wordCell = document.createElement("td");
    wordCell.innerText = spokenWord;
    newRow.appendChild(wordCell);
    const scoreCell = document.createElement("td");
    scoreCell.innerText = "2";
    scoreCell.classList.add("blue");
    newRow.appendChild(scoreCell);
    correctWordsTable.appendChild(newRow);
  } else {
    score += 0;
    scoreIncorrect += 2;
    scoreDisplay.innerText = score;
    incorrectWords.push(spokenWord);
    const newRow = document.createElement("tr");
    const wordCell = document.createElement("td");
    wordCell.innerText = spokenWord;
    newRow.appendChild(wordCell);
    const scoreCell = document.createElement("td");
    scoreCell.innerText = "2";
    scoreCell.classList.add("red");
    newRow.appendChild(scoreCell);
    incorrectWordsTable.appendChild(newRow);
  }

  currentIndex++;
  scoreCorrectLabel.textContent = scoreCorrect;
  scoreIncorrectLabel.textContent = scoreIncorrect;
  if (currentIndex < words.length) {
    startRecognition();
  } else {
    scoreDisplay.style.fontSize = "20px";
    feedbackLabel.textContent = `Your total score is : ${
      scoreFinal - scoreIncorrect
    }`;

    feedbackLabel.style.fontSize = "20px";
    startBtn.disabled = true;
    userInput.value = "";
    if (correctWords.length + incorrectWords.length === words.length) {
      printBtn.style.display = "block";
      userInput.style.display = "none";
      startBtn.style.display = "none";
      restartBtn.style.display = "block";
    }
  }
}

//Imprimir
function printPage() {
  const name = prompt("Please enter your name:");
  if (name) {
    const greeting = document.createElement("p");
    greeting.textContent = `Resultados de: ${name}!`;
    document.body.appendChild(greeting);
    window.print();
    document.body.removeChild(greeting);
  }
}

restartBtn.addEventListener("click", function () {
  // Recarga la página
  location.reload();
});
