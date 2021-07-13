const { Round } = require('./Round');
const { Player, Bye } = require('./Player');
const { Match } = require('./Match');

describe('player', () => {

  it('has a roundNumber and some players', () => {
    const roundNumber = 3;
    const players = somePlayers(16);
    const round = new Round(roundNumber, players);

    expect(round.getRoundNumber()).toBe(roundNumber);
    expect(round.getPlayers()).toBe(players);
  });

  it('is incomplete until all pairings have results', () => {
    const roundNumber = 3;
    const players = somePlayers(16);
    const round = new Round(roundNumber, players);

    console.log(round.getPairings());

    expect(round.isComplete()).toBe(false);

    round.getPairings().forEach(pairing => pairing.recordDraw());

    expect(round.isComplete()).toBe(true);
  });

  it('gets ranked players', () => {
    // simulate round one having been completed with a win and a draw
    const player1 = new Player(1);
    const player2 = new Player(2);
    const player3 = new Player(3);
    const player4 = new Player(4);
    const match1 = new Match(player1, player2);
    const match2 = new Match(player3, player4);
    match1.recordWinner(player2);
    match2.recordDraw();

    const round = new Round(2, [player1, player2, player3, player4]);

    const expectedRanking = [player1, player3, player4, player2];
    expect(round.getRankedPlayers()).toEqual(expectedRanking);
  });

  describe('assign bye', () => {

    it('assigns a bye to the lowest ranked player', () => {
      // simulate round one having been completed with a win, a draw, and a bye
      const player1 = new Player(1);
      const player2 = new Player(2);
      const player3 = new Player(3);
      const player4 = new Player(4);
      const player5 = new Player(5);
      const match1 = new Match(player1, player2);
      const match2 = new Match(player3, player4);
      match1.recordWinner(player2);
      match2.recordDraw();
      new Match(player5, new Bye());

      new Round(2, [player1, player2, player3, player4, player5]);
      expect(player1.hasHadBye()).toBe(true);
    });

  });

});

const somePlayers = (numberOfPlayers) => {
  const players = [];
  for (let i = 1; i < numberOfPlayers + 1; i++) {
    players.push(new Player(i));
  }
  return players;
}
