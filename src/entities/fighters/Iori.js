import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frames = new Map([
            ['forwards-1', [2, 448, 76, 116]],
            ['forwards-2', [144, 452, 58, 109]],
            ['forwards-3', [259, 452, 62, 111]],
            ['forwards-4', [327, 452, 57, 109]],
            ['forwards-5', [385, 451, 55, 114]],
            ['forwards-6', [585, 452, 78, 112]],
        ]);
    }
}