var up;// up object
var down; // down
var scene;// game object
var timer;
var point = 0;//score
var firsttime;
var maxtime = 90;// used for determining level's time left
var howmany = 0;//used for finding upperorder of letter
var result;
var verifyButton;
var timeText;//Text that writes "yukleniyor" and time left
var single = function(game){
    console.log("Single Initiated!");
    scene = game;
};
single.prototype = {
    preload:function(){},
    create:function(){
      up = new list();
      down = new container();
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
        url: 'http://127.0.0.1:8000/new',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: false
        },
        success: function(data) {
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
              var f = event.key
              addMiddle(f);
            }
        });;
        //add scramble button
        var scramblebutton = scene.add.sprite(750,45,'scramble');
        scramblebutton.inputEnabled = true;
        scramblebutton.scale.x = 0.5;
        scramblebutton.scale.y = 0.5;
        scramblebutton.anchor.x = 0.5;
        scramblebutton.anchor.y = 0.5;
        scramblebutton.events.onInputDown.add(scramble, this);
        //add verify button
        verifyButton = scene.add.sprite(490,250,'verify');
        verifyButton.scale.x = 0.0;
        verifyButton.scale.y = 0.0;
        verifyButton.anchor.x = 0.5;
        verifyButton.anchor.y = 0.5;
        verifyButton.inputEnabled = true;
        verifyButton.events.onInputDown.add(checkUp, this);

    },

    timerEvent:function(){
      var n = new Date();
      var currentTime = n.getTime();
      maxtime --;
      timeText.text = maxtime;
      if(maxtime < 0){
          this.game.state.start("singleOver");
      }
      },
    update:function(){
    },
    createLetters:function()
    {

      down.addLetters(scene);
    }
};

/*
  Finds the letter that given by keyboard. Sends it to up
*/
function addMiddle(charcode){
  for (var i = 0; i < down.items.length; i++) {
    if (down.items[i].data == charcode.toLowerCase()){//if keyboard matches the letter data
        if(!down.items[i].isUp){//check for is it already in up
          howmany++;
          up.addLetter(down.items[i].data,i);//adding extra node to UP
          //modifying letter's info
          down.items[i].isUp = true;
          down.items[i].upperorder = howmany -1;
          refreshDisplayedLetters();
          if(howmany == 2){

          }
          break;
        }
        else {
          console.log("false alarm!");
        }
      }
    }
};

function onTapAddMiddle(order){
  howmany++;
  up.addLetter(down.items[order].data,order);//adding extra node to UP
  //modifying letter's info
  down.items[order].isUp = true;
  down.items[order].upperorder = howmany -1;
  refreshDisplayedLetters();
};


function onTapRemoveLetter(order){
  let temp = up.root;
  let beforetemp = null;
  if(howmany == 0)//if there is no
  {
    console.log("Error occured, Impossible Situation?!?");
    return;
  }
  else if (howmany == 1)
  {
    howmany--;
    down.items[up.root.order].isUp = false;
    delete up.root;
    refreshDisplayedLetters();
    return;
  }
  else {
    while(temp.next){//iterate trough last node
      if (temp.order == order)
      {
        break;
      }
      else {
        beforetemp = temp;
        temp = temp.next;
      }
    };//iteration completed
    if(typeof temp.next != "undefined"){//if searched location is not at end
      if(down.items[up.root.order].data == down.items[temp.order].data){//if searched location is first element
        up.root = temp.next
      }
      else{
        beforetemp.next = temp.next
      }
      while(temp.next){//iterate trough last node and lower upperorder of items
        beforetemp = temp;
        temp = temp.next;
        down.items[temp.order].upperorder -= 1
      }
    }
    else {
      delete temp.next;
    }
  }
  howmany --;
  down.items[order].isUp = false
  refreshDisplayedLetters();
}


function removeLetter(){
  let temp = up.root;
  let beforetemp = null;
  if(howmany == 0)
  {
    return;
  }
  else if (howmany == 1)
  {
    howmany --;
    down.items[temp.order].isUp = false
    delete up.root
  }
  else {
    while(temp.next)//iterate trough last node
    {
      beforetemp = temp;
      temp = temp.next;
    }
    howmany --;
    down.items[temp.order].isUp = false
    delete beforetemp.next
    }
  refreshDisplayedLetters();
};


/*
Constructs a word from letters in UP and checks if it is in given result
TODO: check if the word is validated beforetemp
TODO: give point to user
*/
function checkUp(){
  var upword = "";
  var temp = up.root;
  while(temp){
    upword = upword +""+ temp.data
    temp = temp.next;
  }
  console.log("FIRED = " + upword);
  let check = result.rows.find(function(element){
    if(element.sub == upword)
    {
      if(typeof element.isChecked == 'undefined'){
        element.isChecked = true;
        return true;
      }
      else{
        //handle same pressed result
        console.log("checked");
        return false;
      }
    }
    else{
      return false;
    }
  });
  if(typeof check != 'undefined'){
    console.log("success");
  }
  else{
    console.log("noob");
  }
};


/*
  Refreshes positions of words and gives tween to them
*/
function refreshDisplayedLetters(){
  let startLocation = 400 - (howmany / 2 *60 );
  for(let i = 0; i < 10; i++){
    let moveToHex= scene.add.tween(down.items[i].hexagon);
    let moveToText= scene.add.tween(down.items[i].text);
    if(down.items[i].isUp){
      moveToHex.to({x:startLocation + down.items[i].upperorder * 60, y:250},500,Phaser.Easing.Linear.None);
      moveToText.to({x:startLocation + down.items[i].upperorder * 60, y:250},500,Phaser.Easing.Linear.None);
      moveToHex.start();
      moveToText.start();
    }
    else{
      moveToHex.to({x:down.items[i].order * 75 + 60, y:500},500,Phaser.Easing.Linear.None);
      moveToText.to({x:down.items[i].order * 75 + 60, y:500},500,Phaser.Easing.Linear.None);
      moveToHex.start();
      moveToText.start();
    }
  }
  //update verifyButton
  if (howmany >= 3){
    let moveToVerify= scene.add.tween(verifyButton);
    let scaleToVerify= scene.add.tween(verifyButton.scale);
    moveToVerify.to({x:startLocation + howmany * 60, y:250},500,Phaser.Easing.Linear.None);
    scaleToVerify.to({x:0.3, y:0.3},700,Phaser.Easing.Linear.None);
    moveToVerify.start();
    scaleToVerify.start();
  }
  else{
    let scaleToVerify= scene.add.tween(verifyButton.scale);
    scaleToVerify.to({x:0.0, y:0.0},700,Phaser.Easing.Linear.None);
    scaleToVerify.start();
  }
};

function scramble(sprite, pointer)
{
  //scramble letters
  for (let i = 0; i < 10; i++) {
      let rand = Math.floor(Math.random() * 10);
      let temp = down.items[i].order
      for (let j = 0; j < 10; j++) {
        if(down.items[j].order == rand){
          down.items[j].order = temp
          break;
        }
      }
      down.items[i].order = rand;
  };
  refreshDisplayedLetters();
};
