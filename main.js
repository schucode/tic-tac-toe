
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var keep_playing = true;

var setNextTurn = function () {
  if (keep_playing == true) {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    }
    else {
      currentPlayer = player1;
    }
    $('#turn-label').text(currentPlayer);
  }
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2] //top-across
    || spaces[3] === spaces[4] && spaces[4] === spaces[5] //middle-across
    || spaces[6] === spaces[7] && spaces[7] === spaces[8] //bottom-across
    // TODO: Check for rest of game winning cases
    || spaces[0] === spaces[3] && spaces[3] === spaces[6] //left down
    || spaces[1] === spaces[4] && spaces[4] === spaces[7] //middle down
    || spaces[2] === spaces[5] && spaces[5] === spaces[8] //right down
    || spaces[0] === spaces[4] && spaces[4] === spaces[8] //diagonal
    || spaces[6] === spaces[4] && spaces[4] === spaces[2] //diagonal
  )
  {
    console.log('somebody won: ' + currentPlayer );
    // TODO: Trigger 'game-win' event with the winning player as the event data
    keep_playing = false
    $(document).trigger('game-win', currentPlayer);
  }
};

$(document).on('click', '#board .space', function (e) {
  if (keep_playing ) {
    var spaceNum = $(e.currentTarget).index();
    console.log('You clicked on space #' + spaceNum);

    if (spaces[spaceNum] == 'veggies' || spaces[spaceNum] == 'junkfood') {
      alert("Yo, that is not a blank space!!!");
    } else {
      spaces[spaceNum] = currentPlayer;
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

      checkForWinner();
      setNextTurn();
  }
}
});

$(document).on('game-win', function (e, winner) {
  alert(winner);
});

// Start the game
setNextTurn();






/*

  

  line 53 - 
    winner is a string. 
X    complete function by alerting the given winner

  line 35
X    trigger a game-win event and pass the winning player as event data

X  checkForWinner function
    game only checks for three-in-a-row from left to right. 
    finish function to cover all eight win cases

X  update #board .space
    a player can write over another player's entry because the 
    game doesn't check to see if the space is filled out.
    update #board .spcae click handler to check is space is free
    before filling in.
    if not free, tell the player ( NaN is falsy, fyi)

X stop game when someone wins

  EXTENSIONS

  button to start game & track wins/losses
  
  add animation upon win
  allow players to set their names
  allow for players to set player avaat

*/











