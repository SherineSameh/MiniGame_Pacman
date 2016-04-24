var Game = function () {};

var player,enemies,Pinky,Blinky,Inkey,Clyde,Dead,
cursor,
map,layer1,layer2 , Dots;
 
Game.prototype = {

  preload: function () {
    
    game.load.spritesheet('pacman', 'assets/images/pacman.png', 30, 30);
    game.load.spritesheet('pinky', 'assets/images/pinky.png', 30, 30);
    game.load.spritesheet('blinky', 'assets/images/blinky.png', 30, 30);
    game.load.spritesheet('inkey', 'assets/images/inkey.png', 30, 30);
    game.load.spritesheet('clyde', 'assets/images/clyde.png', 30, 30);
    game.load.spritesheet('dead_pacman', 'assets/images/dead_pacman.png', 30, 30);
    game.load.tilemap('myTilemap','assets/tilemaps/Pacman-Map4.json',  null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Tile','assets/tilemaps/tile.png');
    game.load.image('Dot','assets/tilemaps/dot.png')
    
    game.load.audio('doteat', 'assets/sounds/doteat.mp3');    
    game.load.audio('pacend', 'assets/sounds/pacend.mp3');

},
  create: function () {
 
    // music = game.add.audio('intro');
    // music.loop = true;
    // music.play();

    spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(togglePause, this);

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


    //Player:
    player = game.add.sprite(0, game.world.height-100, 'pacman');
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
    enemies.setAll('body.collideWorldBounds', true);

    enemies.callAll('animations.add', 'animations', 'top', [0,1], 10, true);
    enemies.callAll('animations.add', 'animations', 'down', [2,3], 10, true);
    enemies.callAll('animations.add', 'animations', 'right', [4,5], 10, true);
    enemies.callAll('animations.add', 'animations', 'left', [6,7], 10, true);


    //generate Pinky
    for (var i = 0; i < 3; i++)
    {
        Pinky = enemies.create(game.world.randomX, game.world.randomY, 'pinky');
        Pinky.body.velocity.x=0;
        Pinky.body.velocity.x += 50;
        Pinky.animations.play('left');
    }

    for (var i = 0; i < 5; i++)
    {
        Inkey = enemies.create(game.world.randomX, game.world.randomY, 'inkey');
        Inkey.body.velocity.y=0;
        Inkey.body.velocity.y+= 50;
        Inkey.animations.play('down');
    }
    

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
    
} /*, 

eatDot: function (player, dot) 
{
  dot.kill();

    if (Dots.total === 0)
    {
        Dots.callAll('revive');
    }

}*/
};


function loose (player,enemy)
{ 

    Dead = game.add.sprite(player.body.x, player.body.y, 'dead_pacman');
    Dead.animations.add('done', [0,1,2,3,4,5,6,7,8,9,10], 10, true);   
    Dead.animations.play('done');
    player.kill();
    // music.volume = music.mute ? 0 : 0.1;
    var Endmusic = game.add.audio('pacend');
    Endmusic.play();

    game.time.events.add(Phaser.Timer.SECOND*1.1 , disapear, this);
}

function disapear()
{ 
    Dead.kill(); 

    // music.volume = music.mute ? 0 : 1;
}
function togglePause() {

    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    if(game.physics.arcade.isPaused)
    {
        music.mute = true;
        player.animations.stop();
        player.frame=player.currentFrame;
    }
    else
        music.mute = false;

}

function DOtkill (player,Dots ) {
    score +=100 ;
    Dots.kill();

if (Dots.total === 0) // 3ashan yetala3 einno keseb 
    {
       // call another level or you won 
    }

}