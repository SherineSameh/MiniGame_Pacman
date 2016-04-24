var Game = function () {};

var player,enemies,Pinky,Blinky,Inkey,Clyde,Dead,
cursor,
map,layer1,layer2 , Dots,
score = 0 , scoreText,

life=3,finalscore = 0 , lifeText;

Game.prototype = {

  preload: function () {
    
    game.load.spritesheet('pacman', 'assets/images/pacman.png', 30, 30);
    game.load.spritesheet('pinky', 'assets/images/pinky.png', 30, 30);
    game.load.spritesheet('blinky', 'assets/images/blinky.png', 30, 30);
    game.load.spritesheet('inkey', 'assets/images/inkey.png', 30, 30);
    game.load.spritesheet('clyde', 'assets/images/clyde.png', 30, 30);
    game.load.spritesheet('dead_pacman', 'assets/images/dead_pacman.png', 30, 30);
    
    game.load.image('menu_bar','assets/images/menu_bar.png');
    game.load.image('score_label','assets/images/score_label.png');
    game.load.image('back_icon','assets/images/back_icon.png');
    game.load.image('Life','assets/images/life.png');
    game.load.spritesheet('play_mute_icon', 'assets/images/play_mute_icon.png', 40, 40);
    game.load.spritesheet('pause_play_icon', 'assets/images/pause_play_icon.png', 40, 40);

    game.load.tilemap('myTilemap','assets/tilemaps/Pacman-Map4.json',  null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Tile','assets/tilemaps/tile.png');
    game.load.image('Dot','assets/tilemaps/dot.png')
    
    game.load.audio('doteat', 'assets/sounds/doteat.mp3');    
    game.load.audio('pacend', 'assets/sounds/pacend.mp3');

},
  create: function () {
 
    var playMusic = gameOptions.playMusic;

    back = game.add.sprite(745,8.5,'back_icon');
    back.inputEnabled = true;
    back.events.onInputUp.add(
      function () 
      {
        game.state.start("Menu");
      });

    playState = game.add.sprite(695,4.5,'pause_play_icon');
    playState.frame = (game.physics.arcade.isPaused) ? 0 : 1;
    playState.inputEnabled = true;
    playState.events.onInputUp.add(
    function () 
    {
        game.physics.arcade.isPaused = !game.physics.arcade.isPaused;
        playState.frame = (game.physics.arcade.isPaused) ? 1 : 0;     
    });


    musicState= game.add.sprite(645,4.5,'play_mute_icon');
    musicState.frame = playMusic ? 1 : 0;
    musicState.inputEnabled = true;
    musicState.events.onInputUp.add(
      function () 
      {
      playMusic=!playMusic;
      musicState.frame = playMusic ? 0 : 1;
      music.volume = playMusic ? 0 : 1;
      });


    // spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // spaceKey.onDown.add(togglePause, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = window._map = game.add.tilemap('myTilemap');
    map.addTilesetImage('tile', 'Tile');
    map.addTilesetImage('dots', 'Dot');
    map.setCollision(1 , true , layer1 );
    map.setCollision(2 , true , layer2 ); // 1 is the gid  
      layer = map.createLayer('Tile Layer 1');          
      layer.resizeWorld();          
      layer.debug = true;
      layer2 = map.createLayer('Tile Layer 2');          
     // layer2.resizeWorld();          
      //layer2.debug = true;
      
    Dots = game.add.physicsGroup();
    //map.safetile;
    map.createFromTiles(2,255, 'Dot', layer2, Dots); // check parameters 
    Dots.setAll('x', 6, false, false, 1);
    Dots.setAll('y', 6, false, false, 1);

    // Life[3] = game.add.physicsGroup(Phaser.Physics.ARCADE);
    // for (var i = 0 ; i < 3; i++) {
    //     // Life[i].create(595 - i*40, 8.5, 'Life');
    //     Life[i] = game.add.sprite(595 - i*40, 8.5, 'Life');
    // };

    //Player:
    player = game.add.sprite(30, 540, 'pacman');
    game.physics.arcade.enable(player); //enable physics on the player
    player.body.collideWorldBounds = true;

    player.animations.add('left', [6, 7, 8], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);
    player.animations.add('top', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5], 10, true);

    //player.animations.add('munch', [0, 1, 2, 1], 20, true);
    //player.play('munch');
    
    //Enemies:
    enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);
    // enemies.setAll('body.collideWorldBounds', true);

    // enemies.callAll('animations.add', 'animations', 'top', [0,1], 10, true);
    // enemies.callAll('animations.add', 'animations', 'down', [2,3], 10, true);
    // enemies.callAll('animations.add', 'animations', 'right', [4,5], 10, true);
    // enemies.callAll('animations.add', 'animations', 'left', [6,7], 10, true);


        Pinky = enemies.create(game.world.randomX, game.world.randomY, 'pinky');
        Pinky.body.collideWorldBounds = true;

        Pinky.animations.add('left', [6,7], 10, true);
        Pinky.animations.add('right', [4,5], 10, true);
        Pinky.animations.add('top', [0,1], 10, true);
        Pinky.animations.add('down', [2,3], 10, true);

        Pinky.body.velocity.x=0;
        Pinky.body.velocity.x += 50;
        Pinky.animations.play('left');

        Inkey = enemies.create(game.world.randomX, game.world.randomY, 'inkey');
        Inkey.body.collideWorldBounds = true;

        Inkey.animations.add('left', [6,7], 10, true);
        Inkey.animations.add('right', [4,5], 10, true);
        Inkey.animations.add('top', [0,1], 10, true);
        Inkey.animations.add('down', [2,3], 10, true);

        Inkey.body.velocity.y=0;
        Inkey.body.velocity.y+= 50;
        Inkey.animations.play('down');

        Blinky = enemies.create(game.world.randomX, game.world.randomY, 'blinky');
        Blinky.body.collideWorldBounds = true;

        Blinky.animations.add('left', [6,7], 10, true);
        Blinky.animations.add('right', [4,5], 10, true);
        Blinky.animations.add('top', [0,1], 10, true);
        Blinky.animations.add('down', [2,3], 10, true);

        Blinky.body.velocity.y=0;
        Blinky.body.velocity.y-= 50;
        Blinky.animations.play('top');
    // }


    // for (var i = 0; i < 4; i++)
    // {
        Clyde = enemies.create(game.world.randomX, game.world.randomY, 'clyde');
        Clyde.body.collideWorldBounds = true;

        Clyde.animations.add('left', [6,7], 10, true);
        Clyde.animations.add('right', [4,5], 10, true);
        Clyde.animations.add('top', [0,1], 10, true);
        Clyde.animations.add('down', [2,3], 10, true);

        Clyde.body.velocity.x=0;
        Clyde.body.velocity.x-= 50;
        Clyde.animations.play('right');
    // }
 
    //  The score
    lifeText = game.add.text(16, 35, 'Life: 3', { fontSize: '20px', fill: '#FFFFFF' });
    scoreText = game.add.text(16, 10, 'Score: 0', { fontSize: '20px', fill: '#FFFFFF' });

    // keyboard controller
    cursor = game.input.keyboard.createCursorKeys();

    
},

