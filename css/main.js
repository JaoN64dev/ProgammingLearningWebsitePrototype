  const canvas = document.getElementById("Game");
  const ctx = canvas.getContext("2d");
  const RunButton = document.getElementById("Run");
  const SectionDiv = document.getElementById("ProgrammingSec");
  const dialogueContainer = document.getElementById("dialogue");
  var level = 0;

  //TODAS AS CLASSES!
  import Dog from './blocks.js';
  // ============================

  const storyDialogues = [
    "Olá! Então é...",
    "Bem meu papel é te ajudar, ce quiser um help estou aqui",
    "Seu primeiro desafio é... so escreve algo ali e rodar o codigo",
    "E é isso '-'",
  ];

  let currentDialogueIndex = 0;

  function displayCurrentDialogue() {
    if (currentDialogueIndex < storyDialogues.length) {
      dialogueContainer.innerText = storyDialogues[currentDialogueIndex];
      currentDialogueIndex++;
    }
  }

  //Classe do bob
  class Blob {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.sprite = new Image();
      this.sprite.onload = () => {
        console.log("Sprite image loaded successfully");
        this.draw();
      };
      this.sprite.src = "images/Blob.png";
    }

    draw() {
      ctx.drawImage(this.sprite, this.x, this.y, 50, 50);
    }

    flyToMouse(mouseX, mouseY) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const speed = 4; // Adjust as needed

      this.x += (dx / Math.sqrt(dx ** 2 + dy ** 2)) * speed;
      this.y += (dy / Math.sqrt(dx ** 2 + dy ** 2)) * speed;

      // Clear only the region where the blob was previously drawn
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();
    }
  }

  let myBlob;



  //Mostra o texto do codigo
  function ShowBlock(Index) {
    //Pega os codigos do codes.json
    fetch('Codes.json')
      // Achou o json
      .then(response => {
        //Resposta ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      //Use a data do json
      .then(data => {
        if (data[Index]){
          const code = data[Index].code;
          //Isere o codigo no html
          SectionDiv.innerHTML = code;
        //Encaso deu error
        } else {
          console.error('Index not found in JSON data');
        }
      })
  }

  //Autoexplicativo
  function startGame() {
    alert("Olá! Bem meu negocio quebrou.. de falar e preciso de vc!")
    
    myBlob = new Blob();
    level = 1

    ShowBlock(level);
    alert("É bem simples esse level! É so colocar algo que aparece na tela")

    level = 2 
    ShowBlock(level)

    alert("Agora temos variaveis! Putz.. bem é so ver o NOME, da variavel! E da um print")

  }




  //Aqui é sobre o bob seguir o mouse!
  canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (myBlob) {
      myBlob.flyToMouse(mouseX, mouseY);
    }
  });
  //Traduzido literalmente
  RunButton.addEventListener("click", () => {
    // Fetch the JSON data
    fetch('Codes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const LevelWithBlocks = data[level];
            const BlocksInLV = LevelWithBlocks.BlocksIn;
            
            for (let i = 0; i < BlocksInLV; i++) { // Fix loop condition
              console.log(LevelWithBlocks)
                const BlockIndex = LevelWithBlocks.Blocks[i];
                const ParamterIndex = SectionDiv.querySelector("#Block_" + i);
     

                const TypeIndex = LevelWithBlocks.Types[i];
                console.log(LevelWithBlocks)
                import('./blocks.js').then(module => {
                  if(TypeIndex == "Func"){
                    module.default[BlockIndex](level,ParamterIndex.value)
                  }else {
                
                    const OtherClass = module.default[BlockIndex]
                    const instance = new OtherClass()
  
                    instance[level,ParamterIndex.value]()
                  }
                }).catch(error => {
                    console.error(error)
                    alert("FATAL ERROR, SEND TO JOAOESPERLEITE@GMAIL.COM! :", error);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
  });
  

  // Ensure startGame() is called after DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", startGame);
