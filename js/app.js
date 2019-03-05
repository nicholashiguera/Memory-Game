
// Global variables used by the game.
let timer;
let moves = 0;
let cardMatchCounter = 0;
let openCards = [];
let moved = document.querySelector('.moves');
let deck = document.querySelector('.deck');

let cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt','fa-bolt',
             'fa-cube','fa-cube',
             'fa-leaf','fa-leaf',
             'fa-bicycle','fa-bicycle',
             'fa-bomb','fa-bomb',
            ];

// function call to display the cards and start the timer.
displayCards();

// List of all active cards
let allActiveCards = document.querySelectorAll('.card');

// function call to process cards and game.
cardsProcessing(allActiveCards);


/**
* @description Displays the shuffled cards in the board.
* @param       - None
* @return      {string} - HTML string that will be used as a placeholder for the cards.
*/
function generateCards(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;

}

/**
* @description Processes the cards by listening for the click event and then based on that
*              add the cards, compare them, manupulate the move counter and the star rating.
* @param {Array} cards - The array containing the cards in the board.
* @return      - Nothing.
*/
function cardsProcessing(cards) {
  cards.forEach(function(card){
    card.addEventListener('click', function() {
      if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
        cardAdd(card);
        cardComparison(openCards[0], openCards[1]);
      }
      moves+=1;
      moved.innerText = moves;
      hideStars(moves);
      modalInfo(moves);
    })

  });

}

/**
* @description Displays the shuffled cards in the board.
* @param       - None
* @return      - Nothing.
*/
function displayCards() {
  let dataHTML = shuffleCards();

  deck.innerHTML = dataHTML.join('');
}

/**
* @description Shuffles the cards list.
* @param       - None.
* @return      {Array} data - list of shuffled cards.
*/
function shuffleCards() {
  let data;

  data = shuffle(cards).map(function(card){
    return (generateCards(card));
  });

  return data;
}

/**
* @description Displays and opens the card that was clicked.
* @param       {String} card1 - The first card in the open cards list.
* @return      - Nothing.
*/
function displayCard(card){
  card.classList.add("open", "show");
}

/**
* @description Adds the card selected to the list of open cards.
* @param       {String} card - The card selected.
* @return      - Nothing.
*/
function cardAdd(card){
  openCards.push(card);
  displayCard(card);
}

/**
* @description If the cards matched it will show them as matched, and empty the list.
* @param       {String} card1 - The first card in the open cards list.
* @param       {String} card1 - The first card in the open cards list.
* @return      - Nothing.
*/
function cardMatch(card1, card2){
  card1.classList.add("match");
  card2.classList.add("match");

  card1.classList.remove("open", "show");
  card2.classList.remove("open", "show");

  openCards = [];

  cardMatchCounter+=1;
  winning(cardMatchCounter);
}


/**
* @description Creates a timeout for when the 2 cards selected need to be removed.
* @param       - None.
* @return      - None
*/
function cardRemove() {
  setTimeout(function () {
    openCards.forEach(function(card) {
      card.classList.remove("open", "show");
    })
    openCards = [];
  }, 800);

}

/**
* @description Processes the two cards and compares it's data and calls the appropiate function.
* @param       {String} card1 - The first card in the open cards list.
* @param       {String} card1 - The first card in the open cards list.
* @return      - Nothing.
*/
function cardComparison(card1, card2) {
  if(openCards.length == 2){
    if(card1.dataset.card == card2.dataset.card){
      cardMatch(card1, card2);
    }else{
      cardRemove();
    }
  }
}


/**
* @description Resets the moves to zero and assigns the value.
* @param       {number} moves - The value of the move counter.
* @return      - Nothing.
*/
function hideStars(moves) {
  let stars = document.getElementById("star");
  finalMoves = moves;
  if(moves == 16){
    stars.firstElementChild.remove();
  }else if (moves == 35) {
    stars.firstElementChild.remove();
  }else if (moves == 45) {
    stars.firstElementChild.remove();
  }

}

