var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('sky', 'assets/images/sky.png');
    game.load.spritesheet('pacman', 'assets/images/pacman.png', 40, 40);
    game.load.spritesheet('pinky', 'assets/images/pinky.png', 40, 40);
    game.load.spritesheet('blinky', 'assets/images/blinky.png', 40, 40);
    game.load.spritesheet('inkey', 'assets/images/inkey.png', 40, 40);
    game.load.spritesheet('clyde', 'assets/images/clyde.png', 40, 40);
    game.load.spritesheet('dead_pacman', 'assets/images/dead_pacman.png', 40, 40);

    game.load.audio('intro', 'assets/sounds/intro.wav');
    game.load.audio('eatdot', 'assets/sounds/eatdot.mp3');    
    game.load.audio('pacend', 'assets/sounds/pacend.mp3');

    game.load.tilemap('myTilemap','assets/tilemaps/Pacman-Map.json',  null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Tile','assets/tilemaps/tile.png');
}

var player,enemies,Pinky,Blinky,Inkey,Clyde,Dead,
cursor,music,
map ,layer ; 
function create() {

    music = game.add.audio('intro');
    music.loop = true;
    music.play();
    
    spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(togglePause, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Background
    game.add.sprite(0, 0, 'sky');

    map = window._map = game.add.tilemap('myTilemap');
    map.addTilesetImage('tile', 'Tile');
    map.setCollision(1 , true, layer ); // 1 is the gid 
      layer = map.createLayer('Tile Layer 1');          
      layer.resizeWorld();          
      layer.debug = true;
      
    

    //Player:
    player = game.add.sprite(0, game.world.height-100, 'pac-man');
    game.physics.arcade.enable(player); //enable physics on the player
    player.body.collideWorldBounds = true;

    player.animations.add('left', [6, 7, 8], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);
    player.animations.add('top', [0, 1, 2], 10, true);
    player.animations.add('down', [3, 4, 5], 10, true);

    //player.animations.add('munch', [0, 1, 2, 1], 20, true);
    //player.play('munch');
    //Enemies:
    enemies = game.add.group();
    enemies.enableBody = true;

    enemies.callAll('animations.add', 'animations', 'top', [0,1], 10, true);
    enemies.callAll('animations.add', 'animations', 'down', [2,3], 10, true);
    enemies.callAll('animations.add', 'animations', 'right', [4,5], 10, true);
    enemies.callAll('animations.add', 'animations', 'left', [6,7], 10, true);

    // enemies.callAll('animations.play', 'animations', 'spin');
    
    for (var i = 0; i < 3; i++)
    {
        Pinky = enemies.create(game.world.randomX, game.world.randomY, 'pinky');
        // Pinky.body.collideWorldBounds = true;
        //must be change!! generate random moves according to the available ones in the maze
        Pinky.body.velocity.x=0;
        Pinky.body.velocity.x += 50;
        Pinky.animations.play('left');
    }

    for (var i = 0; i < 5; i++)
    {
        Inkey = enemies.create(game.world.randomX, game.world.randomY, 'inkey');
        //must be change!! generate random moves according to the available ones in the maze
        Inkey.body.velocity.y=0;
        Inkey.body.velocity.y+= 50;
        Inkey.animations.play('down');

    }
    

    // keyboard controller
    cursor = game.input.keyboard.createCursorKeys();
    
}

function update() {
    
    game.physics.arcade.collide(player, layer); //Collide the player with the platform
    game.physics.arcade.collide(enemies, layer);
    game.physics.arcade.overlap(player, enemies, loose, null, this); //Collide the player with enemies and loose

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

function loose (player,enemy) {
    
    Dead = game.add.sprite(player.body.x, player.body.y, 'dead_pacman');
    Dead.animations.add('done', [0,1,2,3,4,5,6,7,8,9,10], 10, true);    
    player.kill();
    Dead.animations.play('done');
    var Endmusic = game.add.audio('pacend');
    Endmusic.play();
    enemy.body.velocity.x=0;
    enemy.body.velocity.y=0;
    game.time.events.add(Phaser.Timer.SECOND *1.1 , disapear, this);
    

    }
function disapear()
{ 
    Dead.kill(); 
}

function togglePause() {

    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    music.paused = (music.paused) ? true : false;

}