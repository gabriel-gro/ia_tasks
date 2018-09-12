quartos = [{estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}] // True == Limpo; False == Sujo
modoAutomatico = false

window.onload = function() {

    quartoAtual = 0
    quartoAnterior = 0

    setInterval(function(){
        if(modoAutomatico){
            idQuarto = parseInt((Math.random() * 42 * 10) % 5)
            if(idQuarto !== 4 && idQuarto !== quartoAtual){
                sujaQuarto(idQuarto)
            }
        }
    }, 3000)

    setInterval(function(){
        quartos[0].tempo++
        document.getElementById("tempoQuarto0").innerHTML = "Tempo: " + quartos[0].tempo
        quartos[1].tempo++
        document.getElementById("tempoQuarto1").innerHTML = "Tempo: " + quartos[1].tempo
        quartos[2].tempo++
        document.getElementById("tempoQuarto2").innerHTML = "Tempo: " + quartos[2].tempo
        quartos[3].tempo++
        document.getElementById("tempoQuarto3").innerHTML = "Tempo: " + quartos[3].tempo
    },1000)

    setInterval(function(){
        escolheQuarto(quartoAtual, quartoAnterior).then((resultado) => {
            proximoQuarto = resultado
            vaiParaOQuatro(quartoAtual, proximoQuarto).then((quartoAntAtual) => {
                quartoAnterior = quartoAntAtual[0]
                quartoAtual = quartoAntAtual[1]
                setTimeout(function() {
                    if (!quartos[quartoAtual].estaLimpo){
                        limpaQuarto(quartoAtual)
                    }
                }, 2000);
                
            })
        })
    },4000)
}

function vaiParaOQuatro(quartoAtual, proximoQuarto){
    return new Promise((resolve,reject) => {
        quartoAnterior = quartoAtual
        quartoAtual = proximoQuarto
        robo = document.getElementById("robo")
        switch(proximoQuarto){
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

        resolve([quartoAnterior, quartoAtual])
    })
}

function toggleModoAutomatico(){
    modoAutomatico = !modoAutomatico;
    if (modoAutomatico){
        document.getElementById("toggleModoAutomatico").innerHTML = "Modo sugeira = ON"
    } else {
        document.getElementById("toggleModoAutomatico").innerHTML = "Modo sugeira = OFF"
    }
    
}

function sujaQuarto(id){
    quartos[id].estaLimpo = false
    quarto = document.getElementById("quarto"+id)
    quarto.style.backgroundColor = "gray"
    document.getElementById("legendaQuarto"+id).innerHTML = "Sujo!"
}

function limpaQuarto(id){
    document.getElementById("legendaQuarto"+id).innerHTML = "Limpando..."
    setTimeout(function(){
        quarto = document.getElementById("quarto"+id)
        quarto.style.backgroundColor = "white"
        document.getElementById("legendaQuarto"+id).innerHTML = "Limpo"
        quartos[id].estaLimpo = true
        quartos[id].tempo = 0
    }, 2000)

}

function escolheQuarto(quartoAtual, quartoAnterior){
    return new Promise((resolve,reject) => {
        idMaiorTempo = 0
        maiorTempo = 0
        quartos.forEach((quarto, index) => {
        if (quarto.tempo > maiorTempo && index !== quartoAtual && index !== quartoAnterior ){
            idMaiorTempo = index
            maiorTempo = quarto.tempo
        }
        });
        resolve(idMaiorTempo)
    })
    
}