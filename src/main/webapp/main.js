let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensions initiales et position de la balle
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let speedX = 0;
let speedY = 0;
let ballLaunched = false;

// Nombre et dimensions des briques
let cols = 12;
let rows = 6;
let brickWidth, brickHeight; // Ajusté dans adjustCanvas
const bricks = [];

// Dimensions et position initiales de la raquette
let paddleWidth = window.innerWidth / 10;
let paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

// Gestion des touches fléchées
let rightPressed = false;
let leftPressed = false;

// Ajuste le canevas à la taille de la fenêtre
function adjustCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  brickWidth = window.innerWidth / 15;
  brickHeight = window.innerHeight / 20;
  paddleWidth = window.innerWidth / 10;
  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = canvas.height - paddleHeight - 10;
  init();
}

// Ajuste le canvas lorsque la fenêtre est redimensionnée
window.addEventListener("resize", adjustCanvas);
adjustCanvas();

// Initialisation des briques
function init() {
  bricks.length = 0; // Efface le tableau existant
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let brick = {
        x: canvas.width / 10 + j * brickWidth,
        y: canvas.height / 10 + i * brickHeight,
        status: 1, // La brique est initialement visible
      };
      bricks.push(brick);
    }
  }
}

// Dessine la grille de briques
function drawBricks() {
  bricks.forEach((brick) => {
    if (brick.status === 1) {
      ctx.fillStyle = brick.y % 2 === 0 ? "darkgreen" : "darkred";
      ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
      ctx.strokeRect(brick.x, brick.y, brickWidth, brickHeight);
    }
  });
}

// Dessine la raquette
function drawPaddle() {
  ctx.fillStyle = "darksalmon";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// Positionne la balle au centre de la raquette
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY - 1, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

// Lance la balle en appuyant sur la touche "Espace"
function launchBall(event) {
  if (event.code === "Space" && speedX === 0 && speedY === 0 && !ballLaunched) {
    ballLaunched = true;
    // Détermine la direction de la balle en fonction du déplacement de la raquette
    if (rightPressed) {
      speedX = 3;
    } else if (leftPressed) {
      speedX = -3;
    } // Vitesse initiale en X
    speedY = -5; // Vitesse initiale en Y
  }
}
document.addEventListener("keydown", launchBall);

// Gestion des touches fléchées
function keyDownHandler(event) {
  if (event.code === "ArrowLeft") {
    leftPressed = true;
  } else if (event.code === "ArrowRight") {
    rightPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.code === "ArrowLeft") {
    leftPressed = false;
  } else if (event.code === "ArrowRight") {
    rightPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Déplace la raquette avec les touches fléchées
function movePaddle() {
  if (rightPressed) {
    paddleX += 10;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 10;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

// Met à jour le jeu
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  movePaddle();

  // Gestion des collisions avec les briques
  // Redessine les briques qui n'ont pas été touchées (status = 1)
  bricks.forEach((brick) => {
    if (brick.status === 1) {
      if (
        ballX - ballRadius < brick.x + brickWidth &&
        ballX + ballRadius > brick.x &&
        ballY - ballRadius < brick.y + brickHeight &&
        ballY + ballRadius > brick.y
      ) {
        brick.status = 0; // La brique est "brisée"
        speedY = -speedY;
        // Calcul de la distance au centre de la brique
        let distX = Math.abs(ballX - brick.x - brickWidth / 2);
        let distY = Math.abs(ballY - brick.y - brickHeight / 2);

        // Si la balle est plus proche du côté que du haut ou du bas, alors c'est une collision latérale
        if (distX > distY) {
          speedX = -speedX; // Inverse la vitesse horizontale pour une collision latérale
        }
      }
    }
  });

  // Si la balle n'est pas lancée, elle suit la raquette
  if (!ballLaunched) {
    ballX = paddleX + paddleWidth / 2; // Centre la balle sur la raquette
    ballY = paddleY - ballRadius - 1; // Positionne la balle juste au-dessus de la raquette
  } else {
    // Mise à jour de la position de la balle
    ballX += speedX;
    ballY += speedY;
  }

  // Gestion des collisions avec les bords du canevas
  if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
    speedX = -speedX;
  }
  if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
    speedY = -speedY;
  }

  // Gestion de la collision avec la raquette
  if (
    ballX > paddleX &&
    ballX < paddleX + paddleWidth &&
    ballY > paddleY - ballRadius &&
    ballY < paddleY + paddleHeight
  ) {
    // Calculer le point d'impact sur la raquette
    let impactPoint = ballX - (paddleX + paddleWidth / 2);

    // Modifier speedX en fonction de l'endroit où la balle touche la raquette
    // Plus l'impact est éloigné du centre, plus le changement de direction est grand
    speedX = (impactPoint / 2) * 0.1;

    // Inverser la direction verticale
    speedY = -speedY;

    // Ajuster la position de la balle pour éviter qu'elle ne "colle" à la raquette
    ballY = paddleY - ballRadius - 1;
  }

  requestAnimationFrame(update);
}

init();
update();
