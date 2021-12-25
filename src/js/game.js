const canvas= document.querySelector('canvas')
canvas.width=300
canvas.height=500
const canvasWidth=canvas.width
const canvasHeight=canvas.height

const sprites=new Image()
sprites.src='src/img/sprites.png'


const ctx=canvas.getContext('2d')

const flappyBird={
    largura:33,
    altura:24,
    posicaoX:20,
    posicaoY: 40,
    velocidade:0,
    gravidade: 0.33,
    desenharFlappyBird(){
        ctx.drawImage(
            sprites,
            0,0,
            this.largura,this.altura,
            this.posicaoX,this.posicaoY,
            this.largura,this.altura
        )
    },
    movimentoUpdate(){
        if(this.posicaoY+this.altura>chao.canvasPosicaoY){     
            gameOver=true       
            mostrarTelaInicial()
            return
        }
        this.velocidade=this.gravidade+this.velocidade
        this.posicaoY+=this.velocidade
        
    },
    pular(){
        flappyBird.velocidade= -7
    }

}
const chao={
    largura:canvasWidth,
    altura:121,
    imgPosicaoX:0,
    imgPosicaoY:610,
    imgSizeX:224 ,
    imgSizeY:121 ,
    canvasPosicaoX: 0,
    canvasPosicaoY: canvasHeight-100,
    desenharChao(){
        ctx.drawImage(
            sprites,
            this.imgPosicaoX,this.imgPosicaoY,//posicao para pegar imagem em sprites
            this.imgSizeX,this.imgSizeY, //tamanho do recorte da imagem em sprites
            this.canvasPosicaoX,this.canvasPosicaoY,//posicao da imagem no canvas
            this.largura,this.altura //tamanho da imagem no canvas
        )
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
const telaInicial={
    canvasSizeX:220 ,
    canvasSizeY: 192,
    canvasPosicaoX:40,
    canvasPosicaoY:110,
    imgPosicaoX:134,
    imgPosicaoY: 0,
    imgSizeX: 207,
    imgSizeY:192,
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



function mostrarTelaInicial(){

    ctx.fillStyle='lightblue'
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
    planoFundo.desenhaFundo()
    chao.desenharChao()
    flappyBird.desenharFlappyBird()
    telaInicial.desenharTelaInicial()
    requestAnimationFrame(mostrarTelaInicial)
}
mostrarTelaInicial()

let clicked=false
let started=false
let gameOver=false

function gameStarted(){
    cancelAnimationFrame(mostrarTelaInicial)

    ctx.fillStyle='lightblue'
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
    planoFundo.desenhaFundo()
    
    canoBaixo.desenhaCanoBaixo()
    canosCima.desenhaCanoCima()
    canoBaixo.movimentarEmX()
    canosCima.movimentarEmX()

    chao.desenharChao()

    flappyBird.desenharFlappyBird()
    flappyBird.movimentoUpdate()
  
    if(clicked){
        flappyBird.pular()
    }
    clicked=false  
    
    requestAnimationFrame(gameStarted)  
    
 }





document.addEventListener('click', ()=>{
    clicked=true

    if(started==false)gameStarted()
    started=true

    if(gameOver){
        cancelAnimationFrame(gameStarted)
        gameStarted()
    }

})
