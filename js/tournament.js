function Tournament(gameLogic, ai1, ai2, numberOfGames) {
  let game;
  let gameFactory;
  let gamesToPlay;
  let playerToStart;
  let ai_machines;
  let ai_tally;

  (function() {
    gamesToPlay = numberOfGames || 1000;
    playerToStart = 0;
    ai_tally = [{
      score: 0,
      cheats: 0
    }, {
      score: 0,
      cheats: 0
    }];
    ai_machines = [];
    ai_machines[0] = ai1;
    ai_machines[1] = ai2;
    //
    gameFactory = gameLogic;
  })();

  function startNewGame() {
    game = gameFactory.createNewGame(playerToStart);
  }

  function renderBoard() {
    gameFactory.renderBoard(getGameState().state.board);
  }

  function renderScores() {
    let tally = getScoreboard();

    for (let i = 0; i < 2; ++i) {
      $(`#ai${i}score`).html(tally[i].score);
      $(`#ai${i}cheats`).html(tally[i].cheats);
    }
  }

  function playNextMove() {
    let ply = game.getPlayerToMove();
    let theMove = ai_machines[ply](game.getState());
    if (typeof theMove == 'object') {
      return theMove;
    }
    return Promise.resolve(theMove);
  }

  function playNextMovePromise(resolve) {
    playNextMove()
      .then(function(theMove) {

        // Handle the case where we got the result of a fetch object
        if (typeof theMove === "object") {
          if (theMove.ok) {
            return theMove.text();
          }
        } else {
          return theMove;
        }
      })
      .then(function(theMove) {
        let endstate = {};
        let ply = game.getPlayerToMove();

        let wasValid = game.makeMove(game.useSimplePlacement() ? [{
          place: parseInt(theMove, 10)
        }] : theMove);
        if (!wasValid) {
          endstate = {
            gameOver: true,
            winner: 1 - ply
          };
          ai_tally[ply].cheats++;
        } else {
          endstate = game.getEndState();
        }
        //
        if (endstate.gameOver) {
          if (typeof endstate.winner !== typeof undefined) {
            ai_tally[endstate.winner].score++;
          }
          onGameComplete();
          resolve(endstate);
        } else { // game not over... recurse
          playNextMovePromise(resolve)
        }
      });
  }

  function playWholeGame() {
    return new Promise(function(resolve, reject) {
      startNewGame();
      playNextMovePromise(resolve);
    });
  }

  function onGameComplete() {
    --gamesToPlay;
    playerToStart = 1 - playerToStart;
  }

  function getGameState() {
    return game.getState();
  }

  function moreGamesToPlay() {
    return gamesToPlay ? true : false;
  }

  function getScoreboard() {
    return ai_tally;
  }

  return {
    playWholeGame,
    getScoreboard,
    getGameState,

    renderBoard,
    renderScores,

    moreGamesToPlay,
  };

}