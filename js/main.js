var
  game = new Phaser.Game(780, 600, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  music,musicState;


Main.prototype = {

  preload: function () {
    game.load.image('bg','assets/images/bg.png');
    game.load.script('splash',  'js/splash.js');
    game.load.audio('intro','assets/sounds/intro.wav');
    
  },

  create: function () {
    game.add.sprite(0, 0, 'bg');

    music = game.add.audio('intro');
    music.loop = true;
    music.play();
    music.volume = 0.3;
    
    game.state.add("splash", splash);
    game.state.start('splash');

  }

};

game.state.add('Main', Main);
game.state.start('Main');
