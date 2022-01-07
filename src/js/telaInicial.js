import {sprites,canvasWidth,ctx} from './variaveisGlobais.js'

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
export {telaInicial}