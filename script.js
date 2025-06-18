let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let gameMode = null; // 'pvp' or 'cpu'

const statusDiv = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function setMode(mode) {
  gameMode = mode;
  resetGame();
  statusDiv.textContent = `Mode: ${mode === "pvp" ? "Player vs Player" : "Player vs Computer"} - X's Turn`;
  gameActive = true;
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `${currentPlayer}'s Turn`;

  if (gameMode === "cpu" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyCells = board
    .map((val, i) => (val === "" ? i : null))
    .filter((v) => v !== null);
  if (emptyCells.length === 0) return;

  let randIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randIndex);
}

function renderBoard() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelectorAll(".cell")[a].classList.add("win");
      document.querySelectorAll(".cell")[b].classList.add("win");
      document.querySelectorAll(".cell")[c].classList.add("win");
      return board[a];
    }
  }

  if (!board.includes("")) return "draw";
  return null;
}

function endGame(winner) {
  gameActive = false;
  if (winner === "draw") {
    statusDiv.textContent = "It's a Draw!";
  } else {
    statusDiv.textContent = `${winner} Wins!`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
  cells.forEach(cell => cell.classList.remove("win"));
  if (gameMode) {
    statusDiv.textContent = `Mode: ${gameMode === "pvp" ? "Player vs Player" : "Player vs Computer"} - X's Turn`;
  } else {
    statusDiv.textContent = "Select Game Mode";
    gameActive = false;
  }
}
