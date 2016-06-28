//this is the scene that loads everything
var cropRect;
var loader = function(game){
    console.log("Booting Initiated!");
}
loader.prototype = {
    preload:function(){
         this.game.load.image('bgimage', 'assets/background.png');
         this.game.load.bitmapFont('arial', 'assets/font/font.png', 'assets/font/font.xml');
         this.game.load.image('logo', 'assets/logo2.png');
    
},
    create:function(){
        var yukleniyortext = this.game.add.bitmapText(400, 100, 'arial', 'Yukleniyor', 64);
        yukleniyortext.anchor.x = 0.5;
        yukleniyortext.anchor.y = 0.5;        
        var tween = this.game.add.tween(yukleniyortext).to( { alpha:0.3}, 1000,  Phaser.Easing.Circular.InOut, true).loop(true);
        //adding background
        var bg = this.game.add.tileSprite(0, 0,1600,1200, 'bgimage');
        bg.anchor.x = 0.5;
        bg.anchor.y = 0.5;
        //inserting logo's shadow
        var shadow = this.game.add.sprite(310, 200, 'logo');
        shadow.tint = 0x000000;
        shadow.alpha = 0.4;
        //inserting logo's sprite
        var sprite = this.game.add.sprite((800 - shadow.width)/2, (600 - shadow.height)/2, 'logo');
        //begining of loading
        sprite.alpha = 0.0;
        this.game.load.image('hexagon','assets/hexagon.png');
        this.game.add.tween(sprite).to({alpha:0.5},1000,"Linear",true);
        this.game.load.image('scrumble','assets/blue.png');
        this.game.add.tween(sprite).to({alpha:1},1000,"Linear",true);

    },
    update:function(){
        
    },
    render:function()
    {
        //this.game.debug.geom(cropRect, 'rgba(200,0,0,0.6)');   
    }
    

}
