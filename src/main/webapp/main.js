let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Initialisation des variables globales

// Relatif au jeu
let animationFrameId; // Stocke l'ID de la frame d'animation pour pouvoir l'arrêter plus tard
let isGameOver = false; // Indique si le jeu est terminé
let score = 0; // Score du joueur
let lives = 3; // Nombre de vies du joueur
let scoreHistory = []; // Historique des scores

// Relatif aux briques
let bricks = []; // Tableau contenant les briques
let cols = 13; // Nombre de colonnes de briques
let rows = 6; // Nombre de lignes de briques
let brickWidth, brickHeight;

// Relatif à la raquette
let paddleWidth = window.innerWidth / 10; // Largeur de la raquette
let paddleHeight = 20; // Hauteur de la raquette
let paddleX; // Position horizontale de la raquette
let paddleColor = "darksalmon"; // Couleur de la raquette
let paddleY = canvas.height - paddleHeight - 10; // Position verticale de la raquette
let rightPressed = false; // Indique si la touche fléchée droite est enfoncée
let leftPressed = false; // Indique si la touche fléchée gauche est enfoncée

// Relatif à la balle
let ballRadius = 10; // Rayon de la balle
let ballColor = "white"; // Couleur de la balle
let ballX = canvas.width / 2; // Position horizontale de la balle
let ballY = canvas.height - 30; // Position verticale de la balle
let speedX = 0; // Vitesse initiale horizontale de la balle
let speedY = 0; // Vitesse initiale verticale de la balle
let ballLaunched = false; // Indique si la balle est lancée
let isPerforating = false; // Indique si la balle est perforante

// Affiche le score du joueur
function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 30, 40);
}

// Affiche le nombre de vies restantes
function drawLives() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Vies: " + lives, canvas.width - 95, 40);
}

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
  isGameOver = false; // Réinitialise l'état du jeu
  score = 0; // Réinitialise le score
  lives = 3; // Réinitialise le nombre de vies
  speedX = 0; // Réinitialise la vitesse horizontale de la balle
  speedY = 0; // Réinitialise la vitesse verticale de la balle
  index = 0; // Réinitialise l'index des briques
  bricks.length = 0; // Efface le tableau existant
  // Crée un nouveau tableau de briques
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      index++;
      let brick = {
        x: canvas.width / 15 + j * brickWidth,
        y: canvas.height / 10 + i * brickHeight,
        status: 1, // La brique est initialement visible
        color:
          index % 17 === 0
            ? "lightgreen" // Balle perforante
            : index % 9 === 0
            ? "darksalmon" // Raquette double
            : index % 5 === 0
            ? "white" // Balle blanche
            : brickColor,
      };
      bricks.push(brick);
    }
  }
}

// Dessine la grille de briques
function drawBricks() {
  bricks.forEach((brick) => {
    if (brick.status === 1) {
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
      ctx.strokeRect(brick.x, brick.y, brickWidth, brickHeight);
    }
  });
}

// Dessine la raquette
function drawPaddle() {
  ctx.fillStyle = paddleColor;
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// Positionne la balle au centre de la raquette
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY - 1, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
}

// Lance la balle en appuyant sur la touche "Espace"
function launchBall(event) {
  if (event.code === "Space" && speedX === 0 && speedY === 0 && !ballLaunched) {
    ballLaunched = true; // Marque la balle comme lancée
    // Détermine la direction de la balle en fonction du déplacement de la raquette
    if (rightPressed) {
      speedX = 3;
    } else if (leftPressed) {
      speedX = -3; // Vitesse initiale en X
    }
    speedY = -5; // Vitesse initiale en Y
  }
}
document.addEventListener("keydown", launchBall);

// Accélère la balle en appuyant sur la touche "  Espace"
function speedUp(event) {
  if (!isGameOver) {
    let speedLimit = 10; // Limite la vitesse de la balle
    if (event.code === "Space" && ballLaunched && speedY < speedLimit) {
      if (speedY > 0 && speedY < speedLimit) {
        speedY = speedY + 5;
      }
      if (speedY < 0 && speedY > -speedLimit) {
        speedY = speedY - 5;
      }
    }
  }
}

