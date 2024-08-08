import Message from './Message';

class Player {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;
    private direction: string;
    private frame: number;
    private frameCount: number;
    private sprite: HTMLImageElement;
    private moving: boolean;
    private message: Message;

    constructor(x: number, y: number, width: number, height: number, speed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 'down';
        this.frame = 0;
        this.frameCount = 3;
        this.sprite = new Image();
        this.sprite.src = '/assets/character.png';
        this.moving = false;
        this.message = new Message();
    }

    // Oyuncuyu çizme işlevi
    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.sprite.complete) {
            const spriteWidth = this.sprite.width / 3;
            const spriteHeight = this.sprite.height / 8;

            let spriteX = this.frame * spriteWidth;
            let spriteY;

            switch (this.direction) {
                case 'up':
                    spriteY = 2 * spriteHeight;
                    break;
                case 'down':
                    spriteY = 0;
                    break;
                case 'left':
                    spriteY = 3 * spriteHeight;
                    break;
                case 'right':
                    spriteY = spriteHeight;
                    break;
            }

            ctx.drawImage(
                this.sprite,
                spriteX, spriteY, spriteWidth, spriteHeight,
                this.x, this.y, this.width, this.height
            );

            // Mesajı çiz
            this.message.setMessage(this.message.text, this.x + this.width / 2, this.y - 20);
        } else {
            console.error('Player sprite not loaded properly');
        }
    }

    // Klavye girişlerini işleme işlevi
    public handleInput(key: string): void {
        switch (key) {
            case 'ArrowUp':
                this.y -= this.speed;
                this.direction = 'up';
                this.moving = true;
                break;
            case 'ArrowDown':
                this.y += this.speed;
                this.direction = 'down';
                this.moving = true;
                break;
            case 'ArrowLeft':
                this.x -= this.speed;
                this.direction = 'left';
                this.moving = true;
                break;
            case 'ArrowRight':
                this.x += this.speed;
                this.direction = 'right';
                this.moving = true;
                break;
        }
    }

    // Animasyon karesini güncelleme işlevi
    public updateFrame(): void {
        if (this.moving) {
            this.frame = (this.frame + 1) % this.frameCount;
        } else {
            this.frame = 0;
        }
    }

    // Hareketi durdurma işlevi
    public stopMoving(): void {
        this.moving = false;
        this.frame = 0;
    }

    // Mesajı ayarla
    public setMessage(text: string): void {
        this.message.setMessage(text, this.x + this.width / 2, this.y - 20);
    }

    // Mesajı güncelle
    public updateMessage(deltaTime: number): void {
        this.message.update(deltaTime);
    }
}

export default Player;
