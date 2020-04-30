document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const context = screen.getContext("2d");
  screen.width = 700;
  screen.height = 500;
  context.lineWidth = 3;
  context.strokeStyle = "#555";

  const pincel = {
    active: false,
    moving: false,
    position: { x: 0, y: 0 },
    beforePosition: null,
  };

  function drawLine(line) {
    context.beginPath();
    context.moveTo(line.beforePosition.x, line.beforePosition.y);
    context.lineTo(line.position.x, line.position.y);
    context.stroke();
  }

  screen.onmousedown = (e) => {
    pincel.active = true;
  };
  screen.onmouseup = (e) => {
    pincel.active = false;
  };
  screen.onmousemove = (event) => {
    pincel.position.x = event.clientX;
    pincel.position.y = event.clientY;
    pincel.moving = true;
  };

  function cycle() {
    if (pincel.active && pincel.moving && pincel.beforePosition) {
      drawLine(pincel);
      pincel.moving = false;
    }

    pincel.beforePosition = { x: pincel.position.x, y: pincel.position.y };

    setTimeout(cycle, 10);
  }

  cycle();
});
