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

const arrCanos=[]
let frames=0

const criaCano = class{
    constructor(){
        

    }
}

/*
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
  
  

 */