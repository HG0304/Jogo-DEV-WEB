/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

teclas = {};

// obj balas ======> gerar randomicamente e aumentar a vel com o tempo
var bullet = {
    x: 100,
    y: 100,
    raio: 10,
    cor: "black",
    speed: 15,
    dirX: -1,
    dirY: 1,
    mod: 0
}

// definicoes do player
var player = {
    x: canvas.width/2,
    y: canvas.height/2,
    altura: 25,
    largura: 60,
    cor: '#5A5A5A',
    speed: 9,
    score: 0
}

// captura as teclas do teclado apenas quando pressionadas
document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
    console.log(teclas);
});

document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
    console.log(teclas);
});

// funcao para mover o jogador
function movePlayer(){
    //w - 87 => sobe
    if(87 in teclas && player.y > 0)
        player.y -= player.speed;
    //s - 83 => desce
    if(83 in teclas && player.y < canvas.height)
        player.y += player.speed;
    //a - 65 => esq
    if(65 in teclas && player.x > 0)
        player.x -= player.speed;
    //d - 68 => dir
    if(68 in teclas && player.y < canvas.width)
        player.x += player.speed;
}

function moveBala(){
    
    // Gera um número aleatório entre 0 e 3
    var lado = Math.floor(Math.random() * 4);

    // Posição e velocidade iniciais
    var x, y, dx, dy;
    var speed = 2;
    
    
        if  (lado == 0){ // Topo do mapa
            x = Math.random() * canvas.width;
            y = 0;
            dx = 0;
            dy = speed;
            break;
        }
        else if  (lado == 1){ // Lateral direita do mapa
            x = canvas.width;
            y = Math.random() * canvas.height;
            dx = -speed;
            dy = 0;
            break;
        }
        else if  (lado == 2){ // Base do mapa
            x = Math.random() * canvas.width;
            y = canvas.height;
            dx = 0;
            dy = -speed;
            break;
        }    
        else if  (lado == 3){ // Lateral esquerda do mapa
            x = 0;
            y = Math.random() * canvas.height;
            dx = speed;
            dy = 0;
            
            break;
        
        }
}

// desenhar e animar o jogador

function desenharPlayer() {
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    moveBala()
    
    ctx.fillStyle = player.cor;
    ctx.fillRect(Bala.x, Bala.y, Bala.largura, Bala.altura);
    ctx.fill()
    
    requestAnimationFrame(desenharBalas)
}


function desenharPlayer() {
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    movePlayer()
    
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.largura, player.altura);
    ctx.fill()
    
    requestAnimationFrame(desenharPlayer)
}

desenharPlayer()

////////////////////////////////////////////////////////////////

// var quadrado = {
//     x: 30,
//     y: 30,
//     width: 30,
//     height: 30,
//     color: "red"
// }

// function retangulo(){
    
//     ctx.clearRect(0,0,canvas.width, canvas.height);
    
//     ctx.fillStyle = quadrado.color;
//     ctx.fillRect(quadrado.x, quadrado.y, quadrado.width, quadrado.height);
//     ctx.fill();
    
//     canvas.addEventListener("mousemove", function(evento) {
//         const rect = canvas.getBoundingClientRect();
//         const mouse_x = evento.clientX - rect.left;
//         const mouse_y = evento.clientY - rect.top;
        
//         quadrado.x = mouse_x - quadrado.width / 2;
//         quadrado.y = mouse_y - quadrado.height / 2;
        
//     });
//     requestAnimationFrame(retangulo);
// }

// retangulo();