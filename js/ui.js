function prepareUI() {
  $('#go').click(playGames);
  $('#stop').click(stopGameTimer);
  //
  $('.loadai').click(loadAI);
  $('.gameselector').change(function() {
    let id = $(this).children('option:selected').val();
    gameFactory = initGame(id);
  });
  //
  prepareAICode();
}

function prepareAICode() {
  $('#ai0code').val(gameFactory.getCodeExample(0));
  $('#ai1code').val(gameFactory.getCodeExample(1));
}

function displayGameResults() {
  tournament.renderScores();
  tournament.renderBoard();
}