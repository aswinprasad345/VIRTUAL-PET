class addFood{
    constructor(){
        this.button = createButton('addFood')
    }
    display(){
        this.button.position(250,50)
        this.button.mousePressed(()=>{
            database.ref("/").update({
                food:food+1,
            })
        })
    }
}

