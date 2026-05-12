const gameBoard = document.getElementById("gameBoard");
const matchesCount = document.getElementById("matchesCount");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");

const symbols = ["🦁", "🥁", "⚽", "🐟", "🌍", "🥭"];

let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
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

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">?</div>
      <div class="card-face card-front">${symbol}</div>
    </div>
  `;

  card.addEventListener("click", handleCardClick);

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
}

function handleCardClick() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("flipped");
  statusText.textContent = "Carte retournée";

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const firstSymbol = firstCard.dataset.symbol;
  const secondSymbol = secondCard.dataset.symbol;

  if (firstSymbol === secondSymbol) {
    handleMatchedCards();
  } else {
    handleUnmatchedCards();
  }
}

function handleMatchedCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  firstCard.disabled = true;
  secondCard.disabled = true;

  matchedPairs++;
  matchesCount.textContent = matchedPairs;
  statusText.textContent = "Paire trouvée !";

  resetSelectedCards();
  checkGameOver();
}

function handleUnmatchedCards() {
  statusText.textContent = "Pas de correspondance";

  setTimeout(function() {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetSelectedCards();
    statusText.textContent = "Essayez encore";
  }, 900);
}

function resetSelectedCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkGameOver() {
  if (matchedPairs === symbols.length) {
    message.hidden = false;
    message.textContent = "Bravo ! Toutes les paires ont été trouvées.";
    statusText.textContent = "Partie terminée";
  }
}

function restartGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;

  matchesCount.textContent = "0";
  statusText.textContent = "Cliquez sur une carte";
  message.hidden = true;
  message.textContent = "";

  createGameBoard();
}

restartBtn.addEventListener("click", restartGame);

restartGame();