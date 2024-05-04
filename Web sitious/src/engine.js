

//The ADT which handles Scene transition and display----------------------
class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.querySelector("#text");
        this.actionsContainer = document.querySelector("#controls");

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        //console.log(this.actionsContainer);
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    setText(title) {
        this.header.innerHTML = "";
        typingEffect(this.header,title);
    }

}

//Scene Template with connection to engine------------------
class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}

//Typing effect -------------------------------------------
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms));
}

async function typingEffect(element,string) {
    for (let i=0; i < string.length; i++){
        element.innerHTML += string[i];
        await sleep(50);
    }
}


