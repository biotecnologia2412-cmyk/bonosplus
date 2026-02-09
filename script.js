const allAnimals = ['🦁', '🐘', '🐺', '🦉', '🐍', '🦅', '🦈', '🐆', '🦒', '🦓', '🦘', '🦏', '🦍', '🐢', '🐙', '🐊', '🐅', '🐎'];
let currentLevel = 1;
let cards = [];
let flippedCards = [];
let moves = 0;
let timer;
let seconds = 0;

function initLevel(level) {
    let numPairs;
    const grid = document.getElementById('grid');
    
    // Definir dificultad
    if (level === 1) { // Principiante
        numPairs = 6;
        grid.className = 'grid';
    } else if (level === 2) { // Intermedio
        numPairs = 8;
        grid.className = 'grid';
    } else { // Experto
        numPairs = 12;
        grid.className = 'grid expert';
    }

    const selectedAnimals = allAnimals.slice(0, numPairs);
    cards = [...selectedAnimals, ...selectedAnimals];
    resetStats();
    createBoard();
}

function createBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cards.sort(() => Math.random() - 0.5).forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.innerHTML = <div class="card-front">?</div><div class="card-back">${animal}</div>;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function checkWin() {
    const allFlipped = document.querySelectorAll('.flipped').length;
    if (allFlipped === cards.length) {
        clearInterval(timer);
        setTimeout(() => {
            if (currentLevel < 3) {
                alert(¡Nivel ${currentLevel} superado! Prepárate para lo que viene...);
                currentLevel++;
                initLevel(currentLevel);
            } else {
                alert("Has dominado la Memoria Animalista Pro. Inspiras a quienes fingen no mirarte.");
                currentLevel = 1;
                initLevel(1);
            }
        }, 500);
    }
}

function resetStats() {
    moves = 0;
    seconds = 0;
    document.getElementById('moves').innerText = '0';
    clearInterval(timer);
    startTimer();
}

// Iniciar nivel 1 al cargar
initLevel(1);
// Esto obliga al juego a dibujar el tablero apenas cargue la página
window.onload = () => {
    initLevel(1); 
};
