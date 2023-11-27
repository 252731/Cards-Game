
let deckId
let computerScore = 0;
let yourScore = 0;
const cardsContainer = document.getElementById("cards")
const drawCardBtn = document.getElementById("draw-cards")
const newDeckBtn = document.getElementById("new-deck")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const yourScoreEl = document.getElementById("your-score")



newDeckBtn.addEventListener("click", handleClick)

async function handleClick() {
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await response.json()
    remainingCards.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    console.log("deckId")

}


drawCardBtn.addEventListener('click', twoNewCards)


async function twoNewCards() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    console.log(data.cards)
    cardsContainer.children[0].innerHTML = `
                 <img class="card" src="${data.cards[0].image}"/>
        
    `
    cardsContainer.children[1].innerHTML = `
                 <img class="card" src="${data.cards[1].image}"/>

        `
    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    header.textContent = winnerText
    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        if (computerScore > yourScore) {
            header.textContent = "The computer won the game!"
        } else if (computerScore < yourScore) {
            header.textContent = "You won the game!"
        } else {
            header.textContent = "It's a tie!"
        }
    }

}


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    // console.log("card 1:", card1ValueIndex)
    // console.log("card 2:", card2ValueIndex)
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Compuer 1 wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        yourScore++
        yourScoreEl.textContent = `Your score: ${yourScore}`
        return "You win!"
    } else {
        return "It's a War!"
    }

}




// const card1Obj = {
//     value:"4"
// }
// const card2Obj = {
//     value: "KING"

// }
// determineCardWinner(card1Obj, card2Obj)