var Game = function () {};

var player,enemies,Pinky,Blinky,Inkey,Clyde,Dead,
cursor,lives,
map,layer,layer2 ,layer3, Dots;

Game.prototype = {

  preload: function () {
    
    game.load.spritesheet('pacman', 'assets/images/pacman.png', 30, 30);
    game.load.spritesheet('pinky', 'assets/images/pinky.png', 30, 30);
    game.load.spritesheet('blinky', 'assets/images/blinky.png', 30, 30);
    game.load.spritesheet('inkey', 'assets/images/inkey.png', 30, 30);
    game.load.spritesheet('clyde', 'assets/images/clyde.png', 30, 30);
    game.load.spritesheet('dead_pacman', 'assets/images/dead_pacman.png', 30, 30);

    
    game.load.image('white_bg','assets/images/white_bg.png');
    game.load.image('score_label','assets/images/score_label.png');
    game.load.image('back_icon','assets/images/back_icon.png');
    game.load.image('Life','assets/images/life.png');
    game.load.spritesheet('play_mute_icon', 'assets/images/play_mute_icon_.png', 40, 40);
    game.load.spritesheet('pause_play_icon', 'assets/images/pause_play_icon.png', 40, 40);

    game.load.tilemap('myTilemap','assets/tilemaps/Pacman-map5.json',  null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Tile','assets/tilemaps/2.jpg');
    game.load.image('Dot','assets/tilemaps/dot.png')
    game.load.image('back','assets/tilemaps/1.jpg')
  
    game.load.audio('doteat', 'assets/sounds/doteat.mp3');    
    game.load.audio('pacend', 'assets/sounds/pacend.mp3');
    game.load.audio('endlevel', 'assets/sounds/endlevel.mp3'); 
    game.load.audio('bonuslife', 'assets/sounds/bonuslife.mp3'); 
    

},
  create: function () {
  //  game.add.sprite(0,0,'white_bg');
    
    var playMusic = gameOptions.playMusic;
    music.volume = 0.3;
    back = game.add.sprite(745,8.5,'back_icon');
    back.inputEnabled = true;
    back.events.onInputUp.add(
    function () 
    {
        score = 0 ;
        lives.callAll('revive');
        player.revive();
        game.state.start("Menu");
    });

    playState = game.add.sprite(695,4.5,'pause_play_icon');
    playState.frame = (game.physics.arcade.isPaused) ? 1 : 0;
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
      music.volume = playMusic ? 0 : 0.3;
    });

    game.physics.startSystem(Phaser.Physics.ARCADE);


    
    map = window._map = game.add.tilemap('myTilemap');
    map.addTilesetImage('background', 'back');
    map.addTilesetImage('tile', 'Tile');
    map.addTilesetImage('dots', 'Dot');
    map.setCollision(1 , false , layer );
    map.setCollision(2 , true  , layer2 );
    map.setCollision(3 , true  , layer3 ); // 1 is the gid  
    layer = map.createLayer('Tile Layer 1');          
    layer.resizeWorld();          
    layer.debug = true;
    layer2 = map.createLayer('Tile Layer 2');          
    layer.resizeWorld();          
    layer.debug = true;
    layer3 = map.createLayer('Tile Layer 3');
    Dots = game.add.physicsGroup();
    //map.safetile;
    map.createFromTiles(3,1, 'Dot', layer3, Dots); // check parameters 
    Dots.setAll('x', 6, false, false, 1);
    Dots.setAll('y', 6, false, false, 1);

    Tiles = game.add.physicsGroup();
    //map.safetile;
    map.createFromTiles(2 ,2 , 'Tile', layer2, Tiles); // check parameters 
    Tiles.setAll('x', 6, false, false, 1);
    Tiles.setAll('y', 6, false, false, 1);

    //Player:
    player = game.add.sprite(30, 540, 'pacman');
    game.physics.arcade.enable(player); //enable physics on the player
    player.body.collideWorldBounds = true;

    player.animations.add('left', [6, 7, 8], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);
    player.animations.add('top', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5], 10, true);

    //Enemies:
    enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);
    for (var i = 0; i < 2; i++)
    {
        var s = enemies.create(game.rnd.integerInRange(100, 660), game.rnd.integerInRange(100, 570), 'pinky');
        s.animations.add('left', [6,7], 10, true);
        s.animations.add('right', [4,5], 10, true);
        s.animations.add('top', [0,1], 10, true);
        s.animations.add('down', [2,3], 10, true);
        s.play('down', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-50, 50), game.rnd.integerInRange(-50, 50));
    }
    for (var i = 0; i < 2; i++)
    {
        var s = enemies.create(game.rnd.integerInRange(100, 660), game.rnd.integerInRange(100, 570), 'blinky');
        s.animations.add('left', [6,7], 10, true);
        s.animations.add('right', [4,5], 10, true);
        s.animations.add('top', [0,1], 10, true);
        s.animations.add('down', [2,3], 10, true);
        s.play('top', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-50, 50), game.rnd.integerInRange(-50, 50));
    }
    for (var i = 0; i < 2; i++)
    {
        var s = enemies.create(game.rnd.integerInRange(100, 660), game.rnd.integerInRange(100, 570), 'inkey');
        s.animations.add('left', [6,7], 10, true);
        s.animations.add('right', [4,5], 10, true);
        s.animations.add('top', [0,1], 10, true);
        s.animations.add('down', [2,3], 10, true);
        s.play('down', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-50, 50), game.rnd.integerInRange(-50, 50));
    }
    for (var i = 0; i < 2; i++)
    {
        var s = enemies.create(game.rnd.integerInRange(100, 660), game.rnd.integerInRange(100, 570), 'clyde');
        s.animations.add('left', [6,7], 10, true);
        s.animations.add('right', [4,5], 10, true);
        s.animations.add('top', [0,1], 10, true);
        s.animations.add('down', [2,3], 10, true);
        s.play('down', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-50, 50), game.rnd.integerInRange(-50, 50));
    }
    enemies.setAll('body.collideWorldBounds', true);
    enemies.setAll('body.bounce.x', 1);
    enemies.setAll('body.bounce.y', 1);

    // Score and Life
    scoreText = game.add.text(16, 10, 'Score: 0', { fontSize: '20px', fill: '#FAF911' });
    lives = game.add.group();
    for (var i = 2; i >= 0; i--) 
    {
        var Life = lives.create(16+(30 * i), 35, 'Life');
    }

    // keyboard controller
    cursor = game.input.keyboard.createCursorKeys();
},

