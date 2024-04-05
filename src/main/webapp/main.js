let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Initialisation des variables globales
// Relatif au statut du jeu
let animationFrameId; // Stocke l'ID de la frame d'animation pour pouvoir l'arrêter
let isGameOver = false; // Indique si le jeu est terminé
let score = 0; // Score du joueur
let lives = 3; // Nombre de vies restantes
let scoreHistory = []; // Tableau des meilleurs scores

// Relatif à la balle
let ballRadius = 10; // Rayon de la balle
let ballColor = "white"; // Couleur de la balle
let ballX = canvas.width / 2; // Position initiale de la balle en X
let ballY = canvas.height - 30; // Position initiale de la balle en Y
let speedX = 0; // Vitesse initiale en X
let speedY = 0; // Vitesse initiale en Y
let ballLaunched = false; // Indique si la balle a été lancée
let isPerforating = false; // Indique si la balle est perforante

// Relatif aux briques
let cols = 13; // Nombre de colonnes de briques
let rows = 6; // Nombre de lignes de briques
let brickWidth, brickHeight; // Ajusté dans adjustCanvas
const bricks = []; // Tableau des briques

// Relatif à la raquette
let paddleWidth = canvas.innerWidth / 11; // Largeur de la raquette
let paddleHeight = 20; // Hauteur de la raquette
let paddleColor = "darksalmon"; // Couleur de la raquette
let paddleX = (canvas.width - paddleWidth) / 2; // Position initiale de la raquette en X
let paddleY = canvas.height - paddleHeight - 10; // Position initiale de la raquette en Y

// Gestion des touches pressées
let rightPressed = false;
let leftPressed = false;

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
  isGameOver = false; // Réinitialise le statut du jeu
  score = 0; // Réinitialise le score
  lives = 3; // Réinitialise le nombre de vies
  speedX = 0; // Réinitialise la vitesse en X
  speedY = 0; // Réinitialise la vitesse en Y
  let index = 0; // Réinitialise l'index des briques
  bricks.length = 0; // Efface le tableau existant
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      index++; // Incrémente l'index des briques
      let color;
      if (index % 17 === 0) {
        color = "lightgreen"; // Brique perforante
      } else if (index % 9 === 0) {
        color = "darksalmon"; // Brique doublant la taille de la raquette
      } else {
        color = "darkred"; // Brique normale
      }
      let brick = {
        x: canvas.width / 15 + j * brickWidth,
        y: canvas.height / 10 + i * brickHeight,
        status: 1, // La brique est initialement visible
        color: color,
      };
      bricks.push(brick); // Ajoute la brique au tableau
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
    ballLaunched = true;
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

// Accélère la balle en appuyant sur la touche "Espace"
function speedUp(event) {
  if (!isGameOver) {
    let speedLimit = 10;
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
document.addEventListener("keydown", speedUp);

// Ralentit la balle en relâdhant la touche "Espace"
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
document.addEventListener("keyup", speedDown);

// Gestion des touches fléchées pour déplacer la raquette
function keyDownHandler(event) {
  if (!isGameOver) {
    if (event.code === "ArrowLeft") {
      leftPressed = true;
    } else if (event.code === "ArrowRight") {
      rightPressed = true;
    }
  }
}

// Gestion des touches fléchées pour arrêter de déplacer la raquette
function keyUpHandler(event) {
  if (!isGameOver) {
    if (event.code === "ArrowLeft") {
      leftPressed = false;
    } else if (event.code === "ArrowRight") {
      rightPressed = false;
    }
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Déplace la raquette avec les touches fléchées
function movePaddle() {
  if (rightPressed) {
    paddleX += 10; // Vitesse de déplacement de la raquette
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

// Affiche un message de fin de jeu
function gameOver() {
  if (isGameOver) return;
  isGameOver = true; // Marque le jeu comme terminé
  // Dessiner un message sur le canvas
  scoreHistory.push(score); // Ajoute le score actuel au tableau des meilleurs scores
  scoreHistory = scoreHistory.toSorted((a, b) => b - a).slice(0, 5); // Trie les scores par ordre décroissant et garde les 5 meilleurs
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

  // Arrêter la boucle de jeu
  cancelAnimationFrame(animationFrameId);

  // Attendre l'action de l'utilisateur pour recommencer
  document.addEventListener("keydown", restartGameListener);
}

// Redémarrer le jeu en appuyant sur "Entrée"
function restartGameListener(event) {
  if (event.code === "Enter") {
    document.removeEventListener("keydown", restartGameListener);
    restartGame();
  }
}

// Affiche un message de victoire
function winGame() {
  if (isGameOver) return;
  isGameOver = true; // Marque le jeu comme terminé
  // Dessiner un message sur le canvas
  scoreHistory.push(score);
  scoreHistory = scoreHistory.toSorted((a, b) => b - a).slice(0, 5);

  // Dessiner un message sur le canvas
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

function restartGame() {
  // Réinitialiser les états de jeu
  init();
  resetBallAndPaddle();
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

// Bonus : Balle perforfante
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

// Fonction principale de mise à jour du jeu
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

    // Gestion des collisions avec les bords du canevas
    if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
      speedX = -speedX;
    }
    if (ballY < ballRadius) {
      speedY = -speedY;
    } else if (ballY > canvas.height - ballRadius) {
      // Si la balle sort du canvas par le bas
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
