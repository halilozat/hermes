import Player from './Player';

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private player: Player;
    private map: HTMLImageElement;
    private lastFrameTime: number;
    private frameInterval: number;
    private mapX: number;
    private mapY: number;
    private mapWidth: number;
    private mapHeight: number;
    private message: string;
    private messageTime: number;
    private messageDuration: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.player = new Player(canvas.width / 2 - 15, canvas.height / 2 - 15, 30, 30, 5);
        this.map = new Image();
        this.map.src = '/assets/map.png';
        this.lastFrameTime = 0;
        this.frameInterval = 100; // Her 100 milisaniyede bir kare güncelleme
        this.mapX = 0;
        this.mapY = 0;
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.message = '';
        this.messageTime = 0;
        this.messageDuration = 3000; // Mesajın görünme süresi (milisaniye)

        // Harita yüklendiğinde boyutları belirle
        this.map.onload = () => {
            this.mapWidth = this.map.width;
            this.mapHeight = this.map.height;
            console.log('Map loaded');
        };

        this.map.onerror = (err) => {
            console.error('Error loading map', err);
        };

        window.addEventListener('keydown', (e) => {
            this.player.handleInput(e.key);
        });

        window.addEventListener('keyup', (e) => {
            this.player.stopMoving();
        });

        const sendMessageButton = document.getElementById('sendMessage');
        sendMessageButton!.addEventListener('click', () => {
            const messageInput = document.getElementById('message') as HTMLInputElement;
            this.showMessage(messageInput.value);
            messageInput.value = '';
        });
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawMap(): void {
        // Haritayı canvas boyutuna sığacak şekilde yerleştir
        this.ctx.drawImage(
            this.map,
            this.mapX, this.mapY, this.canvas.width, this.canvas.height,
            0, 0, this.canvas.width, this.canvas.height
        );
    }

    private drawMessage(): void {
        if (this.message) {
            this.ctx.font = '20px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(this.message, this.player.x, this.player.y - 20);
        }
    }

    private updateMessage(deltaTime: number): void {
        if (this.message) {
            this.messageTime += deltaTime;
            if (this.messageTime > this.messageDuration) {
                this.message = '';
                this.messageTime = 0;
            }
        }
    }

    private update(currentTime: number): void {
        const deltaTime = currentTime - this.lastFrameTime;

        this.clearCanvas();
        this.drawMap();
        this.player.draw(this.ctx);

        if (deltaTime >= this.frameInterval) {
            this.player.updateFrame();
            this.lastFrameTime = currentTime;
        }

        this.updateMessage(deltaTime);
        this.drawMessage();
    }

    public start(): void {
        const gameLoop = (currentTime: number) => {
            this.update(currentTime);
            requestAnimationFrame(gameLoop);
        };

        this.map.onload = () => {
            console.log('Starting game loop');
            requestAnimationFrame(gameLoop);
        };
    }

    private showMessage(message: string): void {
        this.message = message;
        this.messageTime = 0;
    }
}

export default Game;
