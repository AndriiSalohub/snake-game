document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".game-board");
    const context = board.getContext("2d");
    const boardHeight = board.offsetHeight;
    const boardWidth = board.offsetWidth;

    const scoreText = document.querySelector("#score");

    const unitSize = 25;

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

    const createFood = () => {
        const randomFoodCords = (min, max) => {
            const randNumb =
                Math.round((Math.random() * (max - min) + min) / unitSize) *
                unitSize;
            return randNumb;
        };

        foodX = randomFoodCords(0, boardWidth - unitSize);
        foodY = randomFoodCords(0, boardHeight - unitSize);

        context.fillStyle = "#5CCAF6";
        context.fillRect(foodX, foodY, unitSize, unitSize);
    };

    createFood();
});
