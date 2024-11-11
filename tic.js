document.addEventListener("DOMContentLoaded", () => {
    const playerForm = document.getElementById("playerForm");
    const gameSection = document.getElementById("gameSection");
    const startButton = document.getElementById("startButton");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    const exitButton = document.getElementById("exitButton");

    let currentPlayer = 1;
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let playerNames = ["", ""];

    startButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();
        
        if (player1Name && player2Name) {
            playerNames[0] = player1Name;
            playerNames[1] = player2Name;
            playerForm.classList.add("hidden");
            gameSection.classList.remove("hidden");
            updateStatus();
        } else {
            alert("Please enter names for both players.");
        }
    });

    const renderBoard = () => {
        board.innerHTML = "";
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            cellElement.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    };

    const handleCellClick = (index) => {
        if (boardState[index] === "" && !checkWinner()) {
            boardState[index] = currentPlayer === 1 ? "X" : "O";
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            renderBoard();
            updateStatus();
        }
    };

    const updateStatus = () => {
        if (checkWinner()) {
            status.textContent = `${playerNames[currentPlayer - 1]} wins!`;
        } else if (boardState.every((cell) => cell !== "")) {
            status.textContent = "It's a draw!";
        } else {
            status.textContent = `Current player: ${playerNames[currentPlayer - 1]}`;
        }
    };

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningConditions.some(([a, b, c]) => {
            return boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const resetGame = () => {
        currentPlayer = 1;
        boardState = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        updateStatus();
    };

    resetButton.addEventListener("click", resetGame);

    exitButton.addEventListener("click", () => {
        playerForm.classList.remove("hidden");
        gameSection.classList.add("hidden");
        player1Input.value = "";
        player2Input.value = "";
    });

    // Initial render
    renderBoard();
});
