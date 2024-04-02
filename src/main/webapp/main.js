let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Initialisation des variables
// Stocke l'ID de la frame d'animation pour pouvoir l'arrêter
let animationFrameId;
let score = 0;

// Dimensions initiales et position de la balle
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let speedX = 0;
let speedY = 0;
let ballLaunched = false;

// Nombre et dimensions des briques
let cols = 13;
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
        x: canvas.width / 15 + j * brickWidth,
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

function gameOver() {
  // Dessiner un message sur le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ``;
  ctx.fillText(
    "Votre score est de " + score,
    canvas.width / 2,
    canvas.height / 2 - 40
  );
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

  ctx.fillText(
    "Appuyez sur ESPACE pour recommencer",
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  // Arrêter la boucle de jeu
  cancelAnimationFrame(animationFrameId);

  // Attendre l'action de l'utilisateur pour recommencer
  document.addEventListener("keydown", restartGameListener);
}

function restartGameListener(event) {
  if (event.code === "Space") {
    document.removeEventListener("keydown", restartGameListener);
    restartGame();
  }
}

function restartGame() {
  // Réinitialiser les états de jeu
  init();
  resetBallAndPaddle();
  console.log("speedY :>> ", speedY);
  // Démarrer la boucle de jeu
  animationFrameId = requestAnimationFrame(update);
}

function resetBallAndPaddle() {
  // Réinitialise la position de la balle
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;

  // Réinitialise les vitesses de la balle
  speedX = 0; // Ou une autre valeur initiale désirée
  speedY = 0; // Assurez-vous de définir une valeur négative pour que la balle monte

  ballLaunched = false;

  // Réinitialise la position de la raquette
  paddleX = (canvas.width - paddleWidth) / 2;
}

// Vérifie si le joueur a cassé toutes les briques
function checkWinCondition() {
  const remainingBricks = bricks.filter((brick) => brick.status === 1).length;

  if (remainingBricks === 0) {
    // Le joueur a gagné
    winGame();
  }
}

function winGame() {
  // Dessiner un message sur le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(
    "Félicitations! Vous avez gagné!",
    canvas.width / 2,
    canvas.height / 2 - 40
  );
  ctx.fillText(
    "Votre score est de " + score,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillText(
    "Appuyez sur ESPACE pour recommencer",
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  // Arrêter la boucle de jeu
  cancelAnimationFrame(animationFrameId);

  // Attendre l'action de l'utilisateur pour recommencer
  document.addEventListener("keydown", restartGameListener);
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
        // Détermine si la collision est verticale ou latérale
        // en vérifiant la position précédente de la balle
        let ballPreviousX = ballX - speedX;
        let ballPreviousY = ballY - speedY;

        // Collision verticale si la position précédente de la balle était à l'extérieur de la brique en Y
        let verticalCollision =
          ballPreviousY + ballRadius < brick.y ||
          ballPreviousY - ballRadius > brick.y + brickHeight;
        console.log("verticalCollision :>> ", verticalCollision);

        // Collision latérale si la position précédente de la balle était à l'extérieur de la brique en X
        let lateralCollision =
          ballPreviousX + ballRadius + 1 < brick.x ||
          ballPreviousX - ballRadius + 1 > brick.x + brickWidth;
        console.log("lateralCollision :>> ", lateralCollision);

        if (verticalCollision) {
          speedY = -speedY;
        } else if (lateralCollision) {
          speedX = -speedX;
        } else {
          // Dans le cas où une collision est détectée mais ne correspond ni à une collision clairement verticale ni latérale,
          // par exemple, lorsqu'elle se produit près des coins, on peut choisir de prioriser le rebond vertical
          // ou de traiter le cas spécifiquement ici.
          speedY = -speedY; // Ceci est un choix par défaut; ajustez selon le comportement souhaité.
        }
        score += 100;
        brick.status = 0; // La brique est "brisée"
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
  if (ballY < ballRadius) {
    speedY = -speedY;
  } else if (ballY > canvas.height - ballRadius) {
    // Si la balle sort par le bas
    gameOver(); // Appelle la fonction gameOver
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
  checkWinCondition(); // Vérifier si le joueur a gagné
  animationFrameId = requestAnimationFrame(update);
}

init();
update();
