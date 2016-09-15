var boot = function(game){
    console.log("Booting Initiated!");
}
boot.prototype = {
    preload:function(){
    },
    create:function(){
        //setting game scales to responsive look
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.updateLayout();
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //adding background
        this.game.load.onLoadComplete.add(this.loadcomplete,this);
        this.game.load.image('bgimage', 'static/assets/background.png');
        this.game.load.bitmapFont('arial', 'static/assets/font/font.png', 'static/assets/font/font.xml');
        this.game.load.image('logo', 'static/assets/logo2.png');
        this.game.load.start();
    },
    loadcomplete:function(){
      this.game.state.start("Loader");
    }
}
