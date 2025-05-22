import { STAGE_FLOOR } from '../../constants/stage.js';

export class Shadow {
    constructor(fighter) {
        this.image = document.querySelector('img[alt="shadow"]');
        this.fighter = fighter;
        this.frames = [[0, 0, 80, 12], [40, 6]]; //
    }

    update(){ }

    draw(context){
        const[
            [x, y, width, height],
            [originX, originY]
        ] = this.frames;

        context.drawImage(
            this.image,
            x, y, width, height,
            Math.floor(this.fighter.position.x - originX),
            Math.floor(STAGE_FLOOR - originY),
            width, height,
        )
    }
}