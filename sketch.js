var dog,happyDog,database,foodS,foodstock;

function preload(){
  
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  foodstock = database.ref('food');
  foodstock.on("value",readStock)

}

function draw() {
  background(255,255,255);  
  drawSprites();
}