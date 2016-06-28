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
        this.game.state.start("Loader");
    }
}
