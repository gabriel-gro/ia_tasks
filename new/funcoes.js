quartos = [{estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}, {estaLimpo: true, tempo: 0}] // True == Limpo; False == Sujo
modoAutomatico = false
quartoAtual = 0
quartoAnterior = 0

window.onload = function() {
    setInterval(function(){
        if(modoAutomatico){
            idQuarto = parseInt((Math.random() * 42 * 10) % 5)
            if(idQuarto !== 4){
                sujaQuarto(idQuarto)
            }
        }
    }, 3000)

    setInterval(function(){
        quartos[0].tempo++
        quartos[1].tempo++
        quartos[2].tempo++
        quartos[3].tempo++
    },1000)

    setInterval(function(){
        proximoQuarto = escolheQuarto()
        console.log(quartoAnterior, quartoAtual, proximoQuarto)
        vaiParaOQuatro(proximoQuarto)
        if (!quartoEstaLimpo(quartoAtual)){
            limpaQuarto(quartoAtual)
        }
    },3000)
    

    // quartoAnterior = quartoAtual
    // quartoAtual = idMaiorTempo
}

// function fluxoRobo(){
//     proximoQuarto = escolheQuarto()
//     console.log(proximoQuarto, quartoAnterior, quartoAtual)
//     quartoAnterior = quartoAtual
//     quartoAtual = proximoQuarto
//     vaiParaOQuatro(quartoAtual)
//     if (!quartoEstaLimpo(quartoAtual)){
//         limpaQuarto(quartoAtual)
//         console.log("quarto sujo foi limpado" + quartoAtual)
//     }
//     // console.log(proximoQuarto, quartoAnterior, quartoAtual)
// }

function quartoEstaLimpo(idQuarto){
    return quartos[idQuarto].estaLimpo
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
}

function sujaQuarto(id){
    quartos[id] = false
    quarto = document.getElementById("quarto"+id)
    quarto.style.backgroundColor = "red"
}

function limpaQuarto(id){
    quartos[id] = true
    quartos[id].tempo = 0
    quarto = document.getElementById("quarto"+id)
    quarto.style.backgroundColor = "white"
    console.log("limpou o quarto "+id)
}

function escolheQuarto(){
    idMaiorTempo = (quartoAtual + quartoAnterior)%4
    // maiorTempo = 0
    // quarto.tempo > maiorTempo && 
    quartos.forEach((quarto, index) => {
        if (index !== quartoAtual && index !== quartoAnterior ){
            idMaiorTempo = index
            // maiorTempo = quarto.tempo
        }
    });
    return idMaiorTempo
}