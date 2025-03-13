const gridSize = 3;
const puzzleContainer = document.getElementById('puzzle-container');
const resetButton = document.getElementById('reset-btn');
let tiles = [];
let emptyX = gridSize - 1;
let emptyY = gridSize - 1;

// Initialize the puzzle
function initPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles = [];
    let count = 0;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x === gridSize - 1 && y === gridSize - 1) {
                tiles.push(null);
                continue;
            }

            const tile = document.createElement('div');
            tile.classList.add('puzzle-piece');
            tile.style.backgroundPosition = `${-x * 100}px ${-y * 100}px`;
            tile.style.left = `${x * 100}px`;
            tile.style.top = `${y * 100}px`;
            tile.dataset.x = x;
            tile.dataset.y = y;
            tile.dataset.correctX = x;
            tile.dataset.correctY = y;
            tile.addEventListener('click', () => moveTile(x, y));
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
            count++;
        }
    }

    shufflePuzzle();
}

// Shuffle the puzzle ensuring it's solvable
function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        const neighbors = getMovableTiles();
        const randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
        moveTile(randomTile.x, randomTile.y, true);
    }
}

// Get tiles that can move (adjacent to the empty space)
function getMovableTiles() {
    return tiles.filter(tile => {
        if (!tile) return false;
        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        return (Math.abs(x - emptyX) + Math.abs(y - emptyY)) === 1;
    });
}

// Move tile to empty position
function moveTile(x, y, isShuffling = false) {
    if (Math.abs(x - emptyX) + Math.abs(y - emptyY) !== 1) return;

    const tile = tiles.find(t => t && parseInt(t.dataset.x) === x && parseInt(t.dataset.y) === y);
    if (!tile) return;

    // Move tile visually
    tile.style.left = `${emptyX * 100}px`;
    tile.style.top = `${emptyY * 100}px`;

    // Update dataset
    tile.dataset.x = emptyX;
    tile.dataset.y = emptyY;

    // Update empty tile position
    emptyX = x;
    emptyY = y;

    if (!isShuffling) checkWinCondition();
}

// Check if the puzzle is solved
function checkWinCondition() {
    const isSolved = tiles.every(tile => {
        if (!tile) return true;
        return tile.dataset.x == tile.dataset.correctX && tile.dataset.y == tile.dataset.correctY;
    });

    if (isSolved) {
        setTimeout(() => alert("You solved it! ❤️"), 300);
    }
}

// Reset the puzzle
resetButton.addEventListener('click', initPuzzle);

// Initialize puzzle on page load
initPuzzle();
