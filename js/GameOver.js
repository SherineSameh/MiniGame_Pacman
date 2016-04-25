var GameOver = function() {};

GameOver.prototype = {

  create: function () {
    game.add.sprite(0, 0, 'gameOver');
    var endLevel = game.add.audio('endlevel');
    endLevel.play();
  setTimeout(function () {
  		score = 0 ;
		life=3;
      game.state.start("Menu");
    }, 3000);  
   
  }
};
