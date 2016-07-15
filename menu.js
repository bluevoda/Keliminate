//this is the scene that loads everything
var singlebutton;
var multibutton;
var menu = function(game){
    console.log("Menu Initiated!");
}
menu.prototype = {
    preload:function(){

},
    create:function(){
      //adding background
      var bg = this.game.add.tileSprite(0, 0,1600,1200, 'bgimage');
      bg.anchor.x = 0.5;
      bg.anchor.y = 0.5;
      singlebutton = this.game.add.bitmapText(400, 200, 'arial', "Tek Oyuncu", 64);
      singlebutton.anchor.set(0.5);
      singlebutton.inputEnabled = true;
      multibutton = this.game.add.bitmapText(400, 400, 'arial', 'Çok Oyuncu', 64);
      multibutton.anchor.set(0.5);
      multibutton.inputEnabled = true;
      multibutton.events.onInputDown.add(this.multibuttonclick, this);
      singlebutton.events.onInputDown.add(this.singlebuttonclick, this);

    },
    update:function(){
      if(singlebutton.input.pointerOver())
      {
        multibutton.alpha = 0.7;
        singlebutton.alpha = 1;
      }
      else if(multibutton.input.pointerOver())
      {
        singlebutton.alpha = 0.7;
        multibutton.alpha = 1;
      }else {
        multibutton.alpha = 0.7;
        singlebutton.alpha = 0.7;
      }
    },
    singlebuttonclick:function()
    {
      this.game.state.start("Single");
    },
    multibuttonclick:function()
    {
      console.log("multi");
    },
    render:function()
    {
        //this.game.debug.geom(cropRect, 'rgba(200,0,0,0.6)');
    }


}
