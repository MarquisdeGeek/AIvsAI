let tournament;
let gameFactory;
let gameTimer = -1;

function initTournament() {
  gameFactory = initGame('ttt');
  prepareUI();
  playGames();
}

function initGame(game) {
  // TODO: implement other game types
  return new GameFactoryTicTacToe();
}

function loadAI(e) {
  let ai = $(e.target).data('ai');
  let codeIndex = $(e.target).data('code');
  let codeSource = gameFactory.getCodeExample(codeIndex);
  $('#ai' + ai + 'code').val(codeSource);
}

function createTournament() {
  let code = new Function('state', $("#ai0code").val());
  let code2 = new Function('state', $("#ai1code").val());
  tournament = new Tournament(gameFactory, code, code2, 100);
}

function playGames() {
  stopGameTimer();
  createTournament();
  nextGame();
}

function stopGameTimer() {
  if (gameTimer !== -1) {
    clearTimeout(gameTimer);
    gameTimer = -1;
  }
}

function nextGame() {
  tournament.playWholeGame()
    .then(function() {
      displayGameResults();

      if (tournament.moreGamesToPlay()) {
        stopGameTimer();
        gameTimer = setTimeout(nextGame, 1);
      }
    });
}