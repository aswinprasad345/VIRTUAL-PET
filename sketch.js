var dog,happyDog,database,foodS,foodstock,fedTime,lastFed,foodObj,feedDog,foodObj,canvas;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  database = firebase.database();

  dog = createSprite(250,250,1,1);
  dog.scale = 0.5;
  dog.addImage(dogImage);

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

  foodObj = new Food(0,0,1,1);
  
  
}

function draw() {
  background(46,139,87);

  textSize(10);
  fill('white');
  strokeWeight(3);
  text("Press UP_ARROW to feed drago milk",175,30);

  textSize(10);
  fill('white');
  strokeWeight(3);
  text("food remaining : " + foodS,200,50);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  foodObj.display();

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0
  }else{
    x = x - 1;
  }

  database.ref("/").update({
    food:x
  })
}