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
  },

  create: function () {
    game.state.add("splash", splash);
    game.state.start('splash');

  }

};

game.state.add('Main', Main);
game.state.start('Main');
