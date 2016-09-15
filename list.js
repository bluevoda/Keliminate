var list = function(){
  console.log("list initted");
  var root = {};
};

var container = function()
{
  container.prototype.items = [];
  console.log("container inited");
};
container.prototype = {
  makeletter:function(letter, order)
  {
    return{data:letter, order:order, upperorder:0, hexagon:null, text:null, isUp:false};
    /*
      data: -string- used for comparison
      order: -int- used for determining unactive place of letter
      upperorder: -int- used for determining active place of letter
      hexagon: -sprite- hexagon sprite of letter
      text: -sprite(bitmapText)- text sprite of letter
      isUp: -boolean- true if letter is active, false if letter is unactive
    */
  },
  addLetters:function(scene)
  {
    var arr = result.rows[0].base;
    for(let i = 0; i < 10; i ++)
    {
      this.items.push(this.makeletter(arr.substring(i, i+1),i));
      this.items[i].hexagon = scene.add.sprite((this.items[i].order)*75  + 60, 500, 'hexagon');
      this.items[i].hexagon.anchor.x = 0.5;
      this.items[i].hexagon.anchor.y = 0.5;
      this.items[i].hexagon.inputEnabled = true;
      this.items[i].hexagon.events.onInputDown.add(onLetterTouch, this);
      this.items[i].hexagon.itemOrder = i; //this is creates a sort of two way binding. Makes it accesible to real object trough its sprite
      this.items[i].hexagon.scale.x = 0.03;
      this.items[i].hexagon.scale.y = 0.03;
      this.items[i].text = scene.add.bitmapText((this.items[i].order)*75  + 60, 500,'arial', (this.items[i].data), 32);
      this.items[i].text.anchor.set(0.5);
      scene.physics.enable(this.items[i].text, Phaser.Physics.ARCADE);
      scene.physics.enable(this.items[i].hexagon, Phaser.Physics.ARCADE);

    }
  },
  display:function(){

  },
};
list.prototype = {
  makenode:function(letter,order){
    return{data:letter, order:order, next:null};
  },
  addLetter:function(letter, order){
    if(typeof this.root == "undefined"){
      var item = this.makenode(letter,order);
      this.root = item;
      console.log("adding to root");
    }
    else {
      let temp = {};
      temp = this.root;
      while(temp.next){
        temp = temp.next;
      }
      var item = this.makenode(letter,order);
      temp.next = item;
    }
    this.charlength ++;
  },
  getLetters:function()
  {
    var arr = ['a', 'b', 'c', 'd', 'ü', 'i', 'ç', 'g', 'j', 'z'];
    for(let i = 0; i < 10; i ++)
    {
      this.addletter(arr[i],i);
    }
  },
  display:function()
  {
    let temp = {};
    temp = this.root;
    while(temp)
    {
      console.log(temp.data);
      temp = temp.next;
    }
  }
};

/*
This is letter.onInputDown listener's invoked method
*/
function onLetterTouch(sprite, pointer){
  let order = sprite.itemOrder
  console.log("Touched an Letter at + : "+ order)
  if(down.items[order].isUp){
    onTapRemoveLetter(order);
  }
  else{
    onTapAddMiddle(order);
  }
};
