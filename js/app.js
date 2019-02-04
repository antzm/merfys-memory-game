/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 * function shuffle(array) {
 *    var currentIndex = array.length, temporaryValue, randomIndex;
 *
 *   while (currentIndex !== 0) {
 *      randomIndex = Math.floor(Math.random() * currentIndex);
 *      currentIndex -= 1;
 *      temporaryValue = array[currentIndex];
 *      array[currentIndex] = array[randomIndex];
 *      array[randomIndex] = temporaryValue;
 *    }
 *
 *    return array;
 * }
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Merfys Memory Game

let seconds = 0;
let minutes = 0;
let totalMoves = 0;
let cardPair = [];
let totalMatchedCards = 0;

placeCards();
cardListeners();
restartGameOption();
gameTimer()
merfysSolution();

function placeCards() {
	const cardSymbolsList = document.querySelectorAll('.deck i');
	const cardSymbolsArray = Array.from(cardSymbolsList);
	const randomSymbolsArray = randomizeArray(cardSymbolsArray);
	for (let i = 0; i < cardSymbolsList.length; i++) {
		cardSymbolsList[i].outerHTML = randomSymbolsArray[i].outerHTML;
	};
}

function randomizeArray(randArray) {
	let firstElement = 0;
	for (let i = 0; i < randArray.length; i++) {
		firstElement = randArray[0];
		randArray.splice(0,1);
		randArray.splice(randomNum(randArray.length), 0, firstElement);
	};
	return randArray;
}

function randomNum(max) {
	let randNum = Math.floor(Math.random()*(max+1));
	return randNum;
}

function cardListeners() {
	const mainList = document.querySelector('.deck');
	mainList.addEventListener('click', cardAction);
}

function disableListeners() {
	const mainList = document.querySelector('.deck');
	mainList.removeEventListener('click', cardAction);
}

function cardAction(evt) {
	if (evt.target.nodeName === 'LI' && evt.target.className === 'card') {
		evt.target.classList.add('open', 'show');
		keepScore();
		cardSymbol = evt.target.innerHTML;
		pureCardSymbol = cardSymbol.trim();
		cardPair.push(pureCardSymbol);
		if (cardPair.length == 2) {
			compareCards();
		};
	};
}

function compareCards() {
	disableListeners();
	if (cardPair[0] === cardPair[1]) {
		setTimeout(cardsMatch, 250);
	} else {
		setTimeout(cardsDontMatch, 850);
	};
}

function cardsMatch() {
	const matchedCards = document.querySelectorAll('.open');
	for (i = 0; i < 2; i++) {
		matchedCards[i].classList.remove('open', 'show');
	};
	for (i = 0; i < 2; i++) {
		matchedCards[i].classList.add('match');
	};
	totalMatchedCards += 2;
	if (totalMatchedCards == 16) {
		setTimeout(gameComplete, 500);
	};		
	cardPair = [];
	cardListeners();
}

function cardsDontMatch() {
	const unMatchedCards = document.querySelectorAll('.open');
	for (i = 0; i < 2; i++) {
		unMatchedCards[i].classList.remove('open', 'show');
	};
	cardPair = [];
	cardListeners();
}

function keepScore() {
	totalMoves += 1;
	printMoves = document.querySelector('.moves');
	printMoves.innerHTML = totalMoves;
	if (totalMoves == 26) {
		removeStar();
	};
	if (totalMoves == 36) {
		removeStar();
	};
}

function removeStar() {
	const starSymbol = document.querySelector('.stars li');
	starSymbol.remove();
}

function addStar() {
	const starSection = document.querySelector('.stars li');
	const starContent = starSection.innerHTML;
	const newLi = document.createElement('li');
	newLi.innerHTML = starContent;
	starSection.parentNode.appendChild(newLi);
}

function initialStars() {
	const remainingStars = document.querySelectorAll('.stars li');
	const numStars = remainingStars.length;
	if (numStars == 2) {
		addStar();
	};
	if (numStars == 1) {
		addStar();
		addStar();
	};
}

