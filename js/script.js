document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".game-board");
    const context = board.getContext("2d");
    const boardHeight = board.offsetHeight;
    const boardWidth = board.offsetWidth;

    const scoreText = document.querySelector("#score");

    let running = false;
    let xVelocity = 25;
    let yVelocity = 0;

    let foodX;
    let foodY;

    let score = 0;

    let snake = [
        {
            x: 0,
            y: 0,
        },
    ];
});
