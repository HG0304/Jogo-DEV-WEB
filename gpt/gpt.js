console.log('Running')

// Obtém o elemento canvas
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Variáveis para representar o jogador
var player = {
    x: canvas.width / 2, // Posição inicial do jogador no centro do canvas
    y: canvas.height / 2,
    width: 20,
    height: 20,
    speed: 5 // Velocidade de movimento do jogador
};

// Array para armazenar as balas
var bullets = [];

// Função para criar balas nas extremidades
function createBullet() {
    // Gera um número aleatório entre 0 e 3
    var side = Math.floor(Math.random() * 4);

    // Posição inicial nas extremidades
    var x, y;
    if (side === 0) { // Topo do mapa
        x = Math.random() * canvas.width;
        y = 0;
    } else if (side === 1) { // Lateral direita do mapa
        x = canvas.width;
        y = Math.random() * canvas.height;
    } else if (side === 2) { // Base do mapa
        x = Math.random() * canvas.width;
        y = canvas.height;
    } else { // Lateral esquerda do mapa
        x = 0;
        y = Math.random() * canvas.height;
    }

    // Cria um objeto para representar a bala
    var bullet = {
        x: x,
        y: y,
        speed: 2, // Velocidade da bala
        dx: 0, // Velocidade horizontal para mirar no jogador
        dy: 0 // Velocidade vertical para mirar no jogador
    };

    // Calcular as velocidades de mira
    var dx = player.x - x;
    var dy = player.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    bullet.dx = (dx / distance) * bullet.speed;
    bullet.dy = (dy / distance) * bullet.speed;

    // Adiciona a bala ao array
    bullets.push(bullet);
}

// Função para atualizar a posição do jogador
function updatePlayer() {
    if (keys.w && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.a && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.s && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
    if (keys.d && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

// Função para atualizar a posição das balas
function updateBullets() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        // Movimento em linha reta
        if (bullet.x < canvas.width && bullet.y < canvas.height) {
            bullet.x += bullet.dx;
            bullet.y += bullet.dy;
        }
    }
}

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
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
    updatePlayer();
    updateBullets();
    drawPlayer();
    drawBullets();

    requestAnimationFrame(gameLoop);
}

// Objeto para armazenar as teclas pressionadas
var keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

// Event listeners para detectar as teclas pressionadas
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 87: // W
            keys.w = true;
            break;
        case 65: // A
            keys.a = true;
            break;
        case 83: // S
            keys.s = true;
            break;
        case 68: // D
            keys.d = true;
            break;
    }
});

window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 87: // W
            keys.w = false;
            break;
        case 65: // A
            keys.a = false;
            break;
        case 83: // S
            keys.s = false;
            break;
        case 68: // D
            keys.d = false;
            break;
    }
});

// Inicia o jogo
window.addEventListener("load", function () {
    gameLoop();
    setInterval(createBullet, 2000); // Cria uma nova bala a cada 2 segundos
});