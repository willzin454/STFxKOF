export class Stage{
    constructor(){
        this.image = document.querySelector('img[alt="stage"]');

        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor', [8, 392, 896, 72]],
        ])
    }

    update() {

    }

   drawFrame(context, frameKey, x, y) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight,
        );
    } 

    draw(context, camera) {
        this.drawFrame(context, 'stage-background', Math.floor(16 - (camera.position.x / 2.157303)), -camera.position.y);
        this.drawFrame(context, 'stage-boat', Math.floor(150 - (camera.position.x / 1.613445)), -1 - camera.position.y);
        this.drawFrame(context, 'stage-floor', Math.floor(192 - camera.position.x), 176 - camera.position.y);
    }
}
 