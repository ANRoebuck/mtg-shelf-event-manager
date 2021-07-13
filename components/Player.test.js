const { Player, Bye } = require('./Player');
const { Match } = require('./Match');

describe('player', () => {

  let player1;
  let player2;
  let player3;
  let player4;
  let player5;

  beforeEach(() => {
    player1 = new Player(1);
    player2 = new Player(2);
    player3 = new Player(3);
    player4 = new Player(4);
    player5 = new Player(5);
  });

  it('has a playerId', () => {
    const playerId = 12345;
    const player = new Player(playerId);

    expect(player.getPlayerId()).toEqual(playerId);
  });

  it('can be a bye', () => {
    const bye = new Bye();

    expect(bye.getPlayerId()).toEqual("BYE");
  });

  it('adds matches', () => {
    const match = new Match(player1, player2);

    expect(player1.getMatches()).toEqual([match]);
  });

  it('knows about previous opponents', () => {
    new Match(player1, player2);

    expect(player1.previousOpponentOf(player2)).toBe(true);
    expect(player2.previousOpponentOf(player1)).toBe(true);

    const player3 = new Player(3);

    expect(player1.previousOpponentOf(player3)).toBe(false);
    expect(player2.previousOpponentOf(player3)).toBe(false);
  });

  it('knows if its had a bye', () => {
    new Match(player1, new Bye());

    expect(player1.hasHadBye()).toBe(true);
  });

  it('gets points', () => {
    // should be 0 with no games
    expect(player1.getPoints()).toBe(0);

    // three points for a win
    const match1 = new Match(player1, player2);
    match1.recordWinner(player1);
    expect(player1.getPoints()).toBe(3);

    // one point for a draw
    const match2 = new Match(player1, player3);
    match2.recordDraw();
    expect(player1.getPoints()).toBe(4);

    // no points for a loss
    const match3 = new Match(player1, player4);
    match3.recordWinner(player4);
    expect(player1.getPoints()).toBe(4);

    // one more win for fun
    const match4 = new Match(player1, player5);
    match4.recordWinner(player1);
    expect(player1.getPoints()).toBe(7);
  });

});
