var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/images/sky.png');
    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    game.load.image('ground', 'assets/images/platform.png');
}

var player;
var platform;
var cursors;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    //!!!! MAZE !!!! (must be generated randomly later) 
    platform = game.add.group(); //group contains all the maze parts
    platform.enableBody = true;  //enable physics for any object in this group

    var ground = platform.create(400, 400, 'ground');
    ground.body.immovable = true; //This stops it from falling away when you jump on it

    //Player:
    player = game.add.sprite(0, game.world.height-100, 'dude');
    game.physics.arcade.enable(player); //enable physics on the player
    player.body.collideWorldBounds = true;

    //control the sprite
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('top', [4], 10, true);
    player.animations.add('down', [4], 10, true);

    // keyboard controller
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    game.physics.arcade.collide(player, platform); //Collide the player with the platform
    //initialize the movement
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    //keypress event handlers 
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.animations.play('right');
    }

    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.animations.play('top');
    }

    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.animations.play('down');
        
    }
    else 
    {
         player.animations.stop();
         player.frame = 4;
    }
    
}
