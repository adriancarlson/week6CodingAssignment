// For the final project you will be creating an automated version of the classic card game WAR.
// Think about how you would build this project and write your plan down. Consider classes such as Card, Deck, and Player and what fields and methods they might each have.
//You can implement the game however you’d like (i.e. printing to the console, using alert, or some other way). The completed project should, when ran, do the following:
// -	Deal 26 Cards to two Players from a Deck.
// -	Iterate through the turns where each Player plays a Card
// -	The Player who played the higher card is awarded a point
// o	Ties result in zero points for either Player
// -	After all cards have been played, display the score.
// Write Unit Tests using Mocha and Chai for each of the functions you write.

//global variables for suits and values
const suits = ['♠', '♣', '♥', '♦'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardValueMap = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};
//deck class
class Deck {
	constructor(cards = newDeck()) {
		this.cards = cards;
	}
	// had to look up how to shuffle deck. looked at many options. this one was more complicated but seemed to shuffle the cards the most randomly
	shuffleDeck() {
		//create a loop to go through cards and flip them with other cards in the array, starting at the back of the deck and taking current card we are on and fliping it with a card we have not got to yet
		for (let i = this.cards.length - 1; i > 0; i--) {
			//starting with the last index until we get to the first card
			const newIndex = Math.floor(Math.random() * (i + 1)); // getting a random index that is earlier in the deck. take random number multiply it by the index + 1, getting an index we have not accessed yet. using flor to make sure it is an integer
			const oldValue = this.cards[newIndex]; // value at index currently
			this.cards[newIndex] = this.cards[i]; // take card at i index and put it where our new index is
			this.cards[i] = oldValue;
			// the oldvalue is used as an intermediate value because we overwrite new index and we need to have access to it before we override it.
		}
	}
	flipCard() {
		return this.cards.shift();
	}
}

//card class
class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
	}
}
// player class
class Player {
	constructor(playerName, playerNumber, playerDeck) {
		this.playerName = playerName;
		this.playerNumber = playerNumber;
		this.playerDeck = playerDeck;
		this.playerScore = 0;
	}
}
// generate Deck
function newDeck() {
	return suits.flatMap((suit) => {
		return values.map((value) => {
			return new Card(suit, value);
		});
	});
}
//game class
class Game {
	constructor() {
		this.players = [];
		this.round = 1;
	}

	addPlayer(player) {
		if (player instanceof Player) {
			this.players.push(player);
		} else {
			throw new Error(`You can only add an instace of Player. Argument is not a Player ${player}`);
		}
	}
}
// menu class
class Menu {
	constructor() {
		this.currentGame;
	}

	start() {
		let selection = this.showMainMenuOptions();
		while (selection != 0) {
			switch (selection) {
				case '1':
					this.createGame();
					break;
				default:
					selection = 0;
			}
			selection = this.showMainMenuOptions();
		}
		alert(`See ya Later!`);
		location.reload();
	}
	showMainMenuOptions() {
		return prompt(`
		0) Exit
		1) Start New Name
		`);
	}

	showStartMenuOptions(players) {
		return prompt(`
		0) Reset
		1) Start Game
		________________
		Player ${players[0].playerNumber}: ${players[0].playerName}
		vs.
		Player ${players[1].playerNumber}: ${players[1].playerName}
		`);
	}
	showGameMenuOptions(courseInfo) {
		return prompt(`
		0) Exit
		1) Next Round
		________________
		${courseInfo}
		`);
	}
	createGame() {
		this.currentGame = new Game(); // create new game
		const deck = new Deck(); // create new deck
		deck.shuffleDeck(); // shuffle deck
		const deckMidPoint = deck.cards.length / 2; // find deck mid point to split between players
		let player1Deck = new Deck(deck.cards.slice(0, deckMidPoint)); //create a new deck and give first player first half of shuffled deck by splicing first card through mid point
		let player2Deck = new Deck(deck.cards.slice(deckMidPoint, deck.cards.length)); //create a new deck and give Second player last half of shuffled deck by splicing mid point through end of cards
		let player1 = prompt(`Enter first player name: `); // prompt for player 1 name
		let player2 = prompt(`Enter second player name: `); // prompt for player 2 name
		this.currentGame.players.push(new Player(player1, 1, player1Deck)); // create player one with deck
		this.currentGame.players.push(new Player(player2, 2, player2Deck)); // create player two with deck

		let startSelection = this.showStartMenuOptions(this.currentGame.players);

		if (startSelection == 1) {
			this.roundRunner();
		}
	}
	roundRunner() {
		if (this.currentGame.players[0].playerDeck.cards.length > 0 && this.currentGame.players[1].playerDeck.cards.length > 0) {
			let currentRound = this.currentGame.round++; //incrament round
			let players = this.currentGame.players;
			let currentPlayer1Card = this.currentGame.players[0].playerDeck.flipCard(); // remove first card off of player 1 deck
			let currentPlayer2Card = this.currentGame.players[1].playerDeck.flipCard(); // remove first card off of player 2 deck
			let p1CardVal = cardValueMap[currentPlayer1Card.value]; // use mapping to get value of Player 1 card
			let p2CardVal = cardValueMap[currentPlayer2Card.value]; // use mapping to get value of Player 2 card
			let roundWinner = '';
			if (p1CardVal > p2CardVal) {
				this.currentGame.players[0].playerScore++;
				roundWinner = this.currentGame.players[0].playerName;
			} else if (p1CardVal < p2CardVal) {
				this.currentGame.players[1].playerScore++;
				roundWinner = this.currentGame.players[1].playerName;
			} else {
				roundWinner = 'Tie';
			}

			let selection = this.showRoundOptions(currentRound, currentPlayer1Card, currentPlayer2Card, players, roundWinner);
			while (selection != 0) {
				switch (selection) {
					case '1':
						this.roundRunner();
						break;
					default:
						selection = 0;
				}
				selection = this.showRoundOptions(currentRound, currentPlayer1Card, currentPlayer2Card, players, roundWinner);
			}
			alert(`See ya Later!`);
			location.reload();
		} else {
			let gameWinner;
			if (this.currentGame.players[0].playerScore > this.currentGame.players[1].playerScore) {
				gameWinner = this.currentGame.players[0].playerName;
			} else {
				gameWinner = this.currentGame.players[1].playerName;
			}
			this.showEndResults(this.currentGame.players, gameWinner);
			window.onClick(location.reload());
		}
	}
	showRoundOptions(currentRound, currentPlayer1Card, currentPlayer2Card, players, roundWinner) {
		return prompt(`Round ${currentRound}
		${players[0].playerName} Draws:  ${currentPlayer1Card.value}${currentPlayer1Card.suit}
		${players[1].playerName} Draws:  ${currentPlayer2Card.value}${currentPlayer2Card.suit}
		Round Winner:  ${roundWinner}

		${players[0].playerName} Score:  ${players[0].playerScore}
		${players[1].playerName} Score:  ${players[1].playerScore}
		---------------------
		0) Exit
		1) Next Round
		`);
	}
	showEndResults(players, gameWinner) {
		alert(`GAME OVER MAN! GAME OVER!
		${gameWinner} Wins

		Final Score
		${players[0].playerName} Score:  ${players[0].playerScore}
		${players[1].playerName} Score:  ${players[1].playerScore}
		`);
	}
}

let menu = new Menu();
menu.start();
