const gridSize = 3;
const puzzleContainer = document.getElementById('puzzle-container');
const resetButton = document.getElementById('reset-btn');
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };

// Initialize the puzzle
function initPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles = [];

    const positions = [];
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        positions.push(i);
    }
    shuffle(positions);

    let index = 0;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (row === gridSize - 1 && col === gridSize - 1) {
                tiles.push(null);
                continue;
            }

            const tile = document.createElement('div');
            tile.classList.add('puzzle-piece');
            tile.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
            tile.style.gridRowStart = row + 1;
            tile.style.gridColumnStart = col + 1;
            tile.dataset.x = col;
            tile.dataset.y = row;
            tile.dataset.index = positions[index];
            tile.addEventListener('click', () => moveTile(col, row));
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
            index++;
        }
    }
}

// Shuffle the positions array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Move a tile if it's adjacent to the empty tile
function moveTile(x, y) {
    const dx = Math.abs(x - emptyTile.x);
    const dy = Math.abs(y - emptyTile.y);

    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        const tile = tiles.find(t => t && parseInt(t.dataset.x) === x && parseInt(t.dataset.y) === y);
        if (tile) {
            tile.style.gridRowStart = emptyTile.y + 1;
            tile.style.gridColumnStart = emptyTile.x + 1;
            tile.dataset.x = emptyTile.x;
            tile.dataset.y = emptyTile.y;

            emptyTile.x = x;
            emptyTile.y = y;
        }
    }
}

// Reset button listener
resetButton.addEventListener('click', initPuzzle);

// Initialize puzzle on load
initPuzzle();
