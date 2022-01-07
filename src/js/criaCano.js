import  {canvasHeight,canvasWidth , 
    sprites,ctx} from './variaveisGlobais.js'


function randomNum(){
    return Math.random()*(350-150)+150
}
function criaCanos(){

    const canos={
        cimaCanvasSizeX: 54,//tamanho X do cano canvas
        cimaCanvasSizeY: 500,//tamanho Y do cano canvas
        cimaCanvasPosicaoX: canvasWidth,//posicao X do cano canvas
        cimaCanvasPosicaoY:canvasHeight-randomNum(),//posicao Y do cano canvas
        cimaImgPosicaoX:0,
        cimaImgPosicaoY:169,
        cimaImgSizeX:52,
        cimaImgSizeY:403,
        
        baixoCanvasSizeX: 54,//tamanho X do cano canvas
        baixoCanvasSizeY: 500,//tamanho Y do cano canvas
        baixoCanvasPosicaoX: canvasWidth,//posicao X do cano canvas
        baixoCanvasPosicaoY:0,//posicao Y do cano canvas
        baixoImgPosicaoX:52,
        baixoImgPosicaoY:170,
        baixoImgSizeX:52,
        baixoImgSizeY:399,

        espacamentoCano: 120,
        
        gerarPosicaoAleatoriaY(){
            this.baixoCanvasPosicaoY=-canvasHeight-this.espacamentoCano+this.cimaCanvasPosicaoY
        },
        desenhaCano(){
            this.gerarPosicaoAleatoriaY()
            ctx.drawImage(
                sprites,
                this.cimaImgPosicaoX,this.cimaImgPosicaoY,
                this.cimaImgSizeX,this.cimaImgSizeY,
                this.cimaCanvasPosicaoX,this.cimaCanvasPosicaoY,
                this.cimaCanvasSizeX,this.cimaCanvasSizeY
            )
            ctx.drawImage(
                sprites,
                this.baixoImgPosicaoX,this.baixoImgPosicaoY,
                this.baixoImgSizeX,this.baixoImgSizeY,
                this.baixoCanvasPosicaoX,this.baixoCanvasPosicaoY,
                this.baixoCanvasSizeX,this.baixoCanvasSizeY
                )
        },
            movimentarEmX(){
                this.cimaCanvasPosicaoX-=2
                this.baixoCanvasPosicaoX-=2
            }
    }
    return canos
}
export {criaCanos}