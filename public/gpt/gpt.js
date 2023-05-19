/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let teclas = {};

let bullets = [];

// Definições do jogador
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    altura: 25,
    largura: 60,
    cor: '#5A5A5A',
    speed: 9,
    score: 0
};

// Captura as teclas do teclado apenas quando pressionadas
document.addEventListener("keydown", function (evento) {
    teclas[evento.keyCode] = true;
});

document.addEventListener("keyup", function (evento) {
    delete teclas[evento.keyCode];
});

// Função para mover o jogador
function movePlayer() {
    // W - 87 => sobe
    if (87 in teclas && player.y > 0)
        player.y -= player.speed;
    // S - 83 => desce
    if (83 in teclas && player.y < canvas.height)
        player.y += player.speed;
    // A - 65 => esq
    if (65 in teclas && player.x > 0)
        player.x -= player.speed;
    // D - 68 => dir
    if (68 in teclas && player.x < canvas.width)
        player.x += player.speed;
}

// Função para criar balas nas extremidades aleatoriamente
function criarBala() {
    // Gera um número aleatório entre 0 e 3
    let lado = Math.floor(Math.random() * 4);

    // Posição inicial nas extremidades
    let x, y;

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
    }

    // Calcula as velocidades em direção ao jogador
    let dx = player.x - x;
    let dy = player.y - y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let speed = 3; // Velocidade das balas
    let targetX = (dx / distance) * speed;
    let targetY = (dy / distance) * speed;

    // Cria um objeto para representar a bala
    let bullet = {
        x: x,
        y: y,
        raio: 10,
        cor: "black",
        speed: speed,
        targetX: targetX,
        targetY: targetY
    };

    // Adiciona a bala ao array
    bullets.push(bullet);
}

// Desenha o jogador
function desenharPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();

    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.largura, player.altura);

    requestAnimationFrame(desenharPlayer);
}

// Move as balas em direção ao jogador
function moveBala() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];

        bullet.x += bullet.targetX;
        bullet.y += bullet.targetY;
    }
}

// Desenha as balas
function desenharBala() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.raio, 0, Math.PI * 2);
        ctx.fillStyle = bullet.cor;
        ctx.fill();
        ctx.closePath();
    }
}

// Função para atualizar o cronômetro
let segundos = 0;
let tempo = document.getElementById('cronometro');

function contadorSegundos() {
    segundos += 1;
    tempo.innerText = "Tempo de jogo: " + segundos + "s";
}

setInterval(contadorSegundos, 1000);

setInterval(criarBala, 1000);
setInterval(moveBala, 16); // Aproximadamente 60 quadros por segundo
setInterval(desenharBala, 16); // Aproximadamente 60 quadros por segundo

desenharPlayer();
