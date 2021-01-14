var dog,happyDog,database,foodS,foodstock,fedTime,lastFed,foodObj,feedDog,foodObj,canvas,addFood;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  database = firebase.database();

  dog = createSprite(550,250,1,1);
  dog.scale = 0.5;
  dog.addImage(dogImage);

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

  foodObj = new Food(0,0,1,1);

  feedDog = createButton("Feed Dog")
  feedDog.position(400,10);
  feedDog.mousePressed(feedFoods);
  
  addFood = createButton("Add Food");
  addFood.position(500,10);
  addFood.mousePressed(addFoods);
  
}

function draw() {
  background(46,139,87);

  textSize(20);
  fill('white');
  strokeWeight(3);
  text("food remaining : " + foodS,125,100);

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

function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}

function feedFoods(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

