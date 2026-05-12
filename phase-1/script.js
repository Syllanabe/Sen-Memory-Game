const gameBoard = document.getElementById("gameBoard");
const cardCount = document.getElementById("cardCount");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const testWinBtn = document.getElementById("testWinBtn");
const message = document.getElementById("message");

const symbols = ["🦁", "🥁", "⚽", "🐟", "🌍", "🥭"];

let deck = [];
let matchedPairs = 0;

function shuffleCards(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporaryValue = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled;
}

function createCard(symbol, index) {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.dataset.symbol = symbol;
  card.dataset.index = index;

  const backFace = document.createElement("span");
  backFace.className = "card-face card-back";
  backFace.textContent = "?";

  const frontFace = document.createElement("span");
  frontFace.className = "card-face card-front";
  frontFace.textContent = symbol;

  card.appendChild(backFace);
  card.appendChild(frontFace);

  return card;
}

function createGameBoard() {
  const duplicatedSymbols = [...symbols, ...symbols];

  deck = shuffleCards(duplicatedSymbols);

  gameBoard.innerHTML = "";

  deck.forEach(function(symbol, index) {
    const card = createCard(symbol, index);
    gameBoard.appendChild(card);
  });

  cardCount.textContent = deck.length;
  statusText.textContent = "Plateau prêt";
}

function checkGameOver() {
  if (matchedPairs === symbols.length) {
    message.hidden = false;
    message.textContent = "Bravo ! Toutes les paires ont été trouvées.";
    statusText.textContent = "Partie terminée";
  }
}

function testGameOverCondition() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    card.classList.add("matched");
    card.disabled = true;
  });

  matchedPairs = symbols.length;
  checkGameOver();
}

function restartGame() {
  matchedPairs = 0;
  message.hidden = true;
  message.textContent = "";
  statusText.textContent = "Nouvelle partie";

  createGameBoard();
}

restartBtn.addEventListener("click", restartGame);
testWinBtn.addEventListener("click", testGameOverCondition);

restartGame();