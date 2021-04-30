var expect = chai.expect;

describe('My Functions', function () {
	describe('#newDeck', function () {
		it('Should create a new deck with an array of 52 card objects', function () {
			testDeck = new Deck();
			let x = testDeck.cards;
			expect(x).to.have.length(52);
		});
	});
	describe('#Deck', function () {
		it('Should create a new deck instance', function () {
			testDeck = new Deck();
			expect(testDeck).to.be.an('object');
		});
	});
});
