var
  game = new Phaser.Game(780, 600, Phaser.AUTO, 'game'),
  splash = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  music,musicState;

splash.prototype = {

  preload: function () {

    game.load.image('bg','assets/images/bg.png');
    game.load.image('menuBg','assets/images/menuBg.png');
    game.load.image('newGame','assets/images/newGame_.png');
    game.load.image('options','assets/images/options_.png');
    game.load.image('highScore','assets/images/highScore_.png');
    
    game.load.image('gameOver','assets/images/gameOver.png');
    game.load.image('win','assets/images/Win.png');

    game.load.image('back','assets/images/back.png');
    game.load.spritesheet('play_mute', 'assets/images/play_mute.png', 385, 45);

    game.load.audio('intro','assets/sounds/intro.wav');

    game.load.script('game',  'js/game.js');
    game.load.script('menu',  'js/menu.js');
    game.load.script('options',  'js/options.js');
    game.load.script('score',  'js/score.js');
    game.load.script('GameOver',  'js/GameOver.js');
    game.load.script('win',  'js/win.js');
    
  },
  
  addGameStates: function () {

    game.state.add("Game",Game);
    game.state.add("Menu",Menu);
    game.state.add("Options",Options);
    game.state.add("Score",Score);
    game.state.add("GameOver",GameOver);
    game.state.add("Win",Win);
    
      },

  create: function () {
    game.add.sprite(0, 0, 'bg');

    music = game.add.audio('intro');
    music.loop = true;
    music.play();
    music.volume = 0.3;
    this.addGameStates();
    
    setTimeout(function () {
      game.state.start("Menu");
    }, 2000);    
  }
 };

game.state.add("splash", splash);
game.state.start('splash');
