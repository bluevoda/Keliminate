//this is the scene that loads everything
var sprite;
var loader = function(game){
    console.log("Loader Initiated!");
}
loader.prototype = {
    preload:function(){},
    filecomplete:function(progress, cacheKey, success, totalLoaded, totalFiles){
      this.game.add.tween(sprite).to({alpha:progress/100},1000,"Linear",true);
    },
    loadcomplete:function(){
      this.game.state.start("Menu");
    },
    create:function(){
      //adding background
      var bg = this.game.add.tileSprite(0, 0,1600,1200, 'bgimage');
      bg.anchor.x = 0.5;
      bg.anchor.y = 0.5;
      //inserting logo's shadow
      var shadow = this.game.add.sprite(310, 200, 'logo');
      shadow.tint = 0x000000;
      shadow.alpha = 0.4;
      //inserting logo's sprite
      sprite = this.game.add.sprite((800 - shadow.width)/2, (600 - shadow.height)/2, 'logo');
      //begining of loading
      sprite.alpha = 0.0;
      var yukleniyortext = this.game.add.bitmapText(400, 100, 'arial', 'Yükleniyor', 64);
      yukleniyortext.anchor.x = 0.5;
      var tween = this.game.add.tween(yukleniyortext).to( { alpha:0.3}, 1000,  Phaser.Easing.Circular.InOut, true).loop(true);
      this.game.load.onFileComplete.add(this.filecomplete,this);
      this.game.load.onLoadComplete.add(this.loadcomplete,this);
      this.game.load.image('hexagon','static/assets/hexagon.png');
      this.game.load.image('scramble','static/assets/scramble.png');
      this.game.load.image('verify','static/assets/verify.png');
      this.game.load.start();
    },
    update:function(){
    },
    render:function()
    {
        //this.game.debug.geom(cropRect, 'rgba(200,0,0,0.6)');
    }



}