// Ralentit la balle en relâchant la touche "Espace"
function speedDown(event) {
  if (event.code === "Space" && ballLaunched) {
    if (speedY > 0) {
      speedY = speedY / 2;
    }
    if (speedY < 0) {
      speedY = speedY / 2;
    }
  }
}
document.addEventListener("keydown", speedUp);
document.addEventListener("keyup", speedDown);

// Ecoute les touches fléchées pour déplacer la raquette
function keyDownHandler(event) {
  if (!isGameOver) {
    if (event.code === "ArrowLeft") {
      leftPressed = true;
    } else if (event.code === "ArrowRight") {
      rightPressed = true;
    }
  }
}
document.addEventListener("keydown", keyDownHandler);

// Ecoute le relâchement des touches fléchées pour arrêter le déplacement de la raquette
function keyUpHandler(event) {
  if (!isGameOver) {
    if (event.code === "ArrowLeft") {
      leftPressed = false;
    } else if (event.code === "ArrowRight") {
      rightPressed = false;
    }
  }
}
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

// Affiche un message de fin de jeu quand le joueur a perdu
function gameOver() {
  if (isGameOver) return;
  isGameOver = true; // Marque le jeu comme terminé
  // Dessiner un message sur le canvas avec le score du joueur
  scoreHistory.push(score);
  scoreHistory = scoreHistory.sort((a, b) => b - a).slice(0, 5);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Meilleurs scores :", canvas.width / 2, canvas.height / 5);
  scoreHistory.map((score, index) => {
    ctx.fillText(
      index + 1 + ". " + score,
      canvas.width / 2,
      canvas.height / 5 + 40 * (index + 1)
    );
  });
  ctx.fillText(
    "Votre score est de " + score,
    canvas.width / 2,
    canvas.height / 2 - 40
  );
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

  ctx.fillText(
    "Appuyez sur Entrée pour recommencer",
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  cancelAnimationFrame(animationFrameId); // Arrêter la boucle de jeu grâce à l'ID de la frame d'animation

  document.addEventListener("keydown", restartGameListener); // Attend l'action de l'utilisateur pour recommencer
}

// Redémarrer le jeu en appuyant sur "Entrée"
function restartGameListener(event) {
  if (event.code === "Enter") {
    document.removeEventListener("keydown", restartGameListener);
    restartGame();
  }
}

// Affiche un message de fin de jeu quand le joueur a gagné
function winGame() {
  if (isGameOver) return;
  isGameOver = true; // Marque le jeu comme terminé
  // Dessiner un message sur le canvas
  scoreHistory.push(score); // Ajouter le score actuel à l'historique
  scoreHistory = scoreHistory.sort((a, b) => b - a).slice(0, 5); // Garder les 5 meilleurs scores

  // Dessiner un message sur le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Meilleurs scores :", canvas.width / 2, canvas.height / 5);
  scoreHistory.map((score, index) => {
    // Afficher les 5 meilleurs scores
    ctx.fillText(
      index + 1 + ". " + score,
      canvas.width / 2,
      canvas.height / 5 + 40 * (index + 1)
    );
  });
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
    "Appuyez sur Entrée pour recommencer",
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  // Arrêter la boucle de jeu
  cancelAnimationFrame(animationFrameId);

  // Attendre l'action de l'utilisateur pour recommencer
  document.addEventListener("keydown", restartGameListener);
}

// Redémarrer le jeu
function restartGame() {
  // Réinitialiser les états de jeu
  init();
  resetBallAndPaddle();
  // Démarrer la boucle de jeu
  animationFrameId = requestAnimationFrame(update);
}

// Réinitialise la position de la balle et de la raquette
function resetBallAndPaddle() {
  // Réinitialise la position de la balle
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;

  // Réinitialise les vitesses de la balle
  speedX = 0; // Ou une autre valeur initiale désirée
  speedY = 0; // Assurez-vous de définir une valeur négative pour que la balle monte

  ballLaunched = false; // Marque la balle comme non lancée

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

// Bonus : Taille de la raquette doublée temporairement
function doublePaddle() {
  paddleWidth = canvas.width / 5.5;
  setTimeout(() => {
    paddleColor = "darkorange";
  }, 6000);
  setTimeout(() => {
    paddleColor = "darkred";
  }, 8000);
  setTimeout(() => {
    paddleColor = "darksalmon";
  }, 10000);
  setTimeout(() => {
    paddleWidth = canvas.width / 11;
  }, 11000);
}

// Bonus : Balle perforfante temporairement
function perforatingBall() {
  isPerforating = true;
  ballColor = "lightgreen";
  ballRadius = 15;

  setTimeout(() => {
    ballColor = "red";
  }, 5000);
  setTimeout(() => {
    isPerforating = false;
    ballColor = "white";
    ballRadius = 10;
  }, 7000);
}

// Fonction principale de mise à jour du jeu (boucle de jeu)
function update() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    movePaddle();
    drawScore();
    drawLives();

    let collisionDetected = false; // S'assure qu'une seule collision est traitée par cycle

    // Gestion des collisions avec les briques

    bricks.forEach((brick, index) => {
      if (!collisionDetected && brick.status === 1) {
        if (
          ballX - ballRadius < brick.x + brickWidth &&
          ballX + ballRadius > brick.x &&
          ballY - ballRadius < brick.y + brickHeight &&
          ballY + ballRadius > brick.y
        ) {
          let verticalCollision =
            ballY + ballRadius - speedY <= brick.y ||
            ballY - ballRadius - speedY >= brick.y + brickHeight;
          let lateralCollision =
            ballX + ballRadius - speedX <= brick.x ||
            ballX - ballRadius - speedX >= brick.x + brickWidth;
          if (!isPerforating) {
            if (verticalCollision) {
              speedY = -speedY;
            } else if (lateralCollision) {
              speedX = -speedX;
            } else {
              // Prioriser le rebond vertical en cas d'ambiguïté près des coins
              speedY = -speedY;
            }
          }
          if (brick.color === "lightgreen") {
            perforatingBall();
          } else if (brick.color === "darksalmon") {
            doublePaddle();
          } else if (brick.color === "white") {
            drawBall();
          }
          score += 100; // Suppose que `score` est défini ailleurs dans votre code
          brick.status = 0; // La brique est "brisée"
          collisionDetected = true; // Empêche d'autres collisions pendant ce cycle
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

    if (
      ballX + ballRadius > paddleX &&
      ballX - ballRadius < paddleX + paddleWidth &&
      ballY + ballRadius > paddleY &&
      ballY - ballRadius < paddleY + paddleHeight
    ) {
      speedY = -Math.abs(speedY); // S'assure que la balle rebondit toujours vers le haut
      ballY = paddleY - ballRadius - 1; // Ajuste la position de la balle pour éviter qu'elle "colle" à la raquette

      //  Calculer le point d'impact sur la raquette
      let impactPoint = ballX - (paddleX + paddleWidth / 2);

      //  Modifier speedX en fonction de l'endroit où la balle touche la raquette
      //  Plus l'impact est éloigné du centre, plus le changement de direction est grand
      speedX = (impactPoint / 2) * 0.1;
    }

    // // Alernative de la gestion de la collision avec la raquette
    // if (
    //   ballX + ballRadius > paddleX &&
    //   ballX - ballRadius < paddleX + paddleWidth &&
    //   ballY + ballRadius > paddleY - ballRadius &&
    //   ballY - ballRadius < paddleY + paddleHeight
    // ) {
    //   let impactPoint = ballX - (paddleX + paddleWidth / 2);
    //   speedX += (impactPoint / paddleWidth) * 2; // Ajuste la vitesse horizontale basée sur le point d'impact
    //   speedY = -speedY; // Inverse la direction verticale
    //   ballY = paddleY - ballRadius - 1; // Ajuste la position de la balle pour éviter qu'elle ne "colle"
    // }

    // Gestion des collisions avec les bords du canevas
    if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
      speedX = -speedX;
    }
    if (ballY < ballRadius) {
      speedY = -speedY;
    } else if (ballY > canvas.height - ballRadius) {
      // Si la balle n'est pas perforante et sort du canvas par le bas
      if (lives > 0) {
        lives--;
        resetBallAndPaddle();
      } else {
        gameOver();
      }
    }

    checkWinCondition(); // Vérifie si le joueur a gagné
    animationFrameId = requestAnimationFrame(update); // Continue la boucle de jeu
  }
}

init();
update();
