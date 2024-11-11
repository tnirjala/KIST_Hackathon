const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'];
const emojiPairs = emojis.concat(emojis); // duplicate the emojis array to create pairs

let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let gameFinished = false;

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function createBoard() {
    const gameContainer = document.getElementById('game-container');
    shuffledCards = shuffle(emojiPairs);

    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<span class="emoji">${emoji}</span>`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (gameFinished) return;

    const card = this;
    const cardIndex = card.dataset.index;

    if (!flippedCards.includes(cardIndex) && flippedCards.length < 2) {
        card.classList.add('flipped');
        flippedCards.push(cardIndex);

        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;

            if (shuffledCards[firstCard] === shuffledCards[secondCard]) {
                matchedCards.push(firstCard, secondCard);
                document.querySelectorAll(`[data-index="${firstCard}"], [data-index="${secondCard}"]`).forEach(card => {
                    card.classList.add('matched');
                    card.removeEventListener('click', flipCard);
                });
            } else {
                setTimeout(() => {
                    document.querySelectorAll(`[data-index="${firstCard}"], [data-index="${secondCard}"]`).forEach(card => {
                        card.classList.remove('flipped');
                    });
                }, 1000);
            }

            flippedCards = [];
        }
    }

    if (matchedCards.length === shuffledCards.length) {
        gameFinished = true;
        document.getElementById('message').textContent = 'Congratulations! You won!';
    }
}

function resetGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    gameFinished = false;
    document.getElementById('message').textContent = '';
    createBoard();
}

createBoard();
