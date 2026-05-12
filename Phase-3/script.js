const gameBoard = document.getElementById("gameBoard");
const movesCount = document.getElementById("movesCount");
const scoreCount = document.getElementById("scoreCount");
const matchesCount = document.getElementById("matchesCount");
const feedbackText = document.getElementById("feedbackText");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");

const symbols = ["🦁", "🥁", "⚽", "🐟", "🌍", "🥭"];

let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let matchedPairs = 0;
let moves = 0;
let score = 100;

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

  if (!firstCard) {
    firstCard = this;
    feedbackText.textContent = "Choisissez une deuxième carte";
    return;
  }

  secondCard = this;
  lockBoard = true;

  moves++;
  updateScore();

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

  feedbackText.textContent = "Bonne paire ! Continuez.";
  resetSelectedCards();
  checkGameOver();
}

function handleUnmatchedCards() {
  feedbackText.textContent = "Pas de correspondance. Réessayez.";

  setTimeout(function() {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetSelectedCards();
  }, 900);
}

function updateScore() {
  score = Math.max(0, 100 - (moves - matchedPairs) * 5);

  movesCount.textContent = moves;
  scoreCount.textContent = score;

  updateFeedback();
}

function updateFeedback() {
  if (moves <= 6) {
    feedbackText.textContent = "Excellent départ !";
  } else if (moves <= 10) {
    feedbackText.textContent = "Bonne performance.";
  } else if (moves <= 15) {
    feedbackText.textContent = "Continuez, vous progressez.";
  } else {
    feedbackText.textContent = "Essayez de réduire vos mouvements.";
  }
}

function resetSelectedCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkGameOver() {
  if (matchedPairs === symbols.length) {
    message.hidden = false;

    if (moves <= 8) {
      message.textContent = `Bravo ! Vous avez gagné en ${moves} mouvements avec un score de ${score}. Performance excellente.`;
    } else if (moves <= 12) {
      message.textContent = `Bravo ! Vous avez gagné en ${moves} mouvements avec un score de ${score}. Bonne performance.`;
    } else {
      message.textContent = `Bravo ! Vous avez gagné en ${moves} mouvements avec un score de ${score}. Vous pouvez essayer de faire mieux.`;
    }

    feedbackText.textContent = "Partie terminée";
  }
}

function restartGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  matchedPairs = 0;
  moves = 0;
  score = 100;

  movesCount.textContent = "0";
  scoreCount.textContent = "100";
  matchesCount.textContent = "0";
  feedbackText.textContent = "Commencez la partie";
  message.hidden = true;
  message.textContent = "";

  createGameBoard();
}

restartBtn.addEventListener("click", restartGame);

restartGame();