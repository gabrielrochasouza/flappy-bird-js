import {canvasHeight,canvasWidth , sprites,ctx,
    span,recorde,audioPular,audioPonto,
    booleanoVerif,pontuacaoObj,framesObj,
    variaveisGlobais,positionClick} from './variaveisGlobais.js'

import {mudarTela} from './game.js'
import {flappyBird} from './flappyBird.js'
import {chao, planoFundo} from './cenario.js'
import {medalhas} from './medalhas.js'
import {criaCanos} from './criaCano.js'
import {telaInicial} from './telaInicial.js'


    const telas={
        inicio:{// tela inicial
            desenhar(){
                ctx.fillStyle='#70c5ce'
                ctx.fillRect(0,0,canvasWidth,canvasHeight)
                planoFundo.desenhaFundo()
                chao.desenharChao()
                
                flappyBird.desenharFlappyBird()
                telaInicial.desenharTelaInicial()
            },
            movimentar(){
                flappyBird.animacao()
                flappyBird.flutuar()
            },
            click(){
                span.innerText=0
                span.classList.remove('hidden')
                let varAux=Math.floor((canvasWidth-flappyBird.largura)/2)
                flappyBird.posicaoX= varAux%2==0 ? varAux : varAux-1  
                audioPular.play()
    
                mudarTela(telas.ready)
                return true
            }
    
        },
        game:{ //jogo
            detectarColisao(){
                if(flappyBird.posicaoY+flappyBird.altura>chao.canvasPosicaoY){
                    return true
                }
                let larguraFlappyBird=flappyBird.largura
                let posicaoXFlappyBird=flappyBird.posicaoX
                
                let cabecaFlappyBird=canvasHeight - flappyBird.posicaoY
                let pataFlappyBird=  cabecaFlappyBird-flappyBird.altura
    
                
    
                for(let i=0; i<variaveisGlobais.canos.length ; i++){
                    let { cimaCanvasPosicaoY, espacamentoCano, baixoCanvasPosicaoX,cimaCanvasSizeX } = variaveisGlobais.canos[i]
    
                    if( posicaoXFlappyBird+larguraFlappyBird>=baixoCanvasPosicaoX &&
                        posicaoXFlappyBird<baixoCanvasPosicaoX+cimaCanvasSizeX ){
                        if(pataFlappyBird<= canvasHeight -cimaCanvasPosicaoY){
                            return true
                        }
                        if(  flappyBird.posicaoY <=  cimaCanvasPosicaoY-espacamentoCano ){
                            return true
                        }
                        if( posicaoXFlappyBird ==baixoCanvasPosicaoX ){//marca pontos
                            pontuacaoObj.pontuacao++
                            span.innerText=pontuacaoObj.pontuacao
                            if(pontuacaoObj.pontuacao>pontuacaoObj.pontuacaoRecorde) booleanoVerif.bateuRecorde=true
                            pontuacaoObj.pontuacaoRecorde=pontuacaoObj.pontuacaoRecorde<pontuacaoObj.pontuacao ? pontuacaoObj.pontuacao : pontuacaoObj.pontuacaoRecorde 
                            if(pontuacaoObj.pontuacaoRecorde>0) recorde.innerText=pontuacaoObj.pontuacaoRecorde
                            audioPonto.play()
                        }
                    }
                }
                return false
            },
            desenhar(){
                ctx.fillStyle='#70c5ce'
                ctx.fillRect(0,0,canvasWidth,canvasHeight)
                planoFundo.desenhaFundo()
                this.animacaoCanosDesenho()
                chao.desenharChao()
                flappyBird.desenharFlappyBird()
               
            },
            movimentar(){
                flappyBird.movimentoUpdate()
                flappyBird.animacao()
                telas.game.animacaoCanosMovimento()
            },
            click(){
                flappyBird.pular()
            },
            animacaoCanosDesenho(){
                framesObj.timeToStart++
                
                if(framesObj.timeToStart>50){
                    framesObj.frames++
                    if(framesObj.frames%81==80 && booleanoVerif.gameOver==false){
                        variaveisGlobais.canos.push( criaCanos() )
                        framesObj.frames=0
                    }
                    for(let i=0; i<variaveisGlobais.canos.length ; i++){
                        variaveisGlobais.canos[i].desenhaCano()
                    }
                    telas.game.retirarCano()
                }
            },
            animacaoCanosMovimento(){
                if(framesObj.timeToStart>100){
                    for(let i=0; i<variaveisGlobais.canos.length ; i++){
                        variaveisGlobais.canos[i].movimentarEmX()
                    }
                }
            },
            retirarCano(){
                for(let i=0; i<variaveisGlobais.canos.length ; i++){
                    if( variaveisGlobais.canos[i].cimaCanvasPosicaoX<-variaveisGlobais.canos[i].cimaCanvasSizeX ){
                        variaveisGlobais.canos.shift() 
                    }
                }
            }
        },
        youLose:{//tela de gameover
            desenhar(){
                ctx.fillStyle='#70c5ce'
                ctx.fillRect(0,0,canvasWidth,canvasHeight)
                planoFundo.desenhaFundo()
                telas.game.animacaoCanosDesenho()
                chao.desenharChao()
                flappyBird.desenharFlappyBird()
                ctx.drawImage(
                    sprites,
                    132,152,
                    236,206,
                    (canvasWidth-236)/2,100,
                    236,206
                )
                if( booleanoVerif.bateuRecorde ){
                    medalhas.escolherMedalha(pontuacaoObj.pontuacao,pontuacaoObj.pontuacaoRecorde)
                    medalhas.desenharMedalha()
                }
            },
            movimentar(){
                if(flappyBird.posicaoY+flappyBird.altura>chao.canvasPosicaoY ) return
                flappyBird.rotacionar()
                flappyBird.velocidade=flappyBird.gravidade+flappyBird.velocidade
                flappyBird.posicaoY+=flappyBird.velocidade
            },
            click(){
                /*posicao botao
                    esquerda cima:
                        x:110  y:270 
                    esquerda baixo:
                        x:110  y:310  
                    direita cima:
                        x:230  y:270 
                    direita baixo:
                        x:230  y:310 
                    ----------------
                        130<x<230
                        270<y<310
                    variaveis de verificacao
                        clickPosicaoX
                        clickPosicaoY
                */ 
                if( positionClick.clickPosicaoX<=230 && positionClick.clickPosicaoX >=110 &&
                    positionClick.clickPosicaoY>=270 && positionClick.clickPosicaoY<=310   ){
                        booleanoVerif.bateuRecorde=false
                        booleanoVerif.started=false
                        booleanoVerif.gameOver=false
    
                        flappyBird.angle=0
                        flappyBird.posicaoY=150
                        flappyBird.posicaoX=20
                        flappyBird.velocidade=0
                        
                        framesObj.timeToStart=0
                        pontuacaoObj.pontuacao=0
                        variaveisGlobais.canos=[]
    
                        span.classList.add('hidden')
                        recorde.classList.add('hidden')
                        span.classList.remove('mudarPosicao')
                        
                        mudarTela(telas.inicio)
                    }
                
                return true
            }
        },
        ready:{// pronto para o primeiro pulo
            desenhar(){
                ctx.fillStyle='#70c5ce'
                ctx.fillRect(0,0,canvasWidth,canvasHeight)
                planoFundo.desenhaFundo()
                chao.desenharChao()
                
                flappyBird.desenharFlappyBird()
            },
            movimentar(){
                flappyBird.animacao()
                flappyBird.flutuar()
            },
            click(){
                booleanoVerif.started=true
                flappyBird.pular()
                mudarTela(telas.game)
                
                return true
            }
    
        }
    }
export {telas}

