function TicTacToe(playerToStart) {
  let board;
  let playerToMove;

  (function() {
    board = new Array(9);
    playerToMove = playerToStart;
  })();

  function makeMove(action) {
    if (action.length > 1) {
      return false;
    }

    if (typeof action[0].place === typeof undefined) {
      return false;
    }

    let position = action[0].place;
    if (typeof board[position] !== typeof undefined) {
      return false;
    }
    board[position] = playerToMove;
    playerToMove = 1 - playerToMove;
    return true;
  }

  function getState() {
    let state = {
      board: board,
      playerToMove: playerToMove
    };

    let validMoves = [];
    for (let i = 0; i < board.length; ++i) {
      if (typeof board[i] === typeof undefined) {
        validMoves.push(i);
      }
    }
    return {
      state: state,
      helpers: {
        validMoves: validMoves
      }
    };
  }

  function getEndState() {
    let endState = {};
    endState.winner = getGameWinner();

    // undecided, if all slots are filled
    if (typeof endState.winner === typeof undefined) {
      endState.drawn = true;
      for (let i = 0; i < board.length; ++i) {
        if (typeof board[i] === typeof undefined) {
          endState.drawn = false;
        }
      }
    }

    endState.gameOver = typeof endState.winner !== typeof undefined ||
      endState.drawn === true;

    return endState;
  }

  function getGameWinner() {
    for (let i = 0; i < 3; ++i) {
      // Horizontal
      if (typeof board[i * 3] !== typeof undefined) {
        if (board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) {
          return board[i];
        }
      }
      // Vertical
      if (typeof board[i] !== typeof undefined) {
        if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
          return board[i];
        }
      }
    }
    // Diagonal
    if (typeof board[0] !== typeof undefined) {
      if (board[0] === board[4] && board[0] === board[8]) {
        return board[0];
      }
    }
    if (typeof board[2] !== typeof undefined) {
      if (board[2] === board[4] && board[2] === board[6]) {
        return board[2];
      }
    }
    return undefined;
  }

  function getPlayerToMove() {
    return playerToMove;
  }

  function useSimplePlacement() {
    return true;
  }

  return {
    useSimplePlacement,
    getState,
    getPlayerToMove,
    getEndState,
    makeMove,
  }
}