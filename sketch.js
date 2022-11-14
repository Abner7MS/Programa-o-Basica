//variaveis da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis da velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variaveis da raquete
let xraquete = 5;
let yraquete = 150;
let comprimentoRaquete = 7;
let alturaRaquete = 90;

//variaveis do oponente
let xraqueteOponente = 585 ;
let yraqueteOponente = 150 ;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//pontuação
let meusPontos = 0;
let oponentePontos = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop ();
}

function draw() {
  background(0);
  visualizarBolinha ();
  movimentoBolinha ();
  verificaColisao ();
  verRaquete (xraquete, yraquete);
  verRaquete (xraqueteOponente, yraqueteOponente);
  movimentoRaquete ();
  movimentoRaqueteOponenteAuto ();
  //movimentoRaqueteOponenteManual ();
  verificaColisaoRaquete (xraquete, yraquete);
  verificaColisaoRaquete (xraqueteOponente, yraqueteOponente);
  incluiPlacar ();
  marcaPonto ();
  bolinhaNaoFicaPresa();
  
}

  function visualizarBolinha () {
    circle (xbolinha, ybolinha, diametro);
    }

  function movimentoBolinha () {
    xbolinha += velocidadeXbolinha;
    ybolinha += velocidadeYbolinha;
    }

  function verificaColisao () {
    if (xbolinha + raio > width || xbolinha - raio < 0){ 
      velocidadeXbolinha *= -1;}
    if (ybolinha + raio > height || ybolinha - raio < 0) {
      velocidadeYbolinha *= -1;}
    }

  function verRaquete (x,y){
    rect (x, y, comprimentoRaquete, alturaRaquete)
    }


  function movimentoRaquete () {
    if (keyIsDown(UP_ARROW)){
    yraquete -= 10;
     }
    if (keyIsDown(DOWN_ARROW)) {
    yraquete += 10;
      }
    }

  function movimentoRaqueteOponenteManual () {
    if (keyIsDown(87)){
    yraqueteOponente -= 10;
     }
    if (keyIsDown(83)) {
    yraqueteOponente += 10;
      }
    }

  function movimentoRaqueteOponenteAuto () {
  velocidadeYOponente = ybolinha - yraqueteOponente - comprimentoRaquete/2-60;
  yraqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
    }

  function calculaChanceDeErrar(){
    if (oponentePontos >= meusPontos){
      chanceDeErrar += 1;
      if (chanceDeErrar >= 39 ){
        chanceDeErrar = 40;
      }
    } else {
      chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
    }
  }

  function verificaColisaoRaquete (x,y){
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xbolinha, ybolinha, raio);
    if(colidiu){
      velocidadeXbolinha *= -1;
      raquetada.play();
    }
    }

  function incluiPlacar (){
    textAlign (CENTER);
    textSize (16);
    fill (color(119,136,153));
    rect (200, 10, 40, 20)
    fill (255);
    text (meusPontos, 220, 26);
    fill (color(119,136,153));
    rect (400, 10, 40, 20);
    fill (255);
    text (oponentePontos, 420, 26)
  }

  function marcaPonto (){
    if (xbolinha > 590){
      meusPontos += 1;
      ponto.play();
    }
    if (xbolinha < 10){
      oponentePontos += 1;
      ponto.play();
    }
  }

function bolinhaNaoFicaPresa(){
    if (xbolinha - raio < 0){
    xbolinha = 23
    }
}
