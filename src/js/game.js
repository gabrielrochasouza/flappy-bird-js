const canvas= document.querySelector('canvas')
canvas.width= (window.innerWidth<=360) ? window.innerWidth :360
canvas.height=500
const canvasWidth=canvas.width
const canvasHeight=canvas.height
const sprites=new Image()
sprites.src='src/img/sprites.png'
const ctx=canvas.getContext('2d')

/**Booleanos verificadores */
let started=false
let gameOver=false
let passouIntervalo=false
let bateuRecorde=false
/**************** */

let frames=0
let timeToStart=0
let pontuacao=0
let pontuacaoRecorde=0
const span=document.querySelector('span')
const recorde=document.getElementById('recorde')

/**Audio */
const audioPular=new Audio()
const audioCaiu=new Audio()
const audioPonto=new Audio()
audioPular.src='src/audio/efeitos_pulo.wav'
audioCaiu.src='src/audio/efeitos_caiu.wav'
audioPonto.src='src/audio/efeitos_ponto.wav'

/***********/
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
    velocidadeAngular: 4, // grau por frame

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
            gameOver=true  
            started=false     
            this.velocidade=0

            audioCaiu.play()
            mudarTela(telas.youLose)

            recorde.classList.remove('hidden')
            span.classList.add('mudarPosicao')
            passouIntervalo=true 
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
        if(this.velocidade>=0 && this.angle<90*Math.PI/180) {
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

const chao={
    largura:224, 
    altura:121,
    imgPosicaoX:0,
    imgPosicaoY:610,
    imgSizeX:224 ,
    imgSizeY:121 ,
    canvasPosicaoX: 0,
    canvasPosicaoY: canvasHeight-100,
    desenharChao(){
        if(gameOver==false){
            //flappyBird.animacao()
        }
        if(gameOver==false && started==false) chao.movimentoChao()
        
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

function randomNum(){
    return Math.random()*(350-150)+150
}

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

const variaveisGlobais={}
variaveisGlobais.canos=[]

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
    
    
let telaAtiva={}
function mudarTela(InicioOuGame){
    telaAtiva=InicioOuGame //InicioOuGame é um objeto ex: telas.inicio ou telas.game
}
const telas={
    inicio:{
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
    game:{
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
                        pontuacao++
                        span.innerText=pontuacao
                        if(pontuacao>pontuacaoRecorde) bateuRecorde=true
                        pontuacaoRecorde=pontuacaoRecorde<pontuacao ? pontuacao : pontuacaoRecorde 
                        if(pontuacaoRecorde>0) recorde.innerText=pontuacaoRecorde
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
            telas.game.animacaoCanosMovimento()
        },
        click(){
            flappyBird.pular()
        },
        animacaoCanosDesenho(){
            timeToStart++
            
            if(timeToStart>50){
                frames++
                if(frames%81==80 && gameOver==false){
                    variaveisGlobais.canos.push( criaCanos() )
                    frames=0
                }
                for(let i=0; i<variaveisGlobais.canos.length ; i++){
                    variaveisGlobais.canos[i].desenhaCano()
                }
                telas.game.retirarCano()
            }
        },
        animacaoCanosMovimento(){
            if(timeToStart>100){
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
    youLose:{
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
            
            
            if( bateuRecorde ){
                medalhas.escolherMedalha(pontuacao,pontuacaoRecorde)
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
            if( clickPosicaoX<=230 && clickPosicaoX >=110 &&
                clickPosicaoY>=270 && clickPosicaoY<=310   ){
                    bateuRecorde=false
                    started=false
                    gameOver=false

                    flappyBird.angle=0
                    flappyBird.posicaoY=150
                    flappyBird.posicaoX=20
                    flappyBird.velocidade=0
                    
                    timeToStart=0
                    pontuacao=0
                    variaveisGlobais.canos=[]

                    span.classList.add('hidden')
                    recorde.classList.add('hidden')
                    span.classList.remove('mudarPosicao')
                    
                    mudarTela(telas.inicio)
                }
            
            return true
        }
    },
    ready:{
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
            started=true
            flappyBird.pular()
            mudarTela(telas.game)
            
            return true
        }

    }
}

function gameStarted(){
    telaAtiva.movimentar()
    telaAtiva.desenhar()
    requestAnimationFrame(gameStarted)      
}
mudarTela(telas.inicio)
gameStarted()

let clickPosicaoX
let clickPosicaoY

document.addEventListener('click', (e)=>{
    clickPosicaoX=e.offsetX
    clickPosicaoY=e.offsetY
    if( telaAtiva.click() ){ 
        frames=0
    }
})
