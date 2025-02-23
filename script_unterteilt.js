// Schritt 1: HTML-Grundgerüst

// Schritt 3: Grundlegende Variablen

// Referenz zum Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Größe einzelner Schlangen-Teile (ein "Feld")
const gridSize = 20;

// Aktuelle Richtung der Schlange (dx, dy) - Startbewegung nach rechts
let dx = gridSize;
let dy = 0;

// Array, das die Koordinaten jedes Segments der Schlange speichert
let snake = [
    { x: 80, y: 200 },
    { x: 60, y: 200 },
    { x: 40, y: 200 }
];

// Startposition der Nahrung
let food = { x: 0, y: 0 };

// Punktestand
let score = 0;

// Damit wir das Spiel später über eine Funktion aktualisieren können, stellen wir einen Intervall ein
let gameInterval;


// Schritt 4.1: Spielfunktion starten

function startGame() {
    // Score reset
    score = 0;
    // Platziere Essen an einer zufälligen Stelle
    createFood();

    // Intervall starten: alle 100ms wird "updateGame()" aufgerufen
    gameInterval = setInterval(updateGame, 100);
}


// Schritt 4.2: Futter erstellen

function createFood() {
    // Erzeuge zufällige Koordinaten, die auf unser Raster (gridSize) passen
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}


// Schritt 5: Update-Logik und Zeichnen
// Schritt 5.1: Haupt-Spielschleife

function updateGame() {
    // Position der Schlange aktualisieren
    moveSnake();

    // Prüfe, ob die Schlange gegen die Wand oder sich selbst gestoßen ist
    if (checkCollision()) {
        // Wenn Kollision, beende das Spiel
        gameOver();
        return;
    }

    // Futter gegessen?
    if (snake[0].x === food.x && snake[0].y === food.y) {
        // Score erhöhen
        score++;

        // Schlange verlängern (kein "pop", da der Kopf sich gerade nach vorne bewegt hat)
        // => Indem wir NICHT das letzte Element entfernen, bleibt das neue Segment bestehen
        createFood(); // Neues Futter platzieren
    } else {
        // Letztes Segment entfernen, wenn kein Futter gegessen wurde
        snake.pop();
    }

    // Canvas leeren (weiße Fläche/ Hintergrund)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Futter zeichnen
    drawFood();
    // Schlange zeichnen
    drawSnake();
}

// Schritt 5.2: Schlange bewegen

function moveSnake() {
    // Neue Position für den Kopf (index 0) berechnen
    const headX = snake[0].x + dx;
    const headY = snake[0].y + dy;

    // Neues Segment (Kopf) an den Anfang des Arrays einfügen
    snake.unshift({ x: headX, y: headY });
}

// Schritt 5.3: Kollision prüfen

function checkCollision() {
    const head = snake[0];

    // Wände
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        return true;
    }

    // Mit eigenem Körper
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}


// Schritt 5.4: Futter zeichnen

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}


// Schritt 5.5: Schlange zeichnen

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }

    // Optional: Score-Anzeige
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

/* function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Dein Score: ${score}`);
} */

/* // Schritt 6: Tastensteuerung

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    switch (event.keyCode) {
        case LEFT_KEY:
            // Wenn die Schlange sich nicht bereits nach rechts bewegt, kann sie nach links gehen
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
} */

// Schritt 7: Spiel beenden und Reset

function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Dein Score: ${score}`);
    // Du kannst zusätzlich einen Reset durchführen:
    // location.reload();
}


// Schritt 8: Spiel starten, sobald das Fenster geladen ist

window.onload = () => {
    startGame();
};