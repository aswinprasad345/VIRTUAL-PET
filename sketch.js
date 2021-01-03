var dog,happyDog,database,foodS,foodstock,fedTime,lastFed,addFood,feedDog,foodObj;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,250,1,1);
  dog.scale = 0.5;
  dog.addImage(dogImage);

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

  addFood = new Food();

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

  addFood.display();

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