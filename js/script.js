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
        {
            x: 0 + unitSize,
            y: 0 + unitSize,
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

    function changeDirection(e) {
        switch (true) {
            case e.keyCode === 37 && !(xVelocity === unitSize):
                currentDirection = "left";
                xVelocity = -unitSize;
                yVelocity = 0;
                break;
            case e.keyCode === 38 && !(yVelocity === unitSize):
                currentDirection = "up";
                xVelocity = 0;
                yVelocity = -unitSize;
                break;
            case e.keyCode === 39 && !(xVelocity === -unitSize):
                currentDirection = "right";
                xVelocity = unitSize;
                yVelocity = 0;
                break;
            case e.keyCode === 40 && !(yVelocity === -unitSize):
                currentDirection = "down";
                xVelocity = 0;
                yVelocity = unitSize;
                break;
        }
    }

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
        const newHead = {
            x: snake[0].x + xVelocity,
            y: snake[0].y + yVelocity,
        };

        if (
            newHead.x < 0 ||
            newHead.x >= boardWidth ||
            newHead.y < 0 ||
            newHead.y >= boardHeight
        ) {
            running = false;
            return;
        }

        snake.unshift(newHead);

        if (snake[0].x === foodX && snake[0].y === foodY) {
            score += 1;
            scoreText.textContent = `Score: ${score}`;
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
                gameOver();
                tick();
            }, 75);
        } else {
        }
    }

    function gameOver() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= boardWidth ||
            snake[0].y < 0 ||
            snake[0].y >= boardHeight
        ) {
            running = false;
        }
        for (let i = 1; i < snake.length; i += 1) {
            if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
                running = false;
            }
        }
    }
});
