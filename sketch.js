var dog,happyDog,sadDog,washRoom,garden,livingRoom,database,foodS,foodstock,fedTime,lastFed,foodObj,feedDog,foodObj,canvas,addFood,readState,gameState;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  dogSad = loadImage("images/Lazy.png")
  washRoom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  livingRoom = loadImage ("images/Living Room.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  database = firebase.database();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  })

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

  fill(255,255,254);
  textSize(15);
  if(lastFed=>12){
    text("Last Feed : " + lastFed%12 + " PM ",600,25);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",600,25);
  }
  else{
    text("Last Feed : " + lastFed + " AM",600,25);
  }

  if(gameState!== "Hungry"){
    feedDog.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feedDog.show();
    addFood.show();
    dog.addImage(dogSad);
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

function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}

function feedFoods(){
  dog.addImage(dogHappy);
  writeStock(foodS);
  console.log("food")
  database.ref("/").update({
    feedTime:hour()
  })
  }

function livingroom(){
  background(livingRoom,550,500);
}  

function washroom(){
  background(washRoom,550,500);
}

function gardens(){
  background(garden,550,500)
}

