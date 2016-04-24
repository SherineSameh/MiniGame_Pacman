var GameOver = function() {};

GameOver.prototype = {

  create: function () {
    game.add.sprite(0, 0, 'gameOver');

  setTimeout(function () {
      game.state.start("Menu");
    }, 2000);  
   
  }
};
