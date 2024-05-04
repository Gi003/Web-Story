
//3 Different kinds of Scenes------------------------------------
//Main scene block -- inputing JSON scene object as key
class Location extends Scene {
    create(key) {
        let locationData = key;                 //Making alias
        this.engine.setText(locationData.Text); // Reading text field
        
        if (locationData == this.engine.storyData.World["Tub"]){
            this.engine.storyData.World["Tub"].Text = "There are " + (Math.random()*1000) + " gallons of water in here";
        }
        //Key mechanism -- lowk this should be unlocking all ".Keys in all objects"
        if (locationData == this.engine.storyData.World["Carpet"]){
            console.log(this.engine.storyData.World["Bathroom"].Keys[0].Unlocked);
            this.engine.storyData.World["Bathroom"].Keys[0].Unlocked = "true";
        }


        if(locationData.Edges.length != 0) {        //Make labels for buttons different than the title of next place
            for(let choice of locationData.Edges) { 
                this.engine.addChoice(choice,this.engine.storyData.World[choice]);
            }
            for(let room of locationData.Keys){
                if (room.Unlocked == "true"){
                    console.log(room);
                    this.engine.addChoice(room.Title,this.engine.storyData.World[room.Title])
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.gotoScene(Location, choice);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

//Start -- Initial transitor 
class Start extends Scene {
    create() {
        this.engine.setText(this.engine.storyData.Intro);
        setTimeout(() => {
            this.engine.addChoice("Begin the story");
        },"2000");
    }

    handleChoice() {
        console.log(this.engine.storyData.World.Living_room);
        this.engine.gotoScene(Location, this.engine.storyData.World.Living_room); // TODO: replace this text by the initial location of the story
    }
}

//Ending point
class End extends Scene {
    create() {
        this.engine.setText("The end");
    }
}
