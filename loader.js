//this is the scene that loads everything
var sprite;
var loader = function(game){
    console.log("Booting Initiated!");
}
loader.prototype = {
    preload:function(){
         this.game.load.image('bgimage', 'assets/background.png');
         this.game.load.bitmapFont('arial', 'assets/font/font.png', 'assets/font/font.xml');
         this.game.load.image('logo', 'assets/logo2.png');
    },
    filecomplete:function(progress, cacheKey, success, totalLoaded, totalFiles){
      this.game.add.tween(sprite).to({alpha:progress/100},1000,"Linear",true);
    },
    loadcomplete:function(){
      this.game.time.events.add(Phaser.Timer.SECOND * 4, this.nextStage, this);

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
        this.game.load.image('hexagon','assets/hexagon.png');
        this.game.load.image('scramble','assets/scramble.png');
        this.game.load.image('scramble','assets/verify.png');
        this.game.load.start();


    },
    nextStage:function(){
      this.game.state.start("Menu");
    },
    update:function(){

    },
    render:function()
    {
        //this.game.debug.geom(cropRect, 'rgba(200,0,0,0.6)');
    }



}
