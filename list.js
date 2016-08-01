var list = function(){
  console.log("list initted");
  var root = {};
};
var node = {
  data:null,
  order:null,
  next:null
};
var container = function()
{
  container.prototype.items = [];
  console.log("container inited");
};
container.prototype = {
  makeletter:function(letter, order)
  {
    return{data:letter, order:order, hexagon:null, text:null, isAvaliable:true};
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
      this.items[i].hexagon.scale.x = 0.03;
      this.items[i].hexagon.scale.y = 0.03;
      this.items[i].text = scene.add.bitmapText((this.items[i].order)*75  + 60, 500,'arial', (this.items[i].data), 32);
      this.items[i].text.anchor.set(0.5);
      scene.physics.enable(this.items[i].text, Phaser.Physics.ARCADE);
      scene.physics.enable(this.items[i].hexagon, Phaser.Physics.ARCADE);

    }
  },
  scramble:function()
  {
    //scramble letters
    for (let i = 0; i < 10; i++) {
        let temp = Math.floor(Math.random() * 10);
        letters[i].order = temp;
        letters[temp].order = i;
    }
  },
  display:function(){

  }
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
