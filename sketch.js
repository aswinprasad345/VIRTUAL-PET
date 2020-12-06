var dog,happyDog,database,foodS,foodstock;

function preload(){
  dogImage = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,400,50,50);
  dog.addImage(dogImage);

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

}

function draw() {
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    
  }

  drawSprites();
}