// No clue why I named this RainParticle
// Should just name it Raindrop...
class RainParticle {
  element;
  x;
  y;
  width;
  height;
  frameContainer;
  active = true;

  constructor(x, y, height, container, frameContainer) {
    this.x = x;
    this.y = y;
    this.width = height/12;
    this.height = height;
    this.element = this.createElement(container);
    this.updateElement();
    this.frameContainer = frameContainer;
  }

  get maxY() {
    return this.frameContainer.offsetHeight;
  }

  get speed() {
    return this.width * 0.8;
  }

  createElement(container) {
    let elem = document.createElement("div");
    elem.classList.add("rain-particle");
    container.appendChild(elem);
    return elem;
  }

  deleteElement() {
    this.element.remove();
  }

  update() {
    if (this.y > this.maxY) {
      this.deleteElement();
      this.active = false;
      return;
    }

    this.y += this.speed;
  }

  updateElement() {
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

}

class Rain {
  particles;
  container;
  frameContainer;

  constructor(container, frameContainer) {
    this.container = container;
    this.frameContainer = frameContainer;
    this.particles = [];
    this.startParticleCreator();

    this.particles.push(this.createParticle());
  }

  createParticle() {
    let maxX = this.frameContainer.offsetWidth;
    let x = randomValue(0, maxX);
    let height = randomValue(20, 60);

    return new RainParticle(x, 0, height, this.container, this.frameContainer);
  }

  startParticleCreator() {
    setInterval(() => this.particles.push(this.createParticle()), 1000/12);
  }

  update() {
    this.particles = this.particles.filter(p => p.active);

    this.particles.forEach(p => p.update());
  }

  updateElements() {
    this.particles.forEach(p => p.updateElement());
  }
}

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function tick(rain) {
  rain.update();
  rain.updateElements();

  window.requestAnimationFrame(() => tick(rain));
}

window.onload = () => {
  console.log("Hello world!");

  const container = document.getElementById("rain-container");
  const frameContainer = document.getElementById("my-jumbotron");

  const rain = new Rain(container, frameContainer);
  tick(rain);
}
