(async () => {
  console.log("Game Logic");

  let gameEnded = false;

  let restartBtn = document.getElementById("restartBtn");
  let title = document.getElementById("board_title");
  let boxes = Array.from(document.getElementsByClassName("box"));
  let spaces = Array(9).fill(null);

  const X_CHARACTER = "X";
  const O_CHARACTER = "O";

  let current_player = X_CHARACTER;

  restartBtn.addEventListener("click", restartBoard);

  boxes.forEach((box) => box.addEventListener("click", clickedBox));

  function clickedBox(e) {
    console.log(e.target.id);
    let id = e.target.id;

    if (spaces[id] === null && gameEnded === false) {
      spaces[id] = current_player;
      e.target.innerText = current_player;

      if (check_player_won() != false) {
        title.innerText = `${current_player} has won!`;

        console.log("player won!", check_player_won());

        // stop triggering addEventListener
        gameEnded = true;
      }

      current_player = (current_player === X_CHARACTER) ? O_CHARACTER : X_CHARACTER; // prettier-ignore
    }

    console.log(current_player);
  }

  let variations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function check_player_won() {
    for (const iteration of variations) {
      let [a, b, c] = iteration;

      if (spaces[a] && spaces[a] === spaces[b] && spaces[b] === spaces[c]) {
        return [a, b, c];
      }
    }
    return false;
  }

  function restartBoard() {
    spaces.fill(null);

    boxes.forEach((box) => {
      box.innerText = "";
    });

    title.innerText = "Tic Tac Toe";

    gameEnded = false;

    console.log("restart board!");
  }
})();
