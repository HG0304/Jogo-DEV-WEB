var urlParams = new URLSearchParams(window.location.search);
var segundos = urlParams.get('variavel');


resultado.innerText = "Tempo jogado: " + segundos + " segundos";