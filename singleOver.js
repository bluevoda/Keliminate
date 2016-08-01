var GameOverText;
var retryButton, menuButton;
var singleOver = function(game){
  console.log("Single Game Over Initiated!");
}
singleOver.prototype = {
    preload:function(){},
    create:function(){
      //add background
      var bg = this.game.add.tileSprite(0, 0,1600,1200, 'bgimage');
      bg.anchor.set(0.5);
      //add game over text
      GameOverText = this.game.add.text(400,250,'Oyun Bitti')
      GameOverText.anchor.set(0.5);
      GameOverText.allign = 'center';
      GameOverText.font = 'Arial';
      GameOverText.fontSize = 70;
      GameOverText.fill = '#ffffff';
      retryButton = this.game.add.bitmapText(400, 350, 'arial', "Tekrar Dene", 64);
      retryButton.anchor.set(0.5);
      retryButton.inputEnabled = true;
      menuButton = this.game.add.bitmapText(400, 450, 'arial', 'Menüye Dön', 64);
      menuButton.anchor.set(0.5);
      menuButton.inputEnabled = true;
      menuButton.events.onInputDown.add(this.menuButtonclick, this);
      retryButton.events.onInputDown.add(this.retryButtonclick, this);
    },
    moveToXY:function(displayObject, x, y, speed){
      var _angle = Math.atan2(y-displayObject.y, x - displayObject.x);
      var x = Math.cos(_angle) * speed;
      var y = Math.sin(_angle) * speed;
      return {x : x, y: y};
    },
    distanceToPointer:function(displayObject, pointer){
      //pisagor calculation of distance
      this._dx = displayObject.x - pointer.x;
      this._dy = displayObject.y - pointer.y;
      return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
    },
    update:function(){
      var offset = this.moveToXY(this.game.input.activePointer, GameOverText.x, GameOverText.y, 8);
      GameOverText.shadow =(offset.x,offset.y, 'rgba(0,0,0,0.5)',this.distanceToPointer(GameOverText,this.game.input.activePointer) / 30);
      if(retryButton.input.pointerOver())
      {
        menuButton.alpha = 0.7;
        retryButton.alpha = 1;
      }
      else if(menuButton.input.pointerOver())
      {
        retryButton.alpha = 0.7;
        menuButton.alpha = 1;
      }else {
        menuButton.alpha = 0.7;
        retryButton.alpha = 0.7;
      }
    },
    retryButtonclick:function(){
        this.game.state.start("Single");
    },
    menuButtonclick:function(){
        this.game.state.start("Menu");
    }
  }
