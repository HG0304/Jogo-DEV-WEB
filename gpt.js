// Obtém o elemento canvas
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Array para armazenar as balas
var bullets = [];

// Função para criar balas nas extremidades
function createBullet() {
    // Gera um número aleatório entre 0 e 3
    var side = Math.floor(Math.random() * 4);

    // Posição inicial nas extremidades
    var x, y;
    switch (side) {
        case 0: // Topo do mapa
            x = Math.random() * canvas.width;
            y = 0;
            break;
        case 1: // Lateral direita do mapa
            x = canvas.width;
            y = Math.random() * canvas.height;
            break;
        case 2: // Base do mapa
            x = Math.random() * canvas.width;
            y = canvas.height;
            break;
        case 3: // Lateral esquerda do mapa
            x = 0;
            y = Math.random() * canvas.height;
            break;
    }

    // Adiciona a bala ao array
    bullets.push({ x: x, y: y });
}

// Função para atualizar a posição das balas
function updateBullets() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        // Movimento em linha reta
        if (bullet.x < canvas.width && bullet.y < canvas.height) {
            bullet.x += 2; // Velocidade horizontal
            bullet.y += 2; // Velocidade vertical
        }
    }
}

// Função para desenhar as balas
function drawBullets() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

// Função principal do jogo
function gameLoop() {
    createBullet();
    updateBullets();
    drawBullets();

    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
window.addEventListener("load", function() {
    gameLoop();
});