class Square {
  constructor(x, y, width, rotation, rotateVelocity, container, colour,
    initialVelocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.rotation = rotation;
    this.maxRotateVelocity = rotateVelocity;
    this.rotateSpeed = initialVelocity;
    this.element = this.createElement(container, colour);
    this.startEventHandlers();
  }

  get height() {
    return this.width;
  }

  createElement(container, colour) {
    let elem = document.createElement("div");
    elem.classList.add("interactive-square");
    elem.style.width = `${this.width}px`;
    elem.style.height = `${this.height}px`;
    elem.style.top = `${this.y}px`;
    elem.style.left = `${this.x}px`;
    elem.style.backgroundColor = colour;
    container.appendChild(elem);
    return elem;
  }

  update() {
    if (Math.abs(this.rotateSpeed) > 0.1) {
      this.rotation += this.rotateSpeed;
      this.rotation %= 360;
      this.rotateSpeed *= 0.93;
    }
  }

  updateElement() {
    this.element.style.transform = `rotate(${this.rotation}deg)`
  }

  startEventHandlers() {
    this.element.onmouseover = () => {
      this.rotateSpeed = this.maxRotateVelocity;
    }
  }
}

class SquareController {
  constructor(container, numSquares, maxX, maxY) {
    // Taken from open-color
    this.colours = [
      "#e03131",
      "#c2255c",
      "#9c36b5",
      "#6741d9",
      "#3b5bdb"
    ]
    this.container = container;
    this.squares = this.createSquares(numSquares, maxX, maxY);
  }

  createSquares(numSquares, maxX, maxY) {
    let squares = [];

    for (let i = 0; i < numSquares; i++) {
      let x = randomValue(0, maxX);
      let y = randomValue(0, maxY);
      let width = randomValue(25, 60);
      let rotation = randomValue(0, 360);
      let rotateSpeed = randomValue(4, 12);
      let rotateVel = Math.round(Math.random()) ? rotateSpeed : -rotateSpeed;
      let colour = this.colours[Math.floor(randomValue(0, this.colours.length))];
      let initialVel = Math.random() < 0.3 ? rotateVel : 0;
      squares.push(new Square(x, y, width, rotation, rotateVel, this.container,
        colour, initialVel));
    }

    return squares;
  }

  update() {
    this.squares.forEach(s => s.update());
  }

  updateElements() {
    this.squares.forEach(s => s.updateElement());
  }
}

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function tick(squareController) {
  squareController.update();
  squareController.updateElements();

  window.requestAnimationFrame(() => tick(squareController));
}

window.onload = () => {
  const container = document.getElementById("squares-container");
  const frameContainer = document.getElementById("page-content");

  // Do not generate for viewports of less than 768px (medium)
  // Since there is not enough edge space
  if (frameContainer.clientWidth < 768) {
    return;
  }

  const densityFactor = 0.0001;
  let maxX = frameContainer.clientWidth * 0.12;
  let maxY = frameContainer.clientHeight * 0.8;
  let numSquares = 4 + Math.floor(maxX * maxY * densityFactor);

  const squareController = new SquareController(container, numSquares, maxX, maxY);
  tick(squareController);
}
