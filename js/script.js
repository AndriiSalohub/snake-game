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

    function startGame() {
        running = true;
        clearBoard();
        drawSnake();
        createFood();
        tick();
    }

    startGame();

    window.addEventListener("keydown", (e) => changeDirection(e));

    function createFood() {
        const randomFoodCords = (min, max) => {
            const randNumb =
                Math.round((Math.random() * (max - min) + min) / unitSize) *
                unitSize;
            return randNumb;
        };

        foodX = randomFoodCords(0, boardWidth - unitSize);
        foodY = randomFoodCords(0, boardHeight - unitSize);

        drawFood();
    }

    function drawFood() {
        context.fillStyle = "#FF0037";
        context.fillRect(foodX, foodY, unitSize, unitSize);
    }

    function clearBoard() {
        context.fillStyle = "#293447";
        context.fillRect(0, 0, boardWidth, boardHeight);
    }

    function drawSnake() {
        context.fillStyle = "#5DCBF9";
        context.strokeStyle = snake;
        snake.forEach((part) => {
            context.fillRect(part.x, part.y, unitSize, unitSize);
            context.strokeRect(part.x, part.y, unitSize, unitSize);
        });
    }

    function snakeMove() {
        const snakeHead = {
            x: snake[0].x + xVelocity,
            y: snake[0].y + yVelocity,
        };

        snake.unshift(snakeHead);

        if (snake[0].x === foodX && snake[0].y === foodY) {
            score += 1;

            scoreText.textContent = score;

            createFood();
        } else {
            snake.pop();
        }
    }

    function tick() {
        if (running) {
            setTimeout(() => {
                clearBoard();
                drawFood();
                snakeMove();
                drawSnake();
                tick();
            }, 75);
        } else {
        }
    }

    function changeDirection(e) {
        switch (true) {
            case e.keyCode === 37 && !(xVelocity === unitSize):
                xVelocity = -unitSize;
                yVelocity = 0;
                break;
            case e.keyCode === 38 && !(yVelocity === unitSize):
                xVelocity = 0;
                yVelocity = -unitSize;
                break;
            case e.keyCode === 39 && !(xVelocity === -unitSize):
                xVelocity = unitSize;
                yVelocity = 0;
                break;
            case e.keyCode === 40 && !(yVelocity === -unitSize):
                xVelocity = 0;
                yVelocity = unitSize;
                break;
        }
    }
});
