var up;
var down;
var scene;
var timer;
var point = 0;
var firsttime;
var maxtime = 90;
var howmany = 0;
var result;
var timeText;
var single = function(game){
    console.log("Single Initiated!");
    scene = game;
};
single.prototype = {
    preload:function(){},
    create:function(){
      //add background
      var bg = this.game.add.tileSprite(0, 0,1600,1200, 'bgimage');
      bg.anchor.set(0.5);
      //add time
      timeText = scene.add.bitmapText(400, 50,'arial', 'Yükleniyor...', 64);
      timeText.anchor.x = 0.5;
      timeText.anchor.y = 0.5;
      var t = new Date();
      firsttime = t.getTime();
      timer = scene.time.create(false);
      timer.loop(1000, this.timerEvent, this);
      //send request
      $.ajax({
        type: 'GET',
        url: 'http://192.168.43.44:3000',
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: false
        },
        success: function(data) {
          console.log("succes");
          result = data;
          single.prototype.createLetters();
          timer.start();
          //this.createLetters(data[0].base);
        }
      });;
      //adding event listeners that listens keyboard activity
      document.addEventListener('keyup', function(event) {
            if(event.keyCode == 8) {
                event.preventDefault();
                removeLetter();
                return false;

            }
            else if(event.keyCode == 13) {
                event.preventDefault();
                //alert('Enter Pressed');
                return false;

            }
            else {
              var f = String.fromCharCode(event.charCode);
              addMiddle(f);
            }
        });;
    },
    timerEvent:function(){
      var n = new Date();
      var currentTime = n.getTime();
      maxtime --;
      timeText.text = maxtime;
      if(maxtime < 75){
          this.game.state.start("singleOver");
      }
    },
    update:function(){
    },
    createLetters:function()
    {
      up = new list();
      down = new container();
      down.addLetters(scene);
    }
};
function addMiddle(charcode){
  for (var i = 0; i < down.items.length; i++) {
  if (down.items[i].data == charcode.toLowerCase()){
        if(down.items[i].isAvaliable){//check for is it already in up
          howmany++;
          console.log(down.items[i]);
          up.addLetter(down.items[i].data,i);
          down.items[i].isAvaliable = false;
          var startLocation = 400 - (howmany / 2 *60 );
          console.log(startLocation);
          var temp = up.root;
          var count = 0;
          while(temp){
            var moveToHex= scene.add.tween(down.items[temp.order].hexagon);
            var moveToText= scene.add.tween(down.items[temp.order].text);
            moveToHex.to({x:startLocation + count * 60, y:250},500,Phaser.Easing.Linear.None);
            moveToText.to({x:startLocation + count * 60, y:250},500,Phaser.Easing.Linear.None);
            moveToHex.start();
            moveToText.start();
            temp = temp.next;
            count ++;
          }
        }
        else {
          console.log("false alarm!");
        }
      }
    }
};
function removeLetter(){
  var temp = up.root;
  var beforetemp = null;
  if(howmany == 0)
  {
    return;
  }
  else if (howmany == 1)
  {
      //add tween
    up.root = null;
  }
  else {
    while(temp.next)
    {
      beforetemp = temp;
      temp = temp.next;
    }
      //add tween (this.items[i].order)*75  + 60, 500, 'hexagon'
      var moveToHex= scene.add.tween(down.items[temp.order].hexagon);
      var moveToText= scene.add.tween(down.items[temp.order].text);
      moveToHex.to({x:down.items[temp.order].order * 75 + 60, y:500},500,Phaser.Easing.Linear.None);
      moveToText.to({x:down.items[temp.order].order * 75 + 60, y:500},500,Phaser.Easing.Linear.None);
      moveToHex.start();
      moveToText.start();
      howmany --;
      //update up
      var temp = up.root;
      var startLocation = 400 - (howmany / 2 *60 );
      while(temp){
        var moveToHex= scene.add.tween(down.items[temp.order].hexagon);
        var moveToText= scene.add.tween(down.items[temp.order].text);
        moveToHex.to({x:startLocation + count * 60, y:250},500,Phaser.Easing.Linear.None);
        moveToText.to({x:startLocation + count * 60, y:250},500,Phaser.Easing.Linear.None);
        moveToHex.start();
        moveToText.start();
        temp = temp.next;
        count ++;
      }
  }
  beforetemp.next = null;
  down.items[temp.order].isAvaliable = true;
};
function checkUp(){
  var upword = "";
  var temp = up.root;
  while(temp){
    upword.concat(temp.data);
  }
  console.log("FIRED = " + upword);
  result.some(function(item){
    if(item.sub == upword)
    {
      console.log("OKAY");
      //accepted
      return true;
    }
  });

  }
