
// the cards
let card = document.getElementsByClassName('card');
// an array to hold all the cards 
let cards = [...card];

// card deck 
const deck = document.getElementById('cards-deck');

// moves variable
let moves = 0;

// counting the moves 
let counter = document.getElementById('moves');

// variables for the star icons
const stars = document.querySelectorAll('.fa-star');

// stars
let starsList = document.querySelectorAll('.stars li');

// variables for matched cards
let matchedCard = document.getElementsByClassName('match');

// close button in the congerats modal
let closeIcon = document.querySelector('.closeBtn');

// congrats modal
let congratsModal = document.getElementById('popUp');

// array for opened cards
let openedCards = [];

// a function to shuffle cards 
function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// shuffles card on refresh or when loaded
document.body.onload = startGame();

// function for starting the game 
function startGame(){
    openedCards = [];

    // shuffle the array of cards already defined earlier 
    cards = shuffle(cards);

    for( let i =0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item){
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled" );
    }
    // reset moves count
    second = 0;
    minute = 0;
    hour = 0;
let timer = document.querySelector('.timer');
timer.innerHTML = ` ${minute} mins ${second} secs `;
clearInterval(interval);
}

// toogles open and show class to display cards
var displayCard = function(){
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};


// adding(pushing) opened cards to openedCards list and check if they match
function cardOpen(){
    openedCards.push(this);
    var len = openedCards.length;
    if( len == 1){
        moveCounter();
    }
        
        // conditions if their types match call matched() or else call unmatched()
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else{
            unmatched();
        }
    
};

// now defining our matched(), unmatched(), disable() functions

function matched(){
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open', 'no-event');
    openedCards[1].classList.remove('show', 'open', 'no-event')
    openedCards =[];
}

function unmatched(){
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        openedCards = [];
    }, 1000)
}


// setting the disable() and enable()

// to disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable cards and also disable matched cards

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i =0; i < matchedCard.length; i++){
            matchedCard[i].classList.add('disabled');
        }
    });
}

// count the player's moves
function moveCounter(){
    
    moves += 1;
    counter.innerHTML = moves;

    // start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting the rates based on moves
    if(moves > 10 && moves < 14 ){
        for(i =0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = 'collapse';
            }
        }
    }

}

// game timing 

var second = 0;
var minute = 0; 
var hour = 0;
var timer = document.querySelector('.timer');
var interval;
function startTimer(){
    interval = setInterval(() => {
        timer.innerHTML = ` ${minute} mins ${second} secs `
        second += 1;
        if(second == 60){
            minute += 1;
            second = 0;
        }
        if( minute == 60){
            hour += 1;
            minute = 0;
        }
    }, 1000);
}

// when all cards match, the congrats modal show 

function congrats(){
    if (matchedCard.length == 20){
        // time will stop
        clearInterval(interval);
        timeSpent = timer.innerHTML;

        // show congrats modal
        congratsModal.classList.add('show');

        // star rating will be declared
        var starRating = document.querySelector('.stars').innerHTML;

        // showing moves, star rating and time on congrats modal
        document.getElementById('finalMoves').innerHTML = moves;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('timeSpent').innerHTML = timeSpent;

        // closeBtn on the modal
        closeModal();
    };
}

function closeModal(){
    closeIcon.addEventListener('click', function(){
        congratsModal.classList.remove('show');
        startGame();
    });
}

// the playAgain function 
function playAgain(){
    congratsModal.classList.remove('show');
    startGame();
}

// a loop to add event listeners to each card 
for ( var i =0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click', congrats)
};