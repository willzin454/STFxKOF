export class Fighter{
    constructor(name, x, y, direction){
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = {x, y};
        this.direction = direction;
        this.velocity = 150 * direction;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        this.state = this.changeState();
    }

    changeState = () => this.velocity * this.direction < 0 ? 'walkBackwards' : 'walkForwards';

    update(time, context){
        const [[, , width]] = this.frames.get(this.animations[this.state][this.animationFrame]);

        if(time.previous > this.animationTimer + 80){
            this.animationTimer = time.previous;
            this.animationFrame++;
            if (this.animationFrame > 5) this.animationFrame = 0;
        }

        this.position.x += this.velocity * time.secondsPassed;

        if (this.position.x > context.canvas.width - width / 2){
            this.velocity = -150;
            this.state = this.changeState();
        }

        if (this.position.x < width / 2){
            this.velocity = 150;
            this.state = this.changeState();
        }
    }

    drawDebug(context){
        context.lineWidth =1;
        context.beginPath();
        context.strokeStyle = "White";
        context.moveTo(this.position.x - 5, this.position.y);
        context.lineTo(this.position.x + 4, this.position.y);
        context.moveTo(this.position.x, this.position.y - 5);
        context.moveTo(this.position.x, this.position.y + 4);
        context.stroke();
    }

    draw(context){
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(this.animations[this.state][this.animationFrame]);

        context.scale(this.direction, 1);

        context.drawImage(
            this.image, 
            x, y, 
            width, height, 
            this.position.x * this.direction - originX, this.position.y - originY, 
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0)

        this.drawDebug(context);
    }
}