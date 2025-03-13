const puzzleBoard = document.getElementById('puzzle-board');
const imageUrl = 'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20220718-WA0104_0.png'; // Use your image URL
const rows = 3;
const cols = 3;
const pieceSize = 100; // Size of each puzzle piece

let pieces = [];

// Create the puzzle pieces
function createPuzzle() {
    for (let i = 0; i < rows * cols; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${(i % cols) * pieceSize}px -${Math.floor(i / cols) * pieceSize}px`;
        piece.dataset.index = i; // Store original index
        piece.draggable = true;
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', dragDrop);
        puzzleBoard.appendChild(piece);
        pieces.push(piece);
    }
    shufflePieces();
}

// Shuffle the puzzle pieces
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        puzzleBoard.appendChild(pieces[j]);
    }
}

// Drag and drop functionality
let draggedPiece;

function dragStart(e) {
    draggedPiece = this;
    setTimeout(() => (this.style.opacity = '0.5'), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.preventDefault();
    if (draggedPiece !== this) {
        const tempBackground = draggedPiece.style.backgroundImage;
        draggedPiece.style.backgroundImage = this.style.backgroundImage;
        this.style.backgroundImage = tempBackground;
        checkWin();
    }
    draggedPiece.style.opacity = '1';
}

// Check if the puzzle is solved
function checkWin() {
    const isWin = pieces.every((piece, index) => {
        const expectedPosition = `-${(index % cols) * pieceSize}px -${Math.floor(index / cols) * pieceSize}px`;
        return piece.style.backgroundPosition === expectedPosition;
    });

    if (isWin) {
        alert('You win! ❤️');
        createPuzzle(); // Restart the game
    }
}

// Love animation
setInterval(() => {
    const love = document.createElement('div');
    love.className = 'love-animation';
    love.innerHTML = '❤️';
    love.style.position = 'absolute';
    love.style.left = `${Math.random() * 100}vw`;
    love.style.top = `${Math.random() * 100}vh`;
    love.style.fontSize = `${Math.random() * 2 + 1}em`;
    document.body.appendChild(love);
    setTimeout(() => love.remove(), 2000);
}, 500);

// Initialize the puzzle
createPuzzle();
