var Win = function() {};

Win.prototype = {

  create: function () {
    game.add.sprite(0, 0, 'win');

  setTimeout(function () {
  		score = 0 ;
		life=3;
      game.state.start("Menu");
    }, 3000);  
   
  }
};