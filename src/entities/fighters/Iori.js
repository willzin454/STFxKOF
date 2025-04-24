import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frames = new Map([
            ['forwards-1', [2, 453, 76, 109]],
            ['forwards-2', [78, 131, 60, 89]],
            ['forwards-3', [152, 128, 64, 92]],
            ['forwards-4', [229, 130, 63, 90]],
            ['forwards-5', [307, 128, 54, 91]],
            ['forwards-6', [371, 128, 50, 89]],
        ]);
    }
}