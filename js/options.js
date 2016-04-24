var Options = function() {};

Options.prototype = {

  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'menuBg');

    musicState= game.add.sprite(220,280,'play_mute');
    musicState.frame = playMusic ? 1 : 0;
    musicState.inputEnabled = true;
    musicState.events.onInputUp.add(
      function () 
      {
      playMusic=!playMusic;
      musicState.frame = playMusic ? 0 : 1;
      music.volume = playMusic ? 0 : 1;
      });

    back = game.add.sprite(314,390,'back');
    back.inputEnabled = true;
    back.events.onInputUp.add(
      function () 
      {
        game.state.start("Menu");
      });
  }
};
