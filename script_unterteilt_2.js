// Schritt 6: Tastensteuerung

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
}