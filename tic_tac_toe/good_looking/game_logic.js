let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let WinnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

console.log(boxes);

const O_CHARACTER = "O";
const X_CHARACTER = "X";
let current_player = X_CHARACTER;
let spaces = Array(9).fill(null);

// Add a variable to track if the game has ended
let gameEnded = false;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && !gameEnded) {
    spaces[id] = current_player;
    e.target.innerText = current_player;

    if (player_has_won() !== false) {
      playerText.innerText = `${current_player} has won!`;
      let winning_blocks = player_has_won();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = WinnerIndicator)
      );

      // Set the game as ended
      gameEnded = true;

      return;
    }

    current_player = current_player == X_CHARACTER ? O_CHARACTER : X_CHARACTER;
  }
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerHTML = " ";
    box.style.backgroundColor = "";
  });

  playerText.innerText = "Tic Tac Toe";

  current_player = X_CHARACTER;
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function player_has_won() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

startGame();
