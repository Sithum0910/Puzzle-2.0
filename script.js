const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-btn');

// Image URL
const imageUrl = 'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20230316-WA0002_0.png';

// Create puzzle pieces
function createPuzzle() {
    puzzleContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        const x = (i % 3) * -100;
        const y = Math.floor(i / 3) * -100;
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `${x}px ${y}px`;
        piece.dataset.index = i;
        puzzleContainer.appendChild(piece);
    }
    addLoveAnimations();
}

// Shuffle puzzle pieces
function shufflePuzzle() {
    const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Love animations
function addLoveAnimations() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('love-heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = `${Math.random() * 100}px`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}

shuffleButton.addEventListener('click', shufflePuzzle);

// Initialize puzzle
createPuzzle();
