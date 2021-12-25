
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
            mostrarTelaInicial()
            this.desenharFlappyBird()
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
export {ctx, telaInicial,flappyBird,planoFundo,chao}