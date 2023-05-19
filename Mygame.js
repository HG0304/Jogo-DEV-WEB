/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

teclas = {};

// gerar balas ======> gerar randomicamente e aumentar a vel com o tempo
var bullet = {
    x: 100,
    y: 100,
    comprimento: 10,
    cor: "black",
    speed: 4,
    dirX: -1,
    dirY: 1,
    mod: 0
}


var player = {
    x: 10,
    y: canvas.height/2 - 60,
    altura: 120,
    largura: 20,
    cor: 'green',
    speed: 4,
    score: 0
}

document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
    console.log(teclas);
});

document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
    console.log(teclas);
});

// ctx.fillStyle = bullet.cor;
//     ctx.beginPath();
//     ctx.arc(bullet.x, bullet.y, bullet.raio, 0, 2*Math.PI);
//     ctx.fill();

function desenharBalas() {
    ctx.fillStyle = bullet.cor;
    ctx.fillRect(bullet.x, bullet.y, bullet.largura, bullet.altura);
    
    requestAnimationFrame(desenharBalas)
}

desenharBalas()