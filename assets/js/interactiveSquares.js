class Square {
  element;
  x;
  y;
  width;
  rotation;
  rotateSpeed;

  constructor(x, y, width, rotation, container) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.rotation = rotation;
    this.rotateSpeed = 0;
    this.element = this.createElement(container);
    this.startEventHandlers();
  }

  get height() {
    return this.width;
  }

  createElement(container) {
    let elem = document.createElement("div");
    elem.classList.add("interactive-square");
    elem.style.width = `${this.width}px`;
    elem.style.height = `${this.height}px`;
    elem.style.top = `${this.y}px`;
    elem.style.left = `${this.x}px`;
    container.appendChild(elem);
    return elem;
  }

  update() {
    if (this.rotateSpeed > 0.1) {
      this.rotation += this.rotateSpeed;
      this.rotation %= 360;
      this.rotateSpeed *= 0.9;
    }
  }

  updateElement() {
    this.element.style.transform = `rotate(${this.rotation}deg)`
  }

  startEventHandlers() {
    this.element.onmouseover = () => {
      this.rotateSpeed = 10;
    }
  }
}

class SquareController {
  squares;
  container;

  constructor(container, numSquares, maxX, maxY) {
    this.container = container;
    this.squares = this.createSquares(numSquares, maxX, maxY);
  }

  createSquares(numSquares, maxX, maxY) {
    let squares = [];

    for (let i = 0; i < numSquares; i++) {
      let x = randomValue(0, maxX);
      let y = randomValue(0, maxY);
      let width = randomValue(30, 50);
      let rotation = randomValue(0, 360);
      squares.push(new Square(x, y, width, rotation, this.container));
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
  console.log("Hello world!");

  const container = document.getElementById("squares-container");
  const frameContainer = document.getElementById("page-content");

  const densityFactor = 0.0001;
  let maxX = frameContainer.clientWidth * 0.12;
  let maxY = frameContainer.clientHeight * 0.5;
  let numSquares = 4 + Math.floor(maxX * maxY * densityFactor);

  console.log(maxX);
  console.log(maxY);
  console.log(numSquares);

  const squareController = new SquareController(container, numSquares, maxX, maxY);
  tick(squareController);
}