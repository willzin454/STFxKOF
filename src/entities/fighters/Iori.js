import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frames = new Map([
            ['forwards-1', [2, 448, 76, 116]],
            ['forwards-2', [81, 451, 58, 114]],
            ['forwards-3', [144, 452, 58, 109]],
            ['forwards-4', [204, 454, 54, 109]],
            ['forwards-5', [262, 453, 60, 112]],
            ['forwards-6', [326, 448, 61, 118]],
            ['forwards-7', [388, 450, 52, 111]],
            ['forwards-8', [441, 451, 62, 110]],
            ['forwards-9', [509, 449, 75, 113]],
            ['forwards-10', [583, 452, 82, 112]],
        ]);
    }
}