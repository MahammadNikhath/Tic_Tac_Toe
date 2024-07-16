document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const newGameButton = document.getElementById("newGameButton");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", startNewGame);

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (gameBoard[cellIndex] !== "" || !gameActive) {
            return;
        }

        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            showResultScreen(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (!gameBoard.includes("")) {
            showResultScreen("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        messageElement.textContent = `It's ${currentPlayer}'s turn`;
    }

    function showResultScreen(message) {
        resultMessage.textContent = message;
        resultScreen.classList.remove("hidden");
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        messageElement.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    }

    function startNewGame() {
        resetGame();
        resultScreen.classList.add("hidden");
    }
});
