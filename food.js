class Food {
    constructor(){
        this.lastFed = '';
        this.foodStock = '';
        this.image = loadImage('images/Milk.png');
        this.width = width;
        this.height = height;
    }
    getFoodStock(){

    }
    updateFoodStock(){

    }
    deductFood(){

    }
    display(){
        push();
        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.width,this.height);
        pop();
    }
}