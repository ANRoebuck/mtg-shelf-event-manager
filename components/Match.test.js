const { Match } = require('./Match');
const { Player, Bye } = require('./Player');

describe('player', () => {

  let player1;
  let player2;
  let match;

  beforeEach(() => {
    player1 = new Player(1);
    player2 = new Player(2);
    match = new Match(player1, player2);
  });

  it('initialised as incomplete', () => {
    expect(match.isComplete()).toBe(false);
    expect(match.getResult()).toBe(null);
  });

  it('returns a players opponent', () => {
    expect(match.opponentOf(player1)).toBe(player2);
    expect(match.opponentOf(player2)).toBe(player1);
  });

  it('returns null opponent for invalid player', () => {
    expect(match.opponentOf(new Player(3))).toBe(null);
  });

  it('records a winner', () => {
    match.recordWinner(player1);

    expect(match.isComplete()).toBe(true);
    expect(match.getResult()).toBe(player1.getPlayerId());
  });

  it('does not record invalid winner', () => {
    match.recordWinner(new Player(3));

    expect(match.isComplete()).toBe(false);
    expect(match.getResult()).toBe(null);
  });

  it('records a draw', () => {
    match.recordDraw();

    expect(match.isComplete()).toBe(true);
    expect(match.getResult()).toBe("DRAW");
  });

  it('automatically completes byes', () => {
    match = new Match(player1, new Bye());

    expect(match.isComplete()).toBe(true);
    expect(match.getResult()).toBe(player1.getPlayerId());
  });

});
