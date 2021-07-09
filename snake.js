
export default class Snake {
  constructor(game) {
    this.game = game;

    this.width = 25;
    this.height = 25;

    this.maxSpeed = 8;
    this.speed = {
      x: 0,
      y: 0
    };

    this.string = [];
    for (let i = 1; i < 11; i++) {
      this.string.push({
        x: Math.floor((game.gameWidth - this.width) / 2),
        y: Math.floor((game.gameHeight - this.height) / 2)
      });
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#0000ff";
    this.string.forEach(element => {
      ctx.fillRect(element.x, element.y, this.width, this.height);
    });
  }

  moveLeft() {
    if (this.speed.x == this.maxSpeed) return;
    this.speed.x = -this.maxSpeed;
    this.speed.y = 0;
  }

  moveUp() {
    if (this.speed.y == this.maxSpeed) return;
    this.speed.y = -this.maxSpeed;
    this.speed.x = 0;
  }

  moveRight() {
    if (this.speed.x == -this.maxSpeed) return;
    this.speed.x = this.maxSpeed;
    this.speed.y = 0;
  }

  moveDown() {
    if (this.speed.y == -this.maxSpeed) return;
    this.speed.y = this.maxSpeed;
    this.speed.x = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    let xg = this.string[0].x + this.speed.x;
    let yg = this.string[0].y + this.speed.y;

    if (xg < 0) {
      xg = this.game.gameWidth - this.width;
    }
    if (yg < 0) {
      yg = this.game.gameHeight - this.height;
    }
    if (xg > this.game.gameWidth - this.width) {
      xg = 0;
    }
    if (yg > this.game.gameHeight - this.height) {
      yg = 0;
    }

    this.string.pop();
    this.string.unshift({
      x: xg,
      y: yg
    });

    this.checkCollision();
  }

  eat(food) {
    let xg = this.string[0].x;
    let yg = this.string[0].y;
    let xf = food.position.x;
    let yf = food.position.y;

    if (
      yf - yg <= this.height &&
      yg - yf <= this.height &&
      xf - xg <= this.width &&
      xg - xf <= this.width) {
      for (let i = 1; i < 21; i++) {

        this.string.push({
          x: this.string[this.string.length - 1].x,
          y: this.string[this.string.length - 1].y
        });
      }

      food.exist = false;
    }
  }

  checkCollision() {
    let xg = this.string[0].x;
    let yg = this.string[0].y;

    for (let i = 10; i < this.string.length; i++) {
      let xp = this.string[i].x;
      let yp = this.string[i].y;

      if (
        yp - yg < this.height &&
        yg - yp < this.height &&
        xp - xg < this.width &&
        xg - xp < this.width) {

        this.game.gameState = 2;
      }
    }
  }
}
