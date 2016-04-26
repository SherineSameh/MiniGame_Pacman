var Menu = function() {};
var score = 0 , scoreText,
life=3,finalscore = 0 , lifeText;

Menu.prototype = {

  create: function () {
    game.add.sprite(0, 0, 'menuBg');

    newGame= game.add.sprite(213,270,'newGame');
    newGame.inputEnabled = true;
    newGame.events.onInputUp.add(function () {
          game.state.start("Game");
    });

    options= game.add.sprite(200,390,'options');
    options.inputEnabled = true;
    options.events.onInputUp.add(function (){
        game.state.start("Options");
    });
    
    highScore= game.add.sprite(164,508,'highScore');
    highScore.inputEnabled = true;
    highScore.events.onInputUp.add(function () {
          game.state.start("Score");

    });
  }
};
