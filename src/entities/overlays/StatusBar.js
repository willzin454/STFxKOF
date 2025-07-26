export class StatusBar{
    constructor(fighters){
        this.image = document.querySelector('img[alt="misc"]');
        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters;
        this.frame = new Map([
            ['health-bar', [16, 18, 145, 11]],
            ['ko-white', [161, 16, 32, 14]],
            ['time-0', [16, 32, 14, 16]],
            ['time-1', [32, 32, 14, 16]],
            ['time-2', [48, 32, 14, 16]],
            ['time-3', [64, 32, 14, 16]],
            ['time-4', [80, 32, 14, 16]],
            ['time-5', [96, 32, 14, 16]],
            ['time-6', [112, 32, 14, 16]],
            ['time-7', [128, 32, 14, 16]],
            ['time-8', [144, 32, 14, 16]],
            ['time-9', [160, 32, 14, 16]],

            //names
            ['tag-Iori', [265, 45, 28, 9]],
            ['tag-Ryu', [16, 56, 28, 9]],

        ]);
    }

    drawFrame(context, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frame.get(frameKey);

        context.scale(direction, 1);
        context.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x * direction, y, sourceWidth, sourceHeight,
        );
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    update(time){

    }

    draw(context){
        this.drawFrame(context, 'health-bar', 31, 20);
        this.drawFrame(context, 'ko-white', 176, 18);
        this.drawFrame(context, 'health-bar', 353, 20, -1);
    }
}