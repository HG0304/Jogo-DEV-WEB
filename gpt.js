// Obtém o elemento canvas
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Array para armazenar as balas
var bullets = [];

// Função para criar balas nas extremidades
function createBullet() {
    // Gera um número aleatório entre 0 e 3
    var side = Math.floor(Math.random() * 4);

    // Posição e velocidade iniciais
    var x, y, dx, dy;
    var speed = 2;

    switch (side) {
        case 0: // Topo do mapa
            x = Math.random() * canvas.width;
            y = 0;
            dx = 0;
            dy = speed;
            break;
        case 1: // Lateral direita do mapa
            x = canvas.width;
            y = Math.random() * canvas.height;
            dx = -speed;
            dy = 0;
            break;
        case 2: // Base do mapa
            x = Math.random() * canvas.width;
            y = canvas.height;
            dx = 0;
            dy = -speed;
            break;
        case 3: // Lateral esquerda do mapa
            x = 0;
            y = Math.random() * canvas.height;
            dx = speed;
            dy = 0;
            break;
    }

    // Adiciona a bala ao array
    bullets.push({ x: x, y: y, dx: dx, dy: dy });
}

// Função para atualizar a posição das balas
function updateBullets() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        // Atualiza a posição da bala
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        // Verifica se a bala saiu do canvas e remove-a do array
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(i, 1);
            i--;
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

gameLoop();