var dog,happyDog;
var dogImg,happyDogImg;
var dataBase;
var foodS,foodStock;

var database;

var feedButton, addButton;
var lastFed;
var foodObj;

var gameState = "Hungry";
var changingGameState, readingGameState;

var bedroomImg, washroomImg, gardenImg;

var sadDodImg,sadDog;

var PlayingImg,SleepingImg,BathingImg;
var Playing,Sleeping,Bathing;

var currentTime;

function preload(){
  //load images here
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/happydog.png');
  sadDog = loadImage('images/Lazy.png');

  bedroomImg = loadImage('images/Bed Room.png');
  washroomImg = loadImage('images/Wash Room.png');
  gardenImg = loadImage('images/Garden.png');

  Playing = loadImage('images/running.png');
  Sleeping = loadImage('images/Lazy.png');
  Bathing = loadImage('images/Happy.png');


}

function setup() {
  var canvas = createCanvas(600, 700);
  database = firebase.database();

  dog = createSprite(300,500,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedButton = createButton("Feed Dog");
  addButton = createButton("Add Food");

  feedButton.position(400,40);
  addButton.position(400,110);

  feedButton.mousePressed(feedDog);
  addButton.mousePressed(addFood);

  foodObj = new Food();


}


function draw() {  
  background(46, 139, 87);
  
  //add styles here

  database.ref('FeedTime').on("value",readTime);

  foodObj.display();

  //read gamestate from database
  readingGameState = database.ref('gameState');
  readingGameState.on("value",function(data){
    gameState = data.val();
  });

  

  if(gameState!="Hungry"){
    feedButton.hide();
    addButton.hide();
    dog.remove(); 

  }else{
    feedButton.show();
    addButton.show();
    dog.addImage(dogImg);
  }

  fill(0);
  textSize(25);
  text("Food Stock: "+foodS,30,120);

  if(lastFed>=12){
  text("Last Fed: "+lastFed%12 + " PM",50,50);
  }else if(lastFed===0){
    text("Last Fed: 12AM",50,50);
  }else{
    text("Last Fed: "+lastFed + "AM",50,50);
  }

  currentTime = hour();
   if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  
  drawSprites();

}

//function to read and write food stock from database
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  lastFed = data.val();
}

//function to write values in database

function feedDog(){

  dog.addImage(happyDogImg);

  if(foodS<=0){
    foodS=0;
    }else{
      foodS = foodS-1;
    }
  
  database.ref('/').update({
    FeedTime:hour(),
    Food:foodS
  })
}

function addFood(){

  foodS = foodS+1;

  database.ref('/').update({
    Food:foodS
  })

}

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }


function draw() {  
  background("white")
foodObject.display()
  feedTime=database.ref("FeedTime")
  feedTime.on("value",function(data){
    lastFeed.val()
  })

  fill(255,255,255);
  textSize(15);
  if(lastFeed>12){
    text("Last Feed :"+ lastFeed% + "PM",350,30)

  }else if(lastFeed==0){
  text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ "AM",350,30);
  }
   

  drawSprites();
  //add styles here
  text("Food Reamaining :"+ foodS,200,200)
}

function FeedDog(){

dog.addImage(doghappy);
foodObject.updateFoodStock(foodObject.getFoodStock-1);
database.ref("/").update({
Food:foodObject.getFoodStock(),
FeedTime:hour()

})
}
function readStock(data){

  foodS=data.val()
  foodObject.updateFoodStock(foodS)
}

function AddFoods(){

  foodS++
  database.ref("/").update({
    Food:foodS

  })
}
