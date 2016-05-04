splash = function () {},

splash.prototype = {

  preload: function () {

    game.load.image('menuBg','assets/images/menuBg.png');
    game.load.image('newGame','assets/images/newGame_.png');
    game.load.image('options','assets/images/options_.png');
    game.load.image('highScore','assets/images/highScore_.png');
    game.load.image('score_label','assets/images/score_label.png');
    game.load.image('back_icon','assets/images/back_icon.png');
    game.load.image('Life','assets/images/life.png');
    game.load.image('gameOver','assets/images/gameOver.png');
    game.load.image('win','assets/images/Win.png');
    game.load.image('back','assets/images/back.png');
    game.load.image('errorPage','assets/images/404.png');

    game.load.spritesheet('play_mute', 'assets/images/play_mute.png', 385, 45);
    game.load.spritesheet('play_mute_icon', 'assets/images/play_mute_icon_.png', 40, 40);
    game.load.spritesheet('pause_play_icon', 'assets/images/pause_play_icon.png', 40, 40);

    game.load.spritesheet('pacman', 'assets/images/pacman.png', 30, 30);
    game.load.spritesheet('pinky', 'assets/images/pinky.png', 30, 30);
    game.load.spritesheet('blinky', 'assets/images/blinky.png', 30, 30);
    game.load.spritesheet('inkey', 'assets/images/inkey.png', 30, 30);
    game.load.spritesheet('clyde', 'assets/images/clyde.png', 30, 30);
    game.load.spritesheet('dead_pacman', 'assets/images/dead_pacman.png', 30, 30);

    game.load.script('game',  'js/game.js');
    game.load.script('menu',  'js/menu.js');
    game.load.script('options',  'js/options.js');
    game.load.script('score',  'js/score.js');
    game.load.script('GameOver',  'js/GameOver.js');
    game.load.script('win',  'js/win.js');

    game.load.tilemap('myTilemap','assets/tilemaps/PacmanMap.json',  null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Tile','assets/tilemaps/tile.png');
    game.load.image('Dot','assets/tilemaps/dot.png')
    game.load.image('Bg','assets/tilemaps/bg.png')
   

    game.load.audio('doteat', 'assets/sounds/doteat.mp3');    
    game.load.audio('pacend', 'assets/sounds/pacend.mp3');
    game.load.audio('endlevel', 'assets/sounds/endlevel.mp3'); 
    game.load.audio('bonuslife', 'assets/sounds/bonuslife.mp3'); 
    
  },
  
  init: function () {
    game.add.sprite(0, 0, 'bg');
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
    
    this.addGameStates();
    
    setTimeout(function () {
      game.state.start("Menu");
    }, 100);    
  }
 };

