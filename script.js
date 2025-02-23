const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;

// Bewegungsrichtung
let dx = gridSize;
let dy = 0;

// Schlange: ein Array von Segmenten (x, y)
let snake = [
    { x: 80, y: 200 },
    { x: 60, y: 200 },
    { x: 40, y: 200 }
];

// Futter
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function startGame() {
    score = 0;
    createFood();
    gameInterval = setInterval(updateGame, 200);
}

function updateGame() {
    moveSnake();

    if (checkCollision()) {
        gameOver();
        return;
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        createFood();
        // Schlange wachsen lassen => pop() weglassen
    } else {
        snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function moveSnake() {
    const headX = snake[0].x + dx;
    const headY = snake[0].y + dy;
    snake.unshift({ x: headX, y: headY });
}

function checkCollision() {
    const head = snake[0];
    // Wandkollision
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        return true;
    }
    // Körperkollision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
    // Score-Anzeige
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Dein Score: ${score}`);
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    switch (event.keyCode) {
        case LEFT_KEY:
            if (dx === 0) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case UP_KEY:
            if (dy === 0) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case RIGHT_KEY:
            if (dx === 0) {
                dx = gridSize;
                dy = 0;
            }
            break;
        case DOWN_KEY:
            if (dy === 0) {
                dx = 0;
                dy = gridSize;
            }
            break;
    }
}

// Spiel starten, sobald das Fenster geladen ist
window.onload = () => {
    startGame();
};