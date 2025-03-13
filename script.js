const puzzleContainer = document.getElementById('puzzle-container');
const images = [
    'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20220718-WA0104_0.png',
    'https://raw.githubusercontent.com/Sithum0910/Puzzle-2.0/refs/heads/main/IMG-20230316-WA0002_0.png'
];

let currentImageIndex = 0;
let pieces = [];

function createPuzzle(imageUrl) {
    puzzleContainer.innerHTML = '';
    pieces = [];

    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
        piece.addEventListener('click', () => movePiece(piece));
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    }

    shufflePieces();
}

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i].style.order, pieces[j].style.order] = [pieces[j].style.order, pieces[i].style.order];
    }
}

function movePiece(piece) {
    const emptyPiece = pieces.find(p => !p.style.backgroundImage);
    if (emptyPiece) {
        [piece.style.backgroundImage, emptyPiece.style.backgroundImage] = [emptyPiece.style.backgroundImage, piece.style.backgroundImage];
        checkWin();
    }
}

function checkWin() {
    const isWin = pieces.every((piece, index) => {
        const expectedPosition = `-${(index % 3) * 100}px -${Math.floor(index / 3) * 100}px`;
        return piece.style.backgroundPosition === expectedPosition;
    });

    if (isWin) {
        alert('You win! ❤️');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        createPuzzle(images[currentImageIndex]);
    }
}

createPuzzle(images[currentImageIndex]);

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
