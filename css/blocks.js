// Inside blocks.js

var Bark = new Audio('../sounds/Bark.mp3');
const canvas = document.getElementById("Game");
const ctxs = canvas.getContext("2d");
var PrintDid = false
function GetLevelData(level){
    return fetch('Codes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data[level];
        });
}

export function Print(level,text){
    GetLevelData(level)
        .then(LevelData => {
            console.log(LevelData);
            if(LevelData.hasOwnProperty('Var') && LevelData.Var === true){
                if(LevelData.hasOwnProperty(text))
                {
                    console.log(LevelData[text])
                    ctxs.fillText(LevelData[text], 20, 20);
                } else {
                    console.log(LevelData[text])
                    alert("Nome da variavel incorreto!");
                    
                }
            }
        
            ctxs.fillText(text, 20, 20);
        })
        .catch(error => {
            console.error('Error fetching level data:', error);
        });
}



export function DoTimes(level , what) {
    const Doing = new Name();
    for (let i = 0; i < Times; i++) {
        Doing[what]();
    }
}


export class Dog {
    constructor() {
        this.Name = "Dog";
        this.y = 400;
        this.x = 200;
        this.image = new Image();
        this.image.src = "images/dog.png"; // Preload the image
    }

    Spawn() {
        alert("What fuck!")
        for (let i = 400; i > 1; i--) {
            setTimeout(() => {


                ctxs.drawImage(this.image, this.x, i, 50, 50); // Use the preloaded image
                ctxs.clearRect(0, 0, canvas.width, canvas.height);
            }, 14)
        }
    }

    Bark() {
        Bark.play();
    }
}

export class Cat {
    constructor() {
        this.Name = "Cat";
        this.y = 400;
        this.x = 200;
    }

    Bark() {
        console.log("Meow!");
    }
}

// Add other classes and functions as needed...

export default { DoTimes,  Dog, Cat , Print}; // Export all classes and functions
