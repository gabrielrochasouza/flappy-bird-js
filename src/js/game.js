const canvas= document.querySelector('canvas')
canvas.width= (window.innerWidth<=360) ? window.innerWidth :360
canvas.height=500
const canvasWidth=canvas.width
const canvasHeight=canvas.height
const sprites=new Image()
sprites.src='src/img/sprites.png'
const ctx=canvas.getContext('2d')

let started=false
let gameOver=false

/**Audio */
const audioPular=new Audio()
const audioCaiu=new Audio()
audioPular.src='../../audio/efeitos_pulo.wav'
audioCaiu.src='../../audio/efeitos_caiu.wav'

/***********/
const flappyBird={
    largura:33,
    altura:24,
    posicaoX:20,
    posicaoY: 60,
    spritePosicaoX:0,
    spritePosicaoY:0,
    velocidade:0,
    gravidade: 0.25,
    desenharFlappyBird(){
        ctx.drawImage(
            sprites,
            this.spritePosicaoX,this.spritePosicaoY,
            this.largura,this.altura,
            this.posicaoX,this.posicaoY,
            this.largura,this.altura
        )
    },
    movimentoUpdate(){
        if(this.posicaoY+this.altura>chao.canvasPosicaoY){     
            gameOver=true  
            started=false     
            audioCaiu.play()
            mudarTela(telas.inicio)
            return
        }
        chao.movimentoChao()
        flappyBird.animacao()
        this.velocidade=this.gravidade+this.velocidade
        this.posicaoY+=this.velocidade
    },
    pular(){
        flappyBird.velocidade= -7
        audioPular.play()
    },

    quadros:[0,26,52],
    timer:0,
    repeticao: 30,
    indice:0,
    animacao(){
        this.timer++
        let intervaloRepetidor=this.timer%this.repeticao

        if(intervaloRepetidor < this.repeticao/3 && intervaloRepetidor >= 0 ) this.indice=0
        if(intervaloRepetidor < 2*this.repeticao/3 && intervaloRepetidor >= this.repeticao/3 ) this.indice=1
        if(intervaloRepetidor < this.repeticao && intervaloRepetidor >= 2*this.repeticao/3 ) this.indice=2 

        this.spritePosicaoY= this.quadros[this.indice]
    }
    
}

const chao={
    largura:canvasWidth+40, 
    altura:121,
    imgPosicaoX:0,
    imgPosicaoY:610,
    imgSizeX:224 ,
    imgSizeY:121 ,
    canvasPosicaoX: 0,
    canvasPosicaoY: canvasHeight-100,
    desenharChao(){
        if(gameOver==false){
            flappyBird.animacao()
        }
        if(gameOver==false && started==false) chao.movimentoChao()
        
        ctx.drawImage(
            sprites,
            this.imgPosicaoX,this.imgPosicaoY,//posicao para pegar imagem em sprites
            this.imgSizeX,this.imgSizeY, //tamanho do recorte da imagem em sprites
            this.canvasPosicaoX,this.canvasPosicaoY,//posicao da imagem no canvas
            this.largura,this.altura //tamanho da imagem no canvas
        )
    },
    repetir:27,
    incremento:0,
    movimentoChao(){
        this.incremento+=2
        let deslocamento=this.incremento%this.repetir
        this.canvasPosicaoX=-deslocamento
    }
}


const planoFundo={
    larguraCanvas:canvasWidth,
    alturaCanvas:230,
    imgPosicaoX:390,
    imgPosicaoY:0,
    imgSizeX:277,
    imgSizeY:204,
    canvasPosicaoX:0,
    canvasPosicaoY:canvasHeight-220,
    desenhaFundo(){
        ctx.drawImage(
        sprites,
        this.imgPosicaoX,this.imgPosicaoY,
        this.imgSizeX,this.imgSizeY,
        this.canvasPosicaoX,this.canvasPosicaoY,
        this.larguraCanvas,this.alturaCanvas
        )
    }
}

let larguraTelaInicial=180

