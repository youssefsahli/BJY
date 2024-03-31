/**
 * Y. Sahli GPLv3
 * Main Canvas File
 */

function draw() {
  function adjustCanvas() {
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  adjustCanvas();

  // Ajuste le canvas lorsque la fenêtre est redimensionnée
  window.addEventListener("resize", adjustCanvas);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    // Dessine les briques
    const brickWidth = window.innerWidth / 25;
    const brickHeight = window.innerHeight / 25;

    const cols = Math.floor((canvas.width - canvas.width / 5) / brickWidth);
    const rows = Math.floor(
      (canvas.height - canvas.height / 1.5) / brickHeight
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = canvas.width / 10 + j * brickWidth;
        const y = canvas.height / 10 + i * brickHeight;

        if (i % 2 == 0) ctx.fillStyle = "green";
        else ctx.fillStyle = "yellow";
        ctx.fillRect(x, y, brickWidth, brickHeight);
        ctx.strokeRect(x, y, brickWidth, brickHeight);
      }
    }

    // Dessine la raquette
    const paddleWidth = 150;
    const paddleHeight = 20;
    const paddleX = (canvas.width - paddleWidth) / 2;
    const paddleY = canvas.height - paddleHeight - 10;

    ctx.fillStyle = "darksalmon";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    // Dessine la balle
    const ballRadius = 10;
    const ballX = canvas.width / 2;
    const ballY = paddleY - ballRadius;
    const dx = 2;
    const dy = -2;

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
draw();
