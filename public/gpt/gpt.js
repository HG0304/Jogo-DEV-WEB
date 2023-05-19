/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

teclas = {};

bullets = [];

// Definições do player
var player = {
  x: c.width / 2,
  y: c.height / 2,
  altura: 25,
  largura: 60,
  cor: "#5A5A5A",
  speed: 9,
  score: 0,
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
  if (87 in teclas && player.y > 0) player.y -= player.speed;
  // S - 83 => desce
  if (83 in teclas && player.y < c.height - player.altura)
    player.y += player.speed;
  // A - 65 => esq
  if (65 in teclas && player.x > 0) player.x -= player.speed;
  // D - 68 => dir
  if (68 in teclas && player.x < c.width - player.largura)
    player.x += player.speed;
}

// Função para criar balas nas extremidades aleatoriamente
function criarBala() {
  // Gera um número aleatório entre 0 e 3
  var lado = Math.floor(Math.random() * 4);

  // Posição inicial nas extremidades
  var x;
  var y;

  if (lado === 0) {
    // Topo do mapa
    x = Math.random() * c.width;
    y = 0;
  } else if (lado === 1) {
    // Lateral direita do mapa
    x = c.width;
    y = Math.random() * c.height;
  } else if (lado === 2) {
    // Base do mapa
    x = Math.random() * c.width;
    y = c.height;
  } else {
    // Lateral esquerda do mapa
    x = 0;
    y = Math.random() * c.height;
  }

  // Objeto da bala
  var bullet = {
    x: x,
    y: y,
    raio: 10,
    cor: "black",
    speed: 2,
    targetX: player.x - x, // Posição X do jogador
    targetY: player.y - y // Posição Y do jogador
  };

  var dx = player.x - x;
  var dy = player.y - y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  bullet.targetX = (player.x - bullet.x) / distance * bullet.speed;
  bullet.targetY = (player.y - bullet.y) / distance * bullet.speed;

  // Adiciona a bala à lista das balas
  bullets.push(bullet);
}

// Função para mover as balas em direção ao jogador
function moveBala() {
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];

    bullet.x += bullet.targetX;
    bullet.y += bullet.targetY;
  }
}

// Função para desenhar o jogador
function desenharPlayer() {
  ctx.clearRect(0, 0, c.width, c.height);

  movePlayer();

  ctx.fillStyle = player.cor;
  ctx.fillRect(player.x, player.y, player.largura, player.altura);

  requestAnimationFrame(desenharPlayer);
}

// Função para desenhar as balas
function desenharBala() {
  criarBala();
  moveBala();

  //ctx.clearRect(0, 0, c.width, c.height);

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

desenharPlayer();
//desenharBala();