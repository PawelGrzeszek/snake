import Snake from "./snake.js";
import InputHandler from "./inputHandler.js";
import Food from "./food.js";
import Score from "./score.js";

const gameState = {
    paused: 0,
    running: 1,
    gameover: 2,
};

export default class Game {
    constructor(canvas) {
        this.gameHeight = canvas.height;
        this.gameWidth = canvas.width;
        this.gameState = gameState.paused;
        this.gameTime = 0;
    }

    start() {
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.score = new Score(this);
        this.gameObjects = [this.snake, this.food, this.score];
        new InputHandler(this);

        if (this.gameState != gameState.paused)
            this.gameState = gameState.running;
    }

    update(deltaTime) {
        if (this.gameState == gameState.paused || this.gameState == gameState.gameover) return;

        this.gameTime++;

        this.snake.eat(this.food);
        this.snake.update(deltaTime);
        this.food.update(this);
        this.score.update(this);
    }

    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));

        if (this.gameState == gameState.paused) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fill();
            ctx.fontStyle = "30px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("PAUZA", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState == gameState.gameover) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.fontStyle = "30px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            let text = "Wynik: " + this.snake.string.length + " Czas gry: " + this.score.time + "s";
            ctx.fillText("KONIEC GRY", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2 + 30);
        }
    }

    togglePause() {
        if (this.gameState == gameState.gameover) location.reload();

        if (this.gameState == gameState.paused) {
            this.gameState = gameState.running;
        } else {
            this.gameState = gameState.paused;
        }
    }
}
