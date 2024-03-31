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

    const nbColumns = Math.floor(
      (canvas.width - canvas.width / 5) / brickWidth
    );
    const nbLines = Math.floor(
      (canvas.height - canvas.height / 1.5) / brickHeight
    );

    for (let i = 0; i < nbLines; i++) {
      for (let j = 0; j < nbColumns; j++) {
        const x = canvas.width / 10 + j * brickWidth;
        const y = canvas.height / 10 + i * brickHeight;

        if (i % 2 == 0) ctx.fillStyle = "green";
        else ctx.fillStyle = "yellow";
        ctx.fillRect(x, y, brickWidth, brickHeight);
      }
    }
  }
}
draw();