/**
* @description  Starts timer after click.
* @param       - None.
* @return      - Nothing.
*/
function timerStart() {
  timer = gameTimer();
  setTimeout(function () {
    deck.removeEventListener('click', timerStart);
  }, 300);
}

// Listens for the first click to start the timer.
deck.addEventListener('click', timerStart);

/**
* @description Resets the moves to zero and assigns the value.
* @param       - None.
* @return      {ID Value} Id used by the reset timer function.
*/
function gameTimer() {
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let totalSeconds = 0;

  let elapsedTime = setInterval(function () {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
  }, 1000);

  return elapsedTime;
}

/**
* @description Helper function to the timer, to pad the number of seconds.
* @param       {number} time - The number of seconds.
* @return      - Nothing.
*/
function pad(time) {
  var currentTime = time + "";
  if (currentTime.length < 2) {
    return "0" + currentTime;
  } else {
    return currentTime;
  }
}

/**
* @description Resets the timer.
* @param       - None.
* @return      - Nothing.
*/
function timerReset(timer) {
  clearInterval(timer);
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
}

/**
* @description Determines if game was won and activates modal.
* @param       {number} counter - The number of matches.
* @return      - Nothing.
*/
function winning(counter) {
  let modal = document.getElementById('winningModal');
  let close = document.getElementById('close');

  timerReset(timer);

  if(counter == 8){
    modal.style.display = 'block';
  }

  close.addEventListener('click', function() {
    modal.style.display = "none";
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


/**
* @description Contains the information to be displayed in the modal.
* @param       {number} finalMoves - The number of finalMoves.
* @return      - Nothing.
*/
function modalInfo(finalMoves) {
  let info = '';
  let modal = document.getElementById('game');
  let finalStars = document.getElementById("star").getElementsByTagName("li").length;

  let timeMin = document.getElementById('minutes').innerText;
  let timeSec = document.getElementById('seconds').innerText;

  info = 'You finished the game in ' + timeMin + ":" + timeSec + ' using ' + finalMoves + ' moves and achieving a ' + finalStars + ' Star Rating!!!';
  modal.innerHTML = info;

}


// Implementation to restart the game and the nessecary funtions

// Instantiating the reset
let reset = document.getElementById('repeat');
reset.addEventListener('click', restart);

/**
* @description Function that restarts the board, by calling the appropiate functions.
* @param       - None.
* @return      - Nothing.
*/
function restart() {

  //resets to initial
  finalCardsRemove();
  resetMoves();

  starsCheck();

  timerReset(timer);

  deck.innerHTML = '';
  document.getElementById('game').innerHTML = '';

  //restart the game
  displayCards();
  allActiveCards = document.querySelectorAll('.card');
  cardsProcessing(allActiveCards);
  deck.addEventListener('click', timerStart);

}

/**
* @description Loops through cards to remove any active classes from them
* @param       - None.
* @return      - Nothing.
*/
function finalCardsRemove() {
  allActiveCards.forEach(function(card) {
      card.classList.remove("open", "show", "match");
  })
  openCards = [];
}

/**
* @description Resets the moves to zero and assigns the value.
* @param       - None.
* @return      - Nothing.
*/
function resetMoves() {
  moves=0;
  moved.innerText = moves;
}

/**
* @description Shows the number of stars when game is restared.
* @param       - None.
* @return      - Nothing.
*/
function showStars() {
  let node = document.createElement("LI");
  let textnode = document.createElement("I");
  textnode.classList.add("fa", "fa-star");
  node.appendChild(textnode);
  document.getElementById("star").appendChild(node);
}

/**
* @description Checks for the number of stars and adds the appropiate ones.
* @param       - None.
* @return      - Nothing.
*/
function starsCheck() {
  if(document.getElementById("star").getElementsByTagName("li").length == 2){
    showStars();
  }else if (document.getElementById("star").getElementsByTagName("li").length == 1) {
    showStars();
    showStars();
  }else if (document.getElementById("star").getElementsByTagName("li").length == 0) {
    showStars();
    showStars();
    showStars();
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
