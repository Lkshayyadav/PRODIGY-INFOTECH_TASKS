const grid = document.getElementById('grid');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

function renderBoard() {
  grid.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleMove(index));
    grid.appendChild(cell);
  });
}

function handleMove(index) {
  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    statusText.textContent = `🎉 ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combo => {
    const [a, b, c] = combo;
    return board[a] === currentPlayer &&
           board[b] === currentPlayer &&
           board[c] === currentPlayer;
  });
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Turn: ${currentPlayer}`;
  renderBoard();
}

restartBtn.addEventListener('click', resetGame);


renderBoard();
