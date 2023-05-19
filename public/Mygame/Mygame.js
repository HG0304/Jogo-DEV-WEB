/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// armazena as teclas pressionadas
teclas = {};

// armazena as balas
bullets = [];

// definicoes do player como objeto
var player = {
    x: canvas.width/2,
    y: canvas.height/2,
    altura: 30,
    largura: 60,
    cor: '#5A5A5A',
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
    if(87 in teclas && player.y > 0)
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

// Função para criar balas nas extremidades aleatoriamente
function criarBala() {
    // Gera um número aleatório entre 0 e 3
    var lado = Math.floor(Math.random() * 4);

    // Posição inicial nas extremidades
    var x;
    var y;

    if (lado === 0) { // Topo do mapa
        x = Math.random() * canvas.width;
        y = 0;
    } else if (lado === 1) { // Lateral direita do mapa
        x = canvas.width;
        y = Math.random() * canvas.height;
    } else if (lado === 2) { // Base do mapa
        x = Math.random() * canvas.width;
        y = canvas.height;
    } else { // Lateral esquerda do mapa
        x = 0;
        y = Math.random() * canvas.height;
    };

    // obj balas ======> geraras randomicamente das extremidades e aumentar a vel com o tempo
    var bullet = {
        x: x,
        y: y,
        raio: 10,
        cor: "red",
        speed: 15,
        targetX: 0,
        targetY: 0
    };

    // calculo da distancia da bola ate o player
    var dx = player.x - x;
    var dy = player.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // para que a bola tenha a mesmo velocidade, intependente do angulo que houver entre a bola e o player
    bullet.targetX = (player.x - bullet.x) / distance * bullet.speed;
    bullet.targetY = (player.y - bullet.y) / distance * bullet.speed;
    
    // Adiciona a bala à lista das balas
    bullets.push(bullet);

};

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

            // Verificar colisão com o jogador
            if (
                bullet.x < player.x + player.largura &&
                bullet.x + bullet.raio > player.x &&
                bullet.y < player.y + player.altura &&
                bullet.y + bullet.raio > player.y
            ) {
                // Colisão detectada, encerrar o jogo
                console.log("Game Over");

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

// Função para atualizar o cronômetro
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