var game = new Phaser.Game(640,360,Phaser.AUTO);
var GameState = {
	preload: function()
	{
		this.load.image('bg','assets/spirtes/.png')
	
	},
	create: function()
	{
		this.bg = this.game.add.spirte(0,0 )
	}
	update: function()
	{

	}
};

game.state.add('GameState',GameState);
game.state.start('GameState');