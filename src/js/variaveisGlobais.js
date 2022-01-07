const canvas= document.querySelector('canvas')
canvas.width= (window.innerWidth<=360) ? window.innerWidth :360
canvas.height=500
const canvasWidth=canvas.width
const canvasHeight=canvas.height
const sprites=new Image()
sprites.src='src/img/sprites.png'
const ctx=canvas.getContext('2d')

const booleanoVerif={
    started:false,
    gameOver:false,
    passouIntervalo:false,
    bateuRecorde:false,
}
const framesObj={
    frames:0,
    timeToStart:0
}
const pontuacaoObj={
    pontuacao:0,
    pontuacaoRecorde:0
}

const span=document.querySelector('span')
const recorde=document.getElementById('recorde')

/**Audio */
const audioPular=new Audio()
const audioCaiu=new Audio()
const audioPonto=new Audio()
audioPular.src='src/audio/efeitos_pulo.wav'
audioCaiu.src='src/audio/efeitos_caiu.wav'
audioPonto.src='src/audio/efeitos_ponto.wav'

const positionClick={
    clickPosicaoX:0,
    clickPosicaoY:0,
}

const variaveisGlobais={}
variaveisGlobais.canos=[]

export {canvas,canvasHeight,canvasWidth , sprites,ctx,
        span,recorde,audioPular,audioCaiu,audioPonto,
        booleanoVerif,pontuacaoObj,framesObj,
        variaveisGlobais,positionClick}