update: function() {
    
    game.physics.arcade.collide(player, layer); //Collide the player with the platform
    game.physics.arcade.collide(enemies, layer);
    game.physics.arcade.overlap(player, enemies, loose, null, this); //Collide the player with enemies and loose
   // game.physics.arcade.overlap(player, layer2,  Dotkill, null, this);
    game.physics.arcade.overlap(player, Dots, DOtkill , null, this);
    game.physics.arcade.collide(enemies);
    //initialize the movement
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    //keypress event handlers 
    if (cursor.left.isDown)
    {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    else if (cursor.right.isDown)
    {
        player.body.velocity.x = 100;
        player.animations.play('right');
    }

    else if (cursor.up.isDown)
    {
        player.body.velocity.y = -100;
        player.animations.play('top');
    }

    else if (cursor.down.isDown)
    {
        player.body.velocity.y = 100;
        player.animations.play('down');
        
    }
    else 
    {
          player.animations.stop();
    }
    
} 

};

var Xposition=0,Yposition = 0;
function loose (player,enemy)
{
    Xposition = player.body.x;
    Yposition = player.body.y;

    Dead = game.add.sprite(Xposition, Yposition, 'dead_pacman');
    Dead.animations.add('done', [0,1,2,3,4,5,6,7,8,9,10], 10, true);   
    Dead.animations.play('done');
    player.kill();
    // enemy.kill();
    var Endmusic = game.add.audio('pacend');
    Endmusic.play();
    
    game.time.events.add(Phaser.Timer.SECOND*1. , disapear, this);
    
}

function disapear()
{ 
    Dead.kill();

    life = life-1;
    lifeText.text = 'life    :' + life ;


    if(life == 0){
        game.state.start("GameOver");
    }
    else
    {
        player = game.add.sprite(30, 540 , 'pacman');
        game.physics.arcade.enable(player); //enable physics on the player
        player.body.collideWorldBounds = true;

        player.animations.add('left', [6, 7, 8], 10, true);
        player.animations.add('right', [9, 10, 11], 10, true);
        player.animations.add('top', [0, 1, 2], 10, true);
        player.animations.add('down', [3, 4, 5], 10, true);

    }
}

function DOtkill (player,Dots ) {
    var Eatmusic = game.add.audio('doteat');
    Eatmusic.play();
    
    Dots.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
if (Dots.total === 0) 
    {
    scoreText.text = 'you win';
    }

}