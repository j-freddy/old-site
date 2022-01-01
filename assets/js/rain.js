// No clue why I named this RainParticle
// Should just name it Raindrop...
class RainParticle {
  constructor(x, y, height, opacity, container, frameContainer) {
    this.x = x;
    this.y = y;
    this.width = height/14;
    this.height = height;
    this.opacity = opacity;
    this.element = this.createElement(container);
    this.updateElement();
    this.frameContainer = frameContainer;
    this.active = true;

    this.speed = this.width;
    this.gravity = this.height * 0.05;
  }

  get maxY() {
    return this.frameContainer.offsetHeight;
  }

  createElement(container) {
    let elem = document.createElement("div");
    elem.classList.add("rain-particle");
    elem.style.width = `${this.width}px`;
    elem.style.height = `${this.height}px`;
    elem.style.opacity = this.opacity;
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
    this.speed += this.gravity;
  }

  updateElement() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

}

class Rain {
  constructor(container, frameContainer) {
    // Rain particles per second
    this.rainFrequency = 48;
    this.container = container;
    this.frameContainer = frameContainer;
    this.particles = [];
    this.startParticleCreator();
  }

  createParticle() {
    let maxX = this.frameContainer.offsetWidth;
    let x = randomValue(0, maxX);
    let height = randomValue(20, 72);
    let opacity = randomValue(0.4, 0.8);

    return new RainParticle(x, 0, height, opacity, this.container,
      this.frameContainer);
  }

  startParticleCreator() {
    setInterval(() => this.particles.push(this.createParticle()), 1000/this.rainFrequency);
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
  const container = document.getElementById("rain-container");
  const frameContainer = document.getElementById("my-jumbotron");

  const rain = new Rain(container, frameContainer);
  tick(rain);
}
