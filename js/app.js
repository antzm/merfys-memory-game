/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//    var currentIndex = array.length, temporaryValue, randomIndex;
//
//   while (currentIndex !== 0) {
//      randomIndex = Math.floor(Math.random() * currentIndex);
//      currentIndex -= 1;
//      temporaryValue = array[currentIndex];
//      array[currentIndex] = array[randomIndex];
//      array[randomIndex] = temporaryValue;
//    }
//
//    return array;
// }


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

placeCards();

cardListeners();

restartGameOption();

let totalMoves=0;

function placeCards() {
	const symbolsList = createSymbolsList();
	const symbolsArray = listToArray(symbolsList);
	const randomSymbols = randomizeArray(symbolsArray);
	for (let i = 0; i < symbolsList.length; i++) {
		symbolsList[i].outerHTML = randomSymbols[i].outerHTML;
	};
}

function createSymbolsList() {
	const cardSymbols = document.querySelectorAll('.deck i');
	return cardSymbols;
}

function listToArray(inList) {
	const outArray = Array.from(inList);
	return outArray;
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

function cardAction(evt) {
	if (evt.target.nodeName === 'LI') {
		evt.target.classList.add('open', 'show');
        totalMoves += 1;
        keepScore(totalMoves);
   	};
}

function keepScore(numMovs) {
	printMoves = document.querySelector('.moves');
    printMoves.innerHTML = numMovs;
    if (numMovs == 5) {
    	removeStar();
    };
    if (numMovs == 10) {
    	removeStar();
    };    
}

function restartGameOption() {
	const restart = document.querySelector('.restart i');
	restart.addEventListener('click', resetGame);
}

function resetGame() {
	resetCards();
	placeCards();
	cardListeners();
	totalMoves=0;
	keepScore(totalMoves);
	initialStars();
}

function resetCards() {
	const cardSymbols = document.querySelectorAll('.deck i');
	for (let i = 0; i < cardSymbols.length; i++) {
		cardSymbols[i].parentNode.className = 'card';
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


