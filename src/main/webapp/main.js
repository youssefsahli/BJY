/**
 * Y. Sahli GPLv3
 * Main Canvas File
 */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensions initiales et position de la balle
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let dx = 2;
let dy = -2;

function adjustCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ballX = canvas.width / 2; // Réinitialise la position de la balle
  ballY = canvas.height - 30;
}

// Ajuste le canvas lorsque la fenêtre est redimensionnée
window.addEventListener("resize", adjustCanvas);
adjustCanvas(); // Assurez-vous que le canevas est correctement dimensionné dès le début

// Dimensions et position initiales de la raquette
const paddleWidth = 150;
const paddleHeight = 20;
const paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;

function drawBricks() {
  const brickWidth = window.innerWidth / 25;
  const brickHeight = window.innerHeight / 25;
  const cols = Math.floor((canvas.width - canvas.width / 5) / brickWidth);
  const rows = Math.floor((canvas.height - canvas.height / 1.5) / brickHeight);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = canvas.width / 10 + j * brickWidth;
      const y = canvas.height / 10 + i * brickHeight;
      ctx.fillStyle = i % 2 == 0 ? "darkgreen" : "darkred";
      ctx.fillRect(x, y, brickWidth, brickHeight);
      ctx.strokeRect(x, y, brickWidth, brickHeight);
    }
  }
}

function drawPaddle() {
  ctx.fillStyle = "darksalmon";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();

  // Mise à jour de la position de la balle
  ballX += dx;
  ballY += dy;

  // Gestion des collisions avec les bords du canevas
  if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (ballY < ballRadius * 2 || ballY > canvas.height - ballRadius) {
    dy = -dy;
  }

  // Gestion de la collision avec la raquette
  if (
    ballX > paddleX &&
    ballX < paddleX + paddleWidth &&
    ballY > paddleY - ballRadius
  ) {
    dy = -dy;
  }

  requestAnimationFrame(update);
}

update();
