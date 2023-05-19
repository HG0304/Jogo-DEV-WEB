/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

teclas = {};

// obj balas ======> gerar randomicamente e aumentar a vel com o tempo
var Bala = {
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


// Variáveis globais para a posição da bala
var XBala, YBala;

function moveBala(){
    
    // Gera um número aleatório entre 0 e 3
    var lado = Math.floor(Math.random() * 4);

    // Posição e velocidade iniciais
    var x, y, XBala, YBala;
    var speed = 2;
    
    
        if  (lado == 0){ // Topo do mapa
            x = Math.random() * canvas.width;
            y = 0;
            XBala = x;
            YBala = y + speed;
            
        }
        else if  (lado == 1){ // Lateral direita do mapa
            x = canvas.width;
            y = Math.random() * canvas.height;
            XBala = x-speed;
            YBala = y;
            
        }
        else if  (lado == 2){ // Base do mapa
            x = Math.random() * canvas.width;
            y = canvas.height;
            XBala = x;
            YBala =y -speed;
            
        }    
        else if  (lado == 3){ // Lateral esquerda do mapa
            x = 0;
            y = Math.random() * canvas.height;
            XBala = x + speed;
            YBala = y;
            
            
        
        }
}

// desenhar e animar o jogador

function desenharPlayer() {
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    movePlayer()
    
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.largura, player.altura);
    ctx.fill()
    
    requestAnimationFrame(desenharPlayer)
}


function desenharBala() {
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    moveBala()
    window.alert (XBala, YBala,)
    ctx.fillStyle = Bala.cor;
    ctx.fillRect(XBala, YBala, 2, 2);
    ctx.fill()
    
    requestAnimationFrame(desenharBala)
}

desenharPlayer()








































function parede(x,y,l,a,cor){-

    ctx.fillStyle == cor
    ctx.fillRect(x, y, l, a);
    }


parede()
parede()
()
    
    