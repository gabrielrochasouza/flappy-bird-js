import  {canvasHeight,canvasWidth , sprites,ctx} from './variaveisGlobais.js'
import {booleanoVerif } from './variaveisGlobais.js'


let larguraTelaInicial=180


const chao={
    largura:224, 
    altura:121,
    imgPosicaoX:0,
    imgPosicaoY:610,
    imgSizeX:224 ,
    imgSizeY:121 ,
    canvasPosicaoX: 0,
    canvasPosicaoY: canvasHeight-100,
    velocidadeChao:2,
    desenharChao(){
        if(booleanoVerif.gameOver==false){
            //flappyBird.animacao()
        }
        if(booleanoVerif.gameOver==false && booleanoVerif.started==false) chao.movimentoChao()
        
        ctx.drawImage(
            sprites,
            this.imgPosicaoX,this.imgPosicaoY,//posicao para pegar imagem em sprites
            this.imgSizeX,this.imgSizeY, //tamanho do recorte da imagem em sprites
            this.canvasPosicaoX,this.canvasPosicaoY,//posicao da imagem no canvas
            this.largura,this.altura //tamanho da imagem no canvas
        )
        ctx.drawImage(
            sprites,
            this.imgPosicaoX,this.imgPosicaoY,//posicao para pegar imagem em sprites
            this.imgSizeX,this.imgSizeY, //tamanho do recorte da imagem em sprites
            (this.canvasPosicaoX+this.largura ),this.canvasPosicaoY,//posicao da imagem no canvas
            this.largura,this.altura //tamanho da imagem no canvas
        )
    },
    repetir:27,
    incremento:0,
    movimentoChao(){
        this.incremento+=this.velocidadeChao
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


export {chao,planoFundo}