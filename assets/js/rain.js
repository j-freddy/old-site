class RainParticle {
  element;
  x;
  y;
  width;
  height;

  constructor(x, y, width, height, container) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.element = this.createElement(container);
    this.updateElement();
  }

  createElement(container) {
    let elem = document.createElement("div");
    elem.classList.add("rain-particle");
    container.appendChild(elem);
    return elem;
  }

  updateElement() {
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

  update() {
    this.y++;
  }

}

window.onload = () => {
  console.log("Hello world!");

  const container = document.getElementById("rain-container");

  const particles = [];
  particles.push(new RainParticle(0, 50, 50, 50, container));

  tick(particles);
}

function tick(particles) {
  particles.forEach(p => {
    p.update();
    p.updateElement();
  });

  window.requestAnimationFrame(() => tick(particles));
}
