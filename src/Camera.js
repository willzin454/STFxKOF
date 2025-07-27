export class Camera {
    constructor(x, y, fighters){
        this.position = { x, y };
        this.fighters = fighters;

        this.speed = 60;
    }

    update(time, context){
        this.position.x += this.speed * time.secondsPassed;

        if(this.position.x > 640 || this.position.x < 256) this.speed = -this.speed;
    }
}