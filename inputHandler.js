
export default class InputHandler {
  constructor(game) {
    let timelast = Date.now();
    document.addEventListener("keydown", event => {
      let timeInMs = Date.now();
      let currentTime = 70 - timeInMs + timelast;
      if (currentTime > 0) {
        setTimeout(() => { this.switchMove(game.snake, event.keyCode, game); }, currentTime);
      } else {
        timelast = timeInMs;
        this.switchMove(game.snake, event.keyCode, game);
      }
    });
  }

  switchMove(snake, c, game) {

    switch (c) {
      case 37:
        if (game.gameState == 0) return;
        snake.moveLeft();
        break;

      case 38:
        if (game.gameState == 0) return;
        snake.moveUp();
        break;

      case 39:
        if (game.gameState == 0) return;
        snake.moveRight();
        break;

      case 40:
        if (game.gameState == 0) return;
        snake.moveDown();
        break;

      case 32:
        game.togglePause();
        break;
    }
  }
}