function gameTimer() {
	runTimer = setInterval(countSeconds, 1000);
}

function countSeconds() {
	seconds += 1;
	if (seconds % 60 == 0) {
		minutes += 1;
	};
	displayTimer();
}

function displayTimer() {
	let displaySeconds = (seconds-minutes*60);
	if (displaySeconds < 10) {
		displaySeconds = "0" + displaySeconds;
	};
	let timeFormat = `${(minutes)}:${displaySeconds}`;
	const timerDisplay = document.querySelector('.timer');
	timerDisplay.textContent = timeFormat;
}

function restartGameOption() {
	const restart = document.querySelector('.restart i');
	restart.addEventListener('click', resetGame);
}

function resetGame() {
	disableListeners();
	clearInterval(runTimer);
	seconds = 0;
	minutes = 0;
	totalMoves = -1;
	cardPair = [];
	totalMatchedCards = 0;
	displayTimer()
	resetCards();
	placeCards();
	cardListeners();
	keepScore();
	initialStars();
	gameTimer();
	merfysSolution();
}

function resetCards() {
	const cardSymbols = document.querySelectorAll('.deck i');
	for (let i = 0; i < cardSymbols.length; i++) {
		cardSymbols[i].parentNode.className = 'card';
	};
}

function gameComplete() {
	disableListeners();
	const remainingStars = document.querySelectorAll('.stars li');
	const numStars = remainingStars.length;
	let starsText = 'stars';
	if (numStars == 1) {
		starsText = 'star';
	};
	let minutesText = 'minutes'
	if (minutes == 1) {
		minutesText = 'minute';
	};
	let secondsText = 'seconds'
	if ((seconds-minutes*60) == 1) {
		secondsText = 'second';
	};
	let confirmMessage = `
Congratulations!

You've made it, with just ${totalMoves} moves,
in ${minutes} ${minutesText} and ${seconds-minutes*60} ${secondsText},
and a total score of ${numStars} ${starsText}!

Would you like to play another game?`;
	clearInterval(runTimer);
	if (confirm(confirmMessage)) {
		resetGame();
	};
}

function merfysSolution() {
	const codes = [];
	const pureCodes = [];
	const symbols = [];
	const cardSymbols = document.querySelectorAll('.deck i');
	for (let i = 0; i < cardSymbols.length; i++) {
			codes[i] = cardSymbols[i].outerHTML;
	};
	for (let i = 0; i < codes.length; i++) {
			pureCodes[i] = codes[i].trim();
	};
	for (let i = 0; i < pureCodes.length; i++) {
			symbols[i] = pureCodes[i].slice(16, -6);
	};
	let secretSymbols = `Merfys Memory Game solution:
A1.${symbols[0]}, A2.${symbols[1]}, A3.${symbols[2]}, A4.${symbols[3]},
B1.${symbols[4]}, B2.${symbols[5]}, B3.${symbols[6]}, B4.${symbols[7]},
C1.${symbols[8]}, C2.${symbols[9]}, C3.${symbols[10]}, C4.${symbols[11]},
D1.${symbols[12]}, D2.${symbols[13]}, D3.${symbols[14]}, D4.${symbols[15]}`;
console.log(secretSymbols);
}

/*
Alternative function to create the card deck 
based on the exact instructions in this file
and using the provided shuffle function:
*/

/*
function createDeckFromArray() {

	const cardList = document.querySelectorAll('.card');
	const cardArray = Array.from(cardList);
	const randArray = shuffle(cardArray);

	for (i=0; i < cardList.length; i++) {  
		const oldCard = cardList[i];
		oldCard.remove(); 
	};

	const deckFragment = document.createDocumentFragment();
	for (i=0; i < randArray.length; i++) {
		const newCard = document.createElement('li');
		newCard.innerHTML = randArray[i].innerHTML; 
		newCard.className = randArray[i].className;
		deckFragment.appendChild(newCard);
	};

	const newDeckList = document.querySelector('.deck');
	newDeckList.appendChild(deckFragment);
}
*/
