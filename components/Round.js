const { lowestFirst,
  incrementObjectOfNumbers,
  peek,
  pushToObjectOfArrays,
  randomElementFromArray
} = require("./utils");
const { Match } = require('./Match');
const { Bye } = require('./Player');


class Round {

  constructor(roundNumber, players) {
    this.roundNumber = roundNumber;
    this.players = players;
    this.pairings = [];
    this.pairRound();
  }

  getRoundNumber = () => this.roundNumber;

  isComplete = () => this.getPairings().every(p => p.isComplete());

  getPlayers = () => this.players;

  getRankedPlayers = () => this.getPlayers().sort((a, b) => a.getPoints() - b.getPoints());

  getPairings = () => this.pairings;

  createPairing = (player1, player2) => this.pairings.push(new Match(player1, player2));


  // THE BUSINESS
  pairRound = () => {

    let rankedPlayers = [...this.getRankedPlayers()];
    const highestPoints = peek(rankedPlayers).getPoints();

    // if odd number of players
    // assign bye and remove player from graph
    //
    if (rankedPlayers.length % 2 === 1) {
      rankedPlayers = this.assignBye(rankedPlayers);
    }

    let candidatePairings = this.getPossiblePairings(rankedPlayers);

    // while not all players are paired
    while (candidatePairings.length > 0) {

      let playerA;
      let playerB;


      // if for any player, only one possible pairing remains
      //    --> pair that
      //
      let aPlayerWithOnlyOneViablePairing =
        this.findPlayerWithOnlyOneValidPairing(this.getNumberOfPossibleParingsByPlayer(rankedPlayers));
      if (aPlayerWithOnlyOneViablePairing) {
        let [a, b] = candidatePairings.filter(cp => cp.contains(aPlayerWithOnlyOneViablePairing));
        playerA = a;
        playerB = b;
      }

      // else weight each pairing
      // of the highest weighted pairings, pair one at random
      else {
        const candidatePairingsByWeight = candidatePairings.reduce((tally, pairing) =>
          pushToObjectOfArrays(tally, this.getWeightForPairing(highestPoints, pairing), pairing), {})

        const highestWeightedPairings = Object.entries(candidatePairingsByWeight).sort(lowestFirst)[0];
        let [a, b]  = randomElementFromArray(highestWeightedPairings);
        playerA = a;
        playerB = b;
      }


      // finally
      // remove paired players from graph
      candidatePairings = candidatePairings.filter(cp => !cp.contains(playerA) && !cp.contains(playerB));
    }

    // all players should now be paired
  }

  assignBye = (rankedPlayers) => {
    rankedPlayers.some((p, i) => {
      if (!p.hasHadBye()) {
        let playerToReceiveBye = rankedPlayers.splice(i, 1)[0];
        this.createPairing(playerToReceiveBye, new Bye());
        return true;
      }
      return false;
    })
    return rankedPlayers;
  }


  // returns an array of two-element arrays of unique pairings of players
  // ie if [a, b] then no [b, a]
  getPossiblePairings = () => {
    let players = [...this.getPlayers()];

    let possiblePairings = [];

    while (players.length > 0) {
      let player = players.pop();
      players.forEach(opponent => possiblePairings.push([player, opponent]));
    }

    return possiblePairings.filter(([player, opponent]) => !opponent.previousOpponentOf(player));
  }


  // returns an object of key:number pairs
  // key is a player
  // value is the number of pairings in which that player appears
  getNumberOfPossibleParingsByPlayer = (candidatePairings) =>
    candidatePairings.reduce((tally, pairedPlayers) => {
      pairedPlayers.forEach(p => incrementObjectOfNumbers(tally, p));
      return tally;
    }, {});


  // accepts an object of key:number pairs
  // returns the first key whose value is exactly 1, or else null
  findPlayerWithOnlyOneValidPairing = (pairingsByPlayer) => {
    let player = null;
    Object.entries(pairingsByPlayer).some(([k, v]) => {
      if (v === 1) {
        player = k;
        return true;
      }
      return false;
    });
    return player;
  }


  // accepts a candidate pairing as a two-element array
  // returns a number
  getWeightForPairing = (highestPoints, [player, opponent]) => {

    const best = Math.max(player.getPoints(), opponent.getPoints());
    const worst = Math.min(player.getPoints(), opponent.getPoints());
    const spread = best - worst;

    // closeness is an inverse measure of how far the lower scoring player is behind the higher scoring player
    const closeness = highestPoints - spread;

    // weighting by closeness means pair-downs will be minimised
    // weighting by the higher player's score means lower ranked players are more likely to be paired down than higher ranked players

    // best and closeness are incremented by 1 to prevent multiplication by 0
    return ( (best + 1) ** 2 ) * ( ( closeness + 1 ) ** 2 );
  }
  // https://bluebones.net/2018/04/swiss-pairing-algorithm/

}


module.exports = {
  Round,
}
