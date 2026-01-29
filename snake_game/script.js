document.body.classList.add("dark");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of one block
let score = 0
let speed = 150; 
let speedLevel = 1;
document.getElementById("speedLevel").innerText = speedLevel;
    // starting speed          // game loop variable
;

// Snake starting position
let snake = [
    { x: 200, y: 200 }
];

// Food position
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// Direction
let d;

// Control snake using keyboard
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.key === "ArrowLeft" && d !== "RIGHT") d = "LEFT";
    else if (event.key === "ArrowUp" && d !== "DOWN") d = "UP";
    else if (event.key === "ArrowRight" && d !== "LEFT") d = "RIGHT";
    else if (event.key === "ArrowDown" && d !== "UP") d = "DOWN";
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, 400, 400);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // Snake eats food
   if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = score;

    // increase speed after every 5 points
    if (score % 5 === 0 && speed > 50) {
    speed -= 20;
    speedLevel++;

    document.getElementById("speedLevel").innerText = speedLevel;

    clearInterval(game);
    startGame();
}

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };


    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= 400 || snakeY >= 400 ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);
}

// Collision check
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Restart game
function restartGame() {
    location.reload();
}

// Game speed
function startGame() {
    game = setInterval(draw, speed);
}
startGame();
function toggleMode() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    }
}

