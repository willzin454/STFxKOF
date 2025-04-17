import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="Iori"]');

        this.frame = [7, 1, 78, 104];
    }
}