/* 
  Loop through cards and add event listener
  to flip card when clicked
*/
const allCards = document.querySelectorAll('.card');

const modal = document.querySelector('.modal');

const closeModal = document.querySelector('.closeModal');
closeModal.addEventListener('click', toggleModal)

const restartBtn = document.querySelector('.restartBtn')
restartBtn.addEventListener('click', ()=>{
  toggleModal();
  restartGame();
})

const modalScore = document.querySelector('.modalScore')

let cardsFlipped = false;
let locked = false;

let firstCard, secondCard;

let score = 0;

window.onload = function(){
  shuffleCards();
  updateScore();
}

function toggleModal(){
  modal.classList.toggle('showModal');
}

function flipCard(){
  if (locked) return; // to disable the  cards when 2 cards are opened
  if (this === firstCard) return; // for same card cliked
  this.classList.add('flip');

  if (!cardsFlipped) {
    cardsFlipped = true;
    firstCard = this;
    return
  }

  secondCard = this;
  locked = true;

  // gets called to check the matching pair
  checkMatch();
}

function resetCards() {
  cardsFlipped = false;
  locked = false;
  firstCard = null;
  secondCard = null;
}

function checkMatch() {
  if (firstCard.dataset.number === secondCard.dataset.number) {
    updateScore(++score)
    //  gets called to disable the event listener of both card
    disableCards();
    return
  }
  // get called if different cards
  unflipCards();
}


function disableCards() {
  // remove event listener from both firstCard and secondCard
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  winning();
  resetCards();
}

function unflipCards() {
  locked = true;
  setTimeout(() => {
    if (score > 0) updateScore(--score);
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards()
  }, 2000)
}

function shuffleCards(){
  allCards.forEach((card)=>{
    let position = Math.floor(Math.random() * 12);
    card.style.order = position;
  })
}

function updateScore(score=0){
  let scoreElement = document.querySelector('.scoreValue')
  scoreElement.innerHTML = `Score: ${score}`;
}

allCards.forEach(card => card.addEventListener('click', flipCard))

function flipChecker(el) {
  return el.includes('flip')
}

function winning(){
  let showModal=[];
  allCards.forEach(card => showModal.push(card.classList.value))
  if (showModal.every(e=> flipChecker(e) )) {
    toggleModal();
    modalScore.innerHTML = `Your Score: ${score}`;
  } else {
    console.log('busted')
  }
}

function restartGame(){
  allCards.forEach(card => card.classList.remove('flip'));
  updateScore();
}
