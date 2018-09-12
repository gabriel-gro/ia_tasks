quartos = [{estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}] // True == Limpo; False == Sujo
modoAutomatico = false
quartoAtual = 0
quartoAnterior = 0

window.onload = function() {
    setInterval(function(){
        if(modoAutomatico){
            idQuarto = parseInt((Math.random() * 42 * 10) % 5)
            if(idQuarto !== 4 && idQuarto !== quartoAtual){
                sujaQuarto(idQuarto)
            }
        }
    }, 2000)

    setInterval(function(){
        quartos[0].tempo++
        quartos[1].tempo++
        quartos[2].tempo++
        quartos[3].tempo++
    },1000)

    setInterval(function(){
        escolheQuarto().then((resultado) => {
            proximoQuarto = resultado
            console.log(quartoAnterior, quartoAtual, proximoQuarto)
            vaiParaOQuatro(proximoQuarto)
            if (!quartos[quartoAtual].estaLimpo){
                limpaQuarto(quartoAtual)
            }
        })
    },3000)
}

function vaiParaOQuatro(idQuarto){
    quartoAnterior = quartoAtual
    quartoAtual = idQuarto
    robo = document.getElementById("robo")
    switch(idQuarto){
        case 0:
            $('#robo').animate({top: '3px',left: '-20px'}, 2000);
            break;
        case 1:
            $('#robo').animate({top: '3px', left: '270px'}, 2000);
            break;
        case 2:
            $('#robo').animate({top: '254px',left: '270px'}, 2000);
            break;
        case 3:
            $('#robo').animate({top: '254px',left: '-20px'}, 2000);
            break;
    }
}

function toggleModoAutomatico(){
    modoAutomatico = !modoAutomatico;
    if (modoAutomatico){
        document.getElementById("toggleModoAutomatico").innerHTML = "Modo automático = ON"
    } else {
        document.getElementById("toggleModoAutomatico").innerHTML = "Modo automático = OFF"
    }
    
}

function sujaQuarto(id){
    quartos[id].estaLimpo = false
    quarto = document.getElementById("quarto"+id)
    quarto.style.backgroundColor = "red"
    document.getElementById("legendaQuarto"+id).innerHTML = "Sujo!"
}

function limpaQuarto(id){
    quarto = document.getElementById("quarto"+id)
    document.getElementById("legendaQuarto"+id).innerHTML = "Limpando..."
    setTimeout(function(){
        quarto.style.backgroundColor = "white"
        document.getElementById("legendaQuarto"+id).innerHTML = "Limpo"
        quartos[id].estaLimpo = true
        quartos[id].tempo = 0
    }, 2000)

}

function escolheQuarto(){
    return new Promise((resolve,reject) => {
        idMaiorTempo = 0
        maiorTempo = 0
        console.log(quartos)
        quartos.forEach((quarto, index) => {
        if (quarto.tempo > maiorTempo && index !== quartoAtual && index !== quartoAnterior ){
            idMaiorTempo = index
            maiorTempo = quarto.tempo
        }
        });
        resolve(idMaiorTempo)
    })
    
}