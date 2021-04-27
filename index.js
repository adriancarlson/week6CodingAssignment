// For the final project you will be creating an automated version of the classic card game WAR.
// Think about how you would build this project and write your plan down. Consider classes such as Card, Deck, and Player and what fields and methods they might each have. 
//You can implement the game however you’d like (i.e. printing to the console, using alert, or some other way). The completed project should, when ran, do the following:
// -	Deal 26 Cards to two Players from a Deck.
// -	Iterate through the turns where each Player plays a Card
// -	The Player who played the higher card is awarded a point
// o	Ties result in zero points for either Player
// -	After all cards have been played, display the score.
// Write Unit Tests using Mocha and Chai for each of the functions you write.

class Player {
	constructor(playerName, playerNumber) {
		this.playerName = playerName;
		this.playerNumber = playerNumber;
		this.playerScore = 0;
	}
}

class Deck {
	constructor() {
		this.deck = [];
	}
}

class Game {
	constructor() {
		this.players = [];
		this.round = 0;
	}

	addPlayer(player) {
		if (player instanceof Player) {
			this.players.push(player);
		} else {
			throw new Error(`You can only add an instace of Player. Argumetn is not a Player ${player}`);
		}
	}
}

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
		this.currentGame = new Game();
		let player1 = prompt(`Enter first player name: `);
		let player2 = prompt(`Enter second player name: `);
		this.currentGame.players.push(new Player(player1, 1));
		this.currentGame.players.push(new Player(player2, 2));
		let startSelection = this.showStartMenuOptions(this.currentGame.players);
		console.log(startSelection);
		if (startSelection == 1) {
			this.startGame();
		}
	}
	startGame() {
		alert('got here');
	}

	viewCourse() {
		let index = prompt(`Enter the index of the course you wish to view:`);
		if (index > -1 && index < this.courses.length) {
			this.selectedCourse = this.courses[index];
			let description = 'Course Name: ' + this.selectedCourse.courseName + '\n';

			for (let i = 0; i < this.selectedCourse.students.length; i++) {
				description += i + ') ' + this.selectedCourse.students[i].firstName + ' ' + this.selectedCourse.students[i].lastName + ' - ' + this.selectedCourse.students[i].gradeLevel + '\n';
			}

			let selection = this.showCourseMenuOptions(description);
			switch (selection) {
				case '1':
					this.createStudent();
					break;
				case '2':
					this.deleteStudent();
			}
		}
	}

	deleteCourse() {
		let index = prompt(`Enter the index of the course you wish to remove:`);
		if (index > -1 && index < this.courses.length) {
			this.courses.splice(index, 1);
		}
	}

	displayCourses() {
		let courseString = ``;
		for (let i = 0; i < this.courses.length; i++) {
			courseString += i + ') ' + this.courses[i].courseName + '\n';
		}
		alert(courseString);
	}

	createStudent() {
		let firstName = prompt(`Enter student first name: `);
		let lastName = prompt(`Enter student last name: `);
		let gradeLevel = prompt(`Enter student grade level: `);
		this.selectedCourse.students.push(new Student(firstName, lastName, gradeLevel));
	}

	deleteStudent() {
		let index = prompt(`Enter the index of the student you wish to remove:`);
		if (index > -1 && index < this.selectedCourse.students.length) {
			this.selectedCourse.students.splice(index, 1);
		}
	}
}

let menu = new Menu();
menu.start();
