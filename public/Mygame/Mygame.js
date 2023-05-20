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

// função para criar balas nas extremidades aleatoriamente
function criarBala() {
    // gera um número aleatório entre 0 e 3
    var lado = Math.floor(Math.random() * 4);

    // posição inicial gerada aleatoriamente em uma das extremidades
    var x;
    var y;

    if (lado === 0) {                               // Topo do mapa
        // como o Math.random gera um numero entre 0 e 1, podemos usar-lo para multiplicar o lado do canvas e obter uma posiçao aleatoria
        x = Math.random() * canvas.width;           
        y = 0;
    } else if (lado === 1) {                        // lateral direita do mapa
        x = canvas.width;
        y = Math.random() * canvas.height;
    } else if (lado === 2) {                        // base do mapa
        x = Math.random() * canvas.width;
        y = canvas.height;
    } else {                                        // lateral esquerda do mapa
        x = 0;
        y = Math.random() * canvas.height;
    };

    // obj balas ======> geradas randomicamente das extremidades
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
    // limpa o canvas para não gerar um rastro de onde o jogador passou
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // esse função é chamada para que o player se mova a cada vez que é desenhado
    movePlayer();
    
    // desenha o player de fato
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.largura, player.altura);
    ctx.fill();
    
    // loop de animação
    requestAnimationFrame(desenharPlayer);
};

// move as balas em direçao ao jogador
function moveBala() {
    // itera sobre a lista das balas
    for (var i = 0; i < bullets.length; i++) {
        // para cada bala na lista
        var bullet = bullets[i];

        if (bullet.x >= 0 && bullet.x <= canvas.width && bullet.y >= 0 && bullet.y <= canvas.height) { // dentro do canvas
            // incrementa no posição dela, gerando o efito de animação
            bullet.x += bullet.targetX;
            bullet.y += bullet.targetY;

            // verifica a colisão com o jogador
            if (
                bullet.x < player.x + player.largura &&
                bullet.x + bullet.raio > player.x &&
                bullet.y < player.y + player.altura &&
                bullet.y + bullet.raio > player.y
            ) {
                


            }
          } else {
            // remove a bala se estiver fora do canvas, caso contrario, muitas balas são geradas e programa fica extremamente lento e travado
            bullets.splice(i, 1);
            i--;
          }
    }
};

// desenha as balas
function desenharBala() {
    // esse função é chamada para que a bala se mova a cada vez que é desenhado
    moveBala();

    // itera sobre a lista das balas
    for (var i = 0; i < bullets.length; i++) {
        // para cada bala na lista
        var bullet = bullets[i];

        // desenha de fato a bala
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.raio, 0, Math.PI * 2);
        ctx.fillStyle = bullet.cor;
        ctx.fill();
        ctx.closePath();
    }
    // loop de animação
    requestAnimationFrame(desenharBala);
}

// função para atualizar o cronômetro
var segundos = 0;                                                      // segundos = 0, inicialmente
var tempo = document.getElementById('cronometro');                     // varialvel tempo é pega da id 'cronometro' do HTML

function contadorSegundos() {
    segundos += 1;                                                     // incrementa 1 a cada vez que a função é chamada
    tempo.innerText = "Tempo de jogo " + segundos + " s";              // insere os dados atualizados ao HTML
}
setInterval(contadorSegundos, 1000);                                   // chama a função 1x por segundo


setInterval(criarBala, 500)                                            // cria uma bala a cada 0,5 segundos
desenharPlayer();
desenharBala();