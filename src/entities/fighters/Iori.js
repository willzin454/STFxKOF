import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frames = new Map([
            // Mover para frente
            ['forwards-1', [[2, 582, 76, 110], [29, 106]]],
            ['forwards-2', [[146, 581, 67, 112], [25, 107]]],
            ['forwards-3', [[261, 453, 61, 111], [29, 106]]],
            ['forwards-4', [[381, 450, 62, 115], [29, 106]]],
            ['forwards-5', [[504, 451, 83, 114], [29, 107]]],
            ['forwards-6', [[588, 452, 77, 111], [24, 106]]],

            // Mover para trás
            ['backwards-1', [[4, 585, 74, 106], [28, 103]]],
            ['backwards-2', [[143, 581, 70, 109], [30, 106]]],
            ['backwards-3', [[209, 578, 59, 114], [27, 109]]],
            ['backwards-4', [[338, 578, 55, 115], [27, 109]]],
            ['backwards-5', [[452, 577, 66, 118], [28, 110]]],
            ['backwards-6', [[513, 580, 75, 111], [33, 105]]],
        ]);

        this.animations = {
            'walkForwards': ['forwards-1', 'forwards-2', 'forwards-3', 'forwards-4', 'forwards-5', 'forwards-6'],
            'walkBackwards': ['backwards-1', 'backwards-2', 'backwards-3', 'backwards-4', 'backwards-5', 'backwards-6'],
        };
    }
}
