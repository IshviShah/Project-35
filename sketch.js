//Create variables here
var dog, hapDog;
var database;
var foodS, foodStock;
var feedDog, addFoods;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  hapDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();
  
  dog = createSprite(250,300,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  foodObj.display();
  
  drawSprites();
  //add styles here
    noStroke();
    textSize(20)
    fill("black")
    //text("Food Remaining:  " + foodS, 20, 200)
  

    fedTime= database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed = data.val();
    });

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : "+lastFed%12 + "PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+lastFed + "AM", 350,30);
    }

    
    
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function writeStock(x){

  if(x<= 0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}
function feedDod(){
  dog.addImage(hapDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


