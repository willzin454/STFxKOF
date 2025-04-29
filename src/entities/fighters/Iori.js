import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frames = new Map([
            ['forwards-1', [[2, 582, 76, 110], [29, 106]]],
            ['forwards-2', [[146, 581, 67, 112], [25, 107]]],
            ['forwards-3', [[261, 453, 61, 111], [29, 106]]],
            ['forwards-4', [[381, 450, 62, 115], [29, 106]]],
            ['forwards-5', [[504, 451, 83, 114], [29, 107]]],
            ['forwards-6', [[588, 452, 77, 111], [24, 106]]],
        ]);
    }
}
