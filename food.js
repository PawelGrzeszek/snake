
export default class Food {
  constructor(game) {
    this.width = 25;
    this.height = 25;

    this.exist = false;

    this.endTime;
    this.time = 0;

    this.position = {
      x: 1,
      y: 1
    };

    this.newFood(game);
  }

  draw(ctx) {
    if (!this.exist) return;

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.time, this.position.x + this.width / 2, this.position.y + 20);
  }

  update(game) {
    this.checkFoodTime();
    if (this.exist) return;
    this.newFood(game);
  }

  checkFoodTime() {
    this.endTime--;
    this.time = parseInt(this.endTime / 60);
    if (this.endTime <= 0) {
      this.exist = false;
    }
  }

  newFood(game) {
    this.exist = true;
    this.position = {
      x: Math.floor(Math.random() * (game.gameWidth - this.width)),
      y: Math.floor(Math.random() * (game.gameHeight - this.height))
    };

    let xf = this.position.x;
    let yf = this.position.y;

    game.snake.string.forEach(element => {
      let xs = element.x;
      let ys = element.y;

      if (
        yf - ys <= game.snake.height &&
        ys - yf <= game.snake.height &&
        xf - xs <= game.snake.width &&
        xs - xf <= game.snake.width) {

        this.exist = false;
      }
    });
    this.endTime = (Math.floor(Math.random() * 2) + 4) * 60;
  }
}
