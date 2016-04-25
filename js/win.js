var Win = function() {};

Win.prototype = {

  create: function () {
    game.add.sprite(0, 0, 'win');

  setTimeout(function () {
      game.state.start("Menu");
    }, 5000);  
   
  }
};