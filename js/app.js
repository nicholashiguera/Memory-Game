

/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt','fa-bolt',
             'fa-cube','fa-cube',
             'fa-leaf','fa-leaf',
             'fa-bicycle','fa-bicycle',
             'fa-bomb','fa-bomb',
            ];

function generateCards(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;

}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let moves = 0;
let moved = document.querySelector('.moves');


// main funtion called on window load
function main() {

  let deck = document.querySelector('.deck');

  let dataHTML = shuffle(cards).map(function(card){
    return (generateCards(card));
  });

  deck.innerHTML = dataHTML.join('');

}

main();

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

 let openCards = [];
 let allActiveCards = document.querySelectorAll(".card");

function displayCard(card){
  card.classList.add("open", "show");
}

function cardAdd(card){
  openCards.push(card);
  displayCard(card);

}

function cardMatch(card1, card2){

  card1.classList.add("match");
  card2.classList.add("match");

  card1.classList.remove("open", "show");
  card2.classList.remove("open", "show");

  openCards = [];
}

function cardRemove() {
  setTimeout(function () {
    openCards.forEach(function(card) {
      card.classList.remove("open", "show");
    })

    openCards = [];
  }, 800);

}

function finalCardsRemove() {
  allActiveCards.forEach(function(card) {
      card.classList.remove("open", "show", "match");
  })
  openCards = [];
}

function cardProcessing(card1, card2) {

    if(openCards.length == 2){
      if(card1.dataset.card == card2.dataset.card){
        cardMatch(card1, card2);
      }else{
        cardRemove();
      }

    }
}



function showStars() {
  let stars = document.getElementById("star");
  let items = stars.getElementsByTagName("li");

  items[2].style.display = 'inline-block';
  items[1].style.display = 'inline-block';
  items[0].style.display = 'inline-block';

}

function timer() {

}

function timerReset(timer) {

}

function restart() {
  finalCardsRemove();
  resetMoves();
  showStars();
  //timerReset(timer);
}

let reset = document.getElementById('repeat');
reset.addEventListener('click', restart);


allActiveCards.forEach(function(card){
  card.addEventListener('click', function() {
    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      cardAdd(card);
      cardProcessing(openCards[0], openCards[1]);
    }
    moves+=1;
    moved.innerText = moves;
    hideStars(moves);
  })

});


function resetMoves() {
  moves=0;
  moved.innerText = moves;
}

function hideStars(moves) {
  let stars = document.getElementById("star");
  let items = stars.getElementsByTagName("li");

  if(moves == 10){
    items[2].style.display = 'none';
  }else if (moves == 20) {
    items[1].style.display = 'none';
  }else if (moves == 30) {
    items[0].style.display = 'none';
  }
}



























// g
