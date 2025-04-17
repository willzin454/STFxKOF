import { Fighter } from "./Fighters.js";

export class Ryu extends Fighter{
    constructor(x, y, velocity){
        super("Ryu", x, y, velocity);

        this.image = document.querySelector('img[alt="Ryu"]');

        this.frame = [7, 13, 59, 90];
    }
}

// this.frame = [7, 13, 59, 90];