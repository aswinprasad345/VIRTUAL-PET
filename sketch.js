var dog,happyDog,database,foodS,foodstock;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,250,1,1);
  dog.addImage(dogImage);

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

}

function draw() {
  background(46,139,87);

  text("Press UP_ARROW to feed drago milk",150,50);
  textSize(35);
  fill("white");
  strokeWeight(3);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

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