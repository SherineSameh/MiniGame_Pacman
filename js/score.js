var Score = function() {};

Score.prototype = {
  // init: function()
  // {

  // },
  // preload: function()
  // {

  // },
  create: function () 
  {
     game.add.sprite(0, 0, 'errorPage');

      back = game.add.sprite(745,8.5,'back_icon');
      back.inputEnabled = true;
      back.events.onInputUp.add(
      function () 
      {
      //   score = 0 ;
      //   lives.callAll('revive');
      //   player.revive();
        game.state.start("Menu");
      });
   

   }
  // ,
  // update: function() 
  // {

  // }
};

