import  {canvasHeight,canvasWidth , sprites,ctx} from './variaveisGlobais.js'


const medalhas={
    medalhaEscolhidaPosicaoSpriteX:0 ,
    medalhaEscolhidaPosicaoSpriteY:124,
    imgSpriteMedalhaSizeX:45,
    imgSpriteMedalhaSizeY:45,
    canvasPosicaoX:canvasWidth>=350 ? 93 : 73,
    canvasPosicaoY:190,
    canvasSizeX:42,
    canvasSizeY:42,

    desenharMedalha(){
        ctx.drawImage(
            sprites,
            this.medalhaEscolhidaPosicaoSpriteX,this.medalhaEscolhidaPosicaoSpriteY,
            this.imgSpriteMedalhaSizeX,this.imgSpriteMedalhaSizeY,
            this.canvasPosicaoX,this.canvasPosicaoY,
            this.canvasSizeX,this.canvasSizeY
        )
    },escolherMedalha(pontos,recorde){
        if(pontos<10 ){//bronze
            this.medalhaEscolhidaPosicaoSpriteX=48   //48
            this.medalhaEscolhidaPosicaoSpriteY=124  //124
        }
        if(pontos>=10 && pontos<20 ){// prata
            this.medalhaEscolhidaPosicaoSpriteX=48  //48
            this.medalhaEscolhidaPosicaoSpriteY=78 //78
        }
        if(pontos>=20 && pontos<30){// ouro
            this.medalhaEscolhidaPosicaoSpriteX=0 //0
            this.medalhaEscolhidaPosicaoSpriteY=124 //124
        }
        if(pontos>=30 ){// platina
            this.medalhaEscolhidaPosicaoSpriteX=0  // 0
            this.medalhaEscolhidaPosicaoSpriteY=78 // 78
        }
    }
}
export {medalhas}