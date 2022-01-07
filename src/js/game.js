import  {framesObj,positionClick} from './variaveisGlobais.js'
import {chao} from './cenario.js'
import {telas} from './telas.js'

let telaAtiva={}
function mudarTela(InicioOuGame){ //muda a tela do jogo
    telaAtiva=InicioOuGame 
}

function gameStarted(){ // looping do jogo
    telaAtiva.movimentar()
    telaAtiva.desenhar()
    requestAnimationFrame(gameStarted) //isso faz a mágica acontecer!!     
}
mudarTela(telas.inicio)
gameStarted() 


document.addEventListener('click', (e)=>{
    positionClick.clickPosicaoX=e.offsetX
    positionClick.clickPosicaoY=e.offsetY
    if( telaAtiva.click() ){ 
        framesObj.frames=0
    }
})

export {telas,chao,mudarTela}
