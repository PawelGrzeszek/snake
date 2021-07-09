
export default class Score {
    constructor(game) {
        this.game = game;

        this.font = "30px Arial";
        this.color = "#000000";

        this.time = 0;
    }

    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText("Wynik " + this.game.snake.string.length, 80, 40);
        ctx.fillText("Czas " + this.time + "s", this.game.gameWidth - 80, 40);
    }

    update(game) {
        this.time = parseInt(game.gameTime / 60);
    }
}