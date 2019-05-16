function GameFactoryTicTacToe() {
  function createNewGame(playerToStart) {
    return new TicTacToe(playerToStart);
  }


  function renderBoard(board) {
    for (let i = 0; i < board.length; i++) {
      const gameBoardItem = $(`#col-${i + 1}`);
      if (typeof board[i] === typeof undefined) {
        gameBoardItem.html(' ');
        continue;
      }
      if (board[i] === 0) {
        gameBoardItem.css('color', "#00C");
      } else {
        gameBoardItem.css('color', "#C00");
      }

      gameBoardItem.html(board[i] === 0 ? 'O' : 'X');
    }
  }

  function getCodeExample(idx) {
    let code = '';

    function line(t) {
      code += t + '\n';
    }
    switch (idx) {
      case 0:
        line("// The array of validMoves is supplied if you're feeling lazy");
        line("return state.helpers.validMoves[0];");
        break;

      case 1:
        line("let moves = state.helpers.validMoves;");
        line("return moves[Math.floor(Math.random()*moves.length)];");
        break;

      case 2:
        line('// The board is held in state.state.board and is an array');
        line('// Pick the middle, if it\'s not taken');
        line('if (state.state.board[4] === null) {');
        line('  return 4;');
        line('}');
        line('// Else pick a square next to our own, working clockwise');
        line('let nextBest = [1,2,5,0,0,8,3,7,8];');
        line('for(let i=0;i<9;++i) {');
        line('  if (state.state.board[i] === state.state.playerToMove && ');
        line('    state.state.board[nextBest[i]] === null) {');
        line('    return nextBest[i];');
        line('  }');
        line('}');
        line('');
        line('return state.helpers.validMoves[0]');
        break;

      case 3:
        line('// You can even use external AI using fetch and return the promise');
        line("return fetch('ai/tictactoe1.php?state=' + encodeURIComponent(JSON.stringify(state)))");
        break;

      case 4:
        line('// You can even use external AI using fetch and return the promise');
        line("return fetch('ai/tictactoe2.php?state=' + encodeURIComponent(JSON.stringify(state)))");
        break;
    }
    return code;
  }

  return {
    createNewGame,
    getCodeExample,
    renderBoard
  }
}