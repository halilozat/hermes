class Message {
    private text: string;
    private x: number;
    private y: number;
    private visible: boolean;
    private timer: number;
    private bubbleElement: HTMLElement;

    constructor() {
        this.text = '';
        this.x = 0;
        this.y = 0;
        this.visible = false;
        this.timer = 0;
        this.bubbleElement = document.getElementById('messageBubble')!;
    }

    // Mesajı ayarla ve görünür yap
    public setMessage(text: string, x: number, y: number): void {
        this.text = text;
        this.x = x;
        this.y = y;
        this.visible = true;
        this.timer = 0;
        this.bubbleElement.innerText = text;
        this.bubbleElement.style.left = `${x}px`;
        this.bubbleElement.style.top = `${y}px`;
        this.bubbleElement.style.display = 'block';
    }

    // Mesajı güncelle
    public update(deltaTime: number): void {
        if (this.visible) {
            this.timer += deltaTime;
            if (this.timer > 3000) { // Mesaj 3 saniye sonra kaybolur
                this.visible = false;
                this.bubbleElement.style.display = 'none';
            }
        }
    }
}

export default Message;
