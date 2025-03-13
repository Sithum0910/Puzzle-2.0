const container = document.querySelector('.puzzle-container');
const imageSrc = 'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20220718-WA0104_0.png';
const gridSize = 4;
const pieceSize = 100;

function createPuzzle() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${x * pieceSize}px -${y * pieceSize}px`;
            piece.draggable = true;
            container.appendChild(piece);
        }
    }
}

createPuzzle();
