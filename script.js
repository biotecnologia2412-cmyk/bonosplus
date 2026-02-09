const animals = ['🦁', '🐘', '🐺', '🦉', '🐍', '🦅', '🦈', '🐆'];
let cards = [...animals, ...animals];
let flippedCards = [];
let moves = 0;
let timer;
let seconds = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    shuffle(cards).forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${animal}</div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.animal === card2.dataset.animal) {
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
    const allFlipped = document.querySelectorAll('.flipped').length;
    if (allFlipped === cards.length) {
        clearInterval(timer);
        alert(¡Victoria! Movimientos: ${moves} en ${seconds} segundos. Inspiras a quienes fingen no verte ganar.);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = ${mins}:${secs};
    }, 1000);
}

function resetGame() {
    moves = 0;
    seconds = 0;
    document.getElementById('moves').innerText = '0';
    document.getElementById('timer').innerText = '00:00';
    clearInterval(timer);
    startTimer();
    createBoard();
}

// Inicializar
createBoard();
startTimer();
