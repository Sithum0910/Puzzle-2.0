const gridSize = 3;
const puzzleContainer = document.getElementById('puzzle-container');
let pieces = [];

// Initialize the puzzle
function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = '';
    let positions = [...Array(gridSize * gridSize).keys()];
    positions = shuffle(positions);

    positions.forEach((pos, index) => {
        if (pos !== (gridSize * gridSize - 1)) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            const x = (pos % gridSize) * -100;
            const y = Math.floor(pos / gridSize) * -100;
            piece.style.backgroundPosition = `${x}px ${y}px`;
            piece.dataset.index = index;
            piece.dataset.position = pos;
            piece.addEventListener('click', () => movePiece(piece));
            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    });
}

// Shuffle the puzzle pieces
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Move the clicked piece if it's adjacent to the empty space
function movePiece(piece) {
    const emptyPos = pieces.length;
    const index = parseInt(piece.dataset.index);
    const adjacentPositions = [index - 1, index + 1, index - gridSize, index + gridSize];

    if (adjacentPositions.includes(emptyPos)) {
        piece.style.order = emptyPos;
        piece.dataset.index = emptyPos;
        pieces[emptyPos] = piece;
        pieces[index] = undefined;
    }
}

// Reset the puzzle
document.getElementById('reset-btn').addEventListener('click', createPuzzle);

// Initialize the puzzle on page load
createPuzzle();
