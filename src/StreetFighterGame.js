import { Ryu } from "./entities/fighters/Ryu.js";
import { Iori } from "./entities/fighters/Iori.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";  
import { registerKeyboardEvents } from "./InputHandler.js";

export class StreetFighterGame {
    constructor() {
        this.context = this.getContext();
        this.fighters = [
            new Iori(100, STAGE_FLOOR, FighterDirection.RIGHT),
            new Ryu(310, STAGE_FLOOR, FighterDirection.LEFT),
        ];
        
        this.entities = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
        ];
        
        this.frameTime = {
            previous:0,
            secondsPassed:0,
        }
    }

    getContext(){
        const canvasEl = document.querySelector('canvas');
        const context = canvasEl.getContext('2d'); 
        context.imageSmoothingEnabled = false;

        return context;
    }

    update(){
        for (const entity of this.entities){
            entity.update(this.frameTime, this.context);
        }
    }

    draw(){
        for (const entity of this.entities) {
            entity.draw(this.context);
        }
    }

    frame(time){
        window.requestAnimationFrame(this.frame.bind(this));
        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        this.update();
        this.draw();
    }

    start(){  
        registerKeyboardEvents();
        window.requestAnimationFrame(this.frame.bind(this));
    }
}