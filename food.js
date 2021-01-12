class Food {
    constructor(){
        this.lastFed = '';
        this.image = loadImage('images/Milk.png');
        this.width = width;
        this.height = height;
    }
    getFoodStock(){
        this.foodstock = database.ref('food');
        foodstock.on("value",readStock);
    }
    updateFoodStock(){

    }
    deductFood(){

    }
    readStock(data){
        this.foodS = data.val();
    }
    display(){
        var x = 80,y = 100
        push();
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodS!=0){
            for(var i = 0;this.foodS;i++){
                if(i%10==0){
                    x = 80
                    y = y + 50
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
        pop();
    }
}