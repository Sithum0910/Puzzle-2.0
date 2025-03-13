const container = document.querySelector('.puzzle-box');
const congratsMessage = document.querySelector('.congrats-message');
const imageSrc = 'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20220718-WA0104_0.png';
const gridSize = 4;
const pieceSize = 100;
let correctPieces = 0;

function createPuzzle() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${x * pieceSize}px -${y * pieceSize}px`;
            piece.style.top = `${Math.random() * 300}px`;
            piece.style.left = `${Math.random() * 300}px`;
            piece.dataset.x = x;
            piece.dataset.y = y;

            piece.draggable = true;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragend', dragEnd);
            
            container.appendChild(piece);
        }
    }
}

let activePiece = null;

function dragStart(e) {
    activePiece = e.target;
}

function dragEnd(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const correctX = activePiece.dataset.x * pieceSize;
    const correctY = activePiece.dataset.y * pieceSize;

    if (Math.abs(x - correctX) < 20 && Math.abs(y - correctY) < 20) {
        activePiece.style.top = `${correctY}px`;
        activePiece.style.left = `${correctX}px`;
        activePiece.draggable = false;
        correctPieces++;

        if (correctPieces === gridSize * gridSize) {
            congratsMessage.classList.remove('hidden');
        }
    }
}

createPuzzle();
