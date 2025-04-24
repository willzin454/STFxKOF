export class Fighter{
    constructor(name, x, y, velocity){
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = {x, y};
        this.velocity = velocity;
        this.animationFrame = 1;
        this.animationTimer = 0;
    }

    update(time, context){
        const [, , width] = this.frames.get(`forwards-${this.animationFrame}`);

        if(time.previous > this.animationTimer + 90){
            this.animationTimer = time.previous;

            this.animationFrame++;
            if (this.animationFrame > 6) this.animationFrame = 1;
        }

        this.position.x += this.velocity * time.secondsPassed;

        if (this.position.x > context.canvas.width - width || this.position.x < 0) {
            this.velocity = -this.velocity;
        }
    }

    draw(context){
        const [x, y, width, height] = this.frames.get(`forwards-${this.animationFrame}`);

        context.drawImage(this.image, x, y, width, height, this.position.x, this.position.y, width, height);
    }
}