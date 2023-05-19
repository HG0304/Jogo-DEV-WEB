// configoracoes basicas do servidor
const http = require('http');
const express = require('express');
var app = express();
app.use(express.static('./public')); // define a pasta public como estatica

// define a porta 80 para a conexao
const port = 80;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// define project.html como a pagina principal do servidor
app.get('/', (req, res) => {
    res.redirect('mygame/Menu.html');
  });