update: function() {
    
    game.physics.arcade.collide(player , Tiles ); //Collide the player with the platform
    game.physics.arcade.collide(enemies, Tiles);
    game.physics.arcade.overlap(player, enemies, loose, null, this); //Collide the player with enemies and loose
    game.physics.arcade.overlap(player, Dots, Dotkill , null, this);
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
    var Endmusic = game.add.audio('pacend');
    Endmusic.play();
    game.time.events.add(Phaser.Timer.SECOND*1. , disapear, this);
    
}

function disapear()
{ 
    Dead.kill();
    life = lives.getFirstAlive();
    if (life)
        life.kill();

    if (lives.countLiving() < 1)
        {
        var endLevel = game.add.audio('endlevel');
        endLevel.play();
        score = 0 ;
        lives.callAll('revive');
        player.revive();
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
        // player.revive();
        }
}

function Dotkill (player,Dot ) {
    var Eatmusic = game.add.audio('doteat');
    Eatmusic.play();
    
    Dot.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    if (Dots.countLiving() == 0) 
    {
        var Bonus = game.add.audio('bonuslife');
        Bonus.play();
        score = 0 ;
        lives.callAll('revive');
        player.revive();
        game.state.start("Win");
    } 
} 

function stop(player){

    player.body.velocity.x=0;
    player.body.velocity.y=0;
}