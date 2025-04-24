import { Fighter } from "./Fighters.js";

export class Ryu extends Fighter{
    constructor(x, y, velocity){
        super("Ryu", x, y, velocity);

        this.image = document.querySelector('img[alt="Ryu"]');

        this.frames = new Map([
            ['forwards-1', [4, 134, 64, 90]],
            ['forwards-2', [72, 127, 73, 96]],
            ['forwards-3', [152, 128, 64, 92]],
            ['forwards-4', [229, 130, 63, 90]],
            ['forwards-5', [307, 128, 54, 91]],
            ['forwards-6', [371, 128, 50, 89]],
        ]);
    }
}
