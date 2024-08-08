import './styles/style.scss';
import Game from './Game';

const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const game = new Game(gameCanvas);

// Oyunu başlatma işlevi
// Function to start the game
game.start();
