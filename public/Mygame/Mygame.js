/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// armazena as teclas pressionadas
teclas = {};

// armazena todas as balas
bullets = [];

// definicoes do player como objeto
var player = {
    x: canvas.width/2,
    y: canvas.height/2,
    altura: 30,
    largura: 60,
    cor: '#4e87c9',
    speed: 9,
}

// captura as teclas do teclado
document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
});
// remove as teclas quando deixam de ser pressionadas
document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
});

// funcao para mover o jogador
function movePlayer(){
    //w - 87 => sobe
    if(87 in teclas && player.y > 0)                                // cada condição de movimento para manter o jogador dentro da tela
        player.y -= player.speed;
    //s - 83 => desce
    if(83 in teclas && player.y < canvas.height - player.altura)
        player.y += player.speed;
    //a - 65 => esq
    if(65 in teclas && player.x > 0)
        player.x -= player.speed;
    //d - 68 => dir
    if(68 in teclas && player.x < canvas.width - player.largura)
        player.x += player.speed;
};

function criarBala() {                                              // Função para criar balas nas extremidades aleatoriamente
    // Gera um número aleatório entre 0 e 3 que definirá de qual lado a bala será disparada
    var lado = Math.floor(Math.random() * 4);

    // Posição inicial nas extremidades
    var x;
    var y;

    if (lado === 0) {                                               // topo do mapa
        x = Math.random() * canvas.width;
        y = 0;
    } else if (lado === 1) {                                        // lateral direita do mapa
        x = canvas.width;
        y = Math.random() * canvas.height;
    } else if (lado === 2) {                                        // base do mapa
        x = Math.random() * canvas.width;
        y = canvas.height;
    } else {                                                        // lateral esquerda do mapa
        x = 0;
        y = Math.random() * canvas.height;
    };

    // obj balas ======> geraras com coordenadas iniciais aleatorias das extremidades do mapa
    var bullet = {
        x: x,
        y: y,
        raio: 10,
        cor: "red",
        speed: speed,                                              // variavel que incrementa com o tempo
        targetX: 0,
        targetY: 0
    };

    // calculo da distancia da bola ate o player
    var dx = player.x - x;
    var dy = player.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // para que a bola tenha a mesmo velocidade independente do angulo que houver entre a bola e o player
    bullet.targetX = (player.x - bullet.x) / distance * bullet.speed;
    bullet.targetY = (player.y - bullet.y) / distance * bullet.speed;
    
    // adiciona a bala à lista das balas
    bullets.push(bullet);

};

let speed = 5;                                      // velocidade da bala
function dificuldade() {
    speed += 1;                                     // aumente a velociade da bola
}
setInterval(dificuldade, 7000);                     // função é chamada a cada 7 segundos

// desenha e anima o jogador
function desenharPlayer() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    movePlayer();
    
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.largura, player.altura);
    ctx.fill();
    
    requestAnimationFrame(desenharPlayer);
};

// move as balas em direçao ao jogador
function moveBala() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        if (bullet.x >= 0 && bullet.x <= canvas.width && bullet.y >= 0 && bullet.y <= canvas.height) { // dentro do canvas
            bullet.x += bullet.targetX;
            bullet.y += bullet.targetY;

            // verificar colisão com o jogador
            if (
                bullet.x < player.x + player.largura &&
                bullet.x + bullet.raio > player.x &&
                bullet.y < player.y + player.altura &&
                bullet.y + bullet.raio > player.y
            ) {
                // colisão detectada, encerrar o jogo
                
                console.log("Game Over");
                window.location.href = "gameover.html?variavel=" + segundos;
                
            }
          } else {
            // Remove a bala se estiver fora do canvas, caso contrario, muitas bolas sao geradas e programa fica extremamente lento e travado
            bullets.splice(i, 1);
            i--;
          }
    }
};

// cria a anima  as balas
function desenharBala() {
    
    moveBala();

    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.raio, 0, Math.PI * 2);
        ctx.fillStyle = bullet.cor;
        ctx.fill();
        ctx.closePath();
    }
    requestAnimationFrame(desenharBala);
}

// função para atualizar o cronômetro
var segundos = 0;
var tempo = document.getElementById('cronometro');

function contadorSegundos() {
    segundos += 1;
    tempo.innerText = "Tempo de jogo " + segundos + " s";
}

setInterval(contadorSegundos, 1000);
setInterval(criarBala, 500)
desenharPlayer();
desenharBala();