const telaInicial={
    canvasSizeX:larguraTelaInicial ,
    canvasSizeY: 152,
    canvasPosicaoX: (canvasWidth -larguraTelaInicial)/2,
    canvasPosicaoY:130 ,
    imgPosicaoX:134,
    imgPosicaoY: 0,
    imgSizeX: 178,
    imgSizeY:150,
    desenharTelaInicial(){
        ctx.drawImage(
            sprites,
            this.imgPosicaoX,this.imgPosicaoY,
            this.imgSizeX,this.imgSizeY,
            this.canvasPosicaoX,this.canvasPosicaoY,
            this.canvasSizeX,this.canvasSizeY
        )
    }

}
let espacamentoCano=120
let alturaDoCano=400

function randomNum(){
    return Math.random()*(350-150)+150
}

const canosCima={
    cimaCanvasSizeX: 55,//tamanho X do cano canvas
    cimaCanvasSizeY: 500,//tamanho Y do cano canvas
    cimaCanvasPosicaoX: canvasWidth,//posicao X do cano canvas
    cimaCanvasPosicaoY:canvasHeight-randomNum(),//posicao Y do cano canvas
    cimaImgPosicaoX:0,
    cimaImgPosicaoY:169,
    cimaImgSizeX:54,
    cimaImgSizeY:403,
    desenhaCanoCima(){
        ctx.drawImage(
            sprites,
            this.cimaImgPosicaoX,this.cimaImgPosicaoY,
            this.cimaImgSizeX,this.cimaImgSizeY,
            this.cimaCanvasPosicaoX,this.cimaCanvasPosicaoY,
            this.cimaCanvasSizeX,this.cimaCanvasSizeY
        )
    },
    movimentarEmX(){
        this.cimaCanvasPosicaoX-=2
    }
}
const canoBaixo={
    baixoCanvasSizeX: 55,//tamanho X do cano canvas
    baixoCanvasSizeY: 500,//tamanho Y do cano canvas
    baixoCanvasPosicaoX: canvasWidth,//posicao X do cano canvas
    baixoCanvasPosicaoY:-canvasHeight-espacamentoCano+canosCima.cimaCanvasPosicaoY,//posicao Y do cano canvas
    baixoImgPosicaoX:52,
    baixoImgPosicaoY:170,
    baixoImgSizeX:54,
    baixoImgSizeY:403,
    desenhaCanoBaixo(){
        ctx.drawImage(
            sprites,
            this.baixoImgPosicaoX,this.baixoImgPosicaoY,
            this.baixoImgSizeX,this.baixoImgSizeY,
            this.baixoCanvasPosicaoX,this.baixoCanvasPosicaoY,
            this.baixoCanvasSizeX,this.baixoCanvasSizeY
        )
    },
    movimentarEmX(){
        this.baixoCanvasPosicaoX-=2
    }
}


let telaAtiva={}
function mudarTela(InicioOuGame){
    telaAtiva=InicioOuGame //InicioOuGame é um objeto ex: telas.inicio ou telas.game
}

const telas={
    inicio:{
        desenhar(){
            ctx.fillStyle='lightblue'
            ctx.fillRect(0,0,canvasWidth,canvasHeight)
            planoFundo.desenhaFundo()
            chao.desenharChao()

            
            flappyBird.desenharFlappyBird()
            telaInicial.desenharTelaInicial()
        },
        movimentar(){
            //flappyBird.animacao()
            //chao.movimentoChao()
        },
        click(){
            return true
        }
    },
    game:{
        desenhar(){
            ctx.fillStyle='lightblue'
            ctx.fillRect(0,0,canvasWidth,canvasHeight)
            planoFundo.desenhaFundo()
            
            canoBaixo.desenhaCanoBaixo()
            canosCima.desenhaCanoCima()
            
            chao.desenharChao()
            
            flappyBird.desenharFlappyBird()
        },
        movimentar(){
            //chao.movimentoChao()
            //flappyBird.animacao()
            flappyBird.movimentoUpdate()
            canoBaixo.movimentarEmX()
            canosCima.movimentarEmX()
        },
        click(){
            flappyBird.pular()

        }
    },
    youLose:{

    }
}


const arrCanos=[]


function gameStarted(){
    telaAtiva.desenhar()
    telaAtiva.movimentar()

    requestAnimationFrame(gameStarted)      
}
mudarTela(telas.inicio)
gameStarted()



document.addEventListener('click', ()=>{
    if( telaAtiva.click() ){
        started=true
        console.log('tela do jogo ativada')
        mudarTela(telas.game)
        flappyBird.posicaoY=60
        flappyBird.velocidade=0
    }else{
        
        console.log('pulou')
        telaAtiva.click()
    }
})
