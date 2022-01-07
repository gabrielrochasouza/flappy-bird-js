import  {sprites,ctx,span,recorde,audioPular,audioCaiu} from './variaveisGlobais.js'

import {booleanoVerif } from './variaveisGlobais.js'
import {mudarTela} from './game.js'
import {telas} from './telas.js' 
import {chao} from './cenario.js'


const flappyBird={
    largura:33*1.2,
    altura:24*1.2,
    posicaoX:20,
    posicaoY: 150,
    spritePosicaoX:0,
    spritePosicaoY:0,
    spriteLargura:33,
    spriteAltura:24,
    velocidade:0,
    gravidade: 0.30,
    angle:0,
    velocidadeAngular: 7, // grau por frame

    desenharFlappyBird(){
        ctx.save()
        ctx.translate(this.posicaoX+this.largura/2,this.posicaoY+this.altura/2)
        ctx.rotate(this.angle)

        ctx.drawImage(
            sprites,
            this.spritePosicaoX,this.spritePosicaoY,
            this.spriteLargura,this.spriteAltura,
            -this.largura/2,-this.altura/2,
            this.largura,this.altura
        )
        ctx.restore()
    },
    movimentoUpdate(){
        if(  telas.game.detectarColisao()  ){     
            booleanoVerif.gameOver=true  
            booleanoVerif.started=false     
            this.velocidade=0

            audioCaiu.play()
            mudarTela(telas.youLose)

            recorde.classList.remove('hidden')
            span.classList.add('mudarPosicao')
            booleanoVerif.passouIntervalo=true 
            return
        }
        chao.movimentoChao()
        flappyBird.animacao()

        this.rotacionar()
        
        this.velocidade=this.gravidade+this.velocidade
        this.posicaoY+=this.velocidade
    },
    pular(){
        this.angle= -20 * Math.PI / 180
        flappyBird.velocidade= -6
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
        
    },
    rotacionar(){
        if(this.velocidade>=4 && this.angle<90*Math.PI/180) {
            this.angle+=this.velocidadeAngular*Math.PI/180
        }
    },
    
    flutuar(){
        
        if(this.velocidade>=1.2){
            this.velocidade=-this.velocidade 
        }else{
            this.velocidade+=0.03
        }
        this.posicaoY+=this.velocidade
    }
}

export {flappyBird}