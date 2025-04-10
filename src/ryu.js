import { Fighter } from "./fighter.js";

export class Ryu extends Fighter{
    constructor(x, y, velocity){
        super("Ryu", x, y, velocity);

        this.image = document.querySelector('img[alt="Ryu"]');
    }
}
