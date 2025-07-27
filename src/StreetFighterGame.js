import { Ryu } from "./entities/fighters/Ryu.js";
import { Iori } from "./entities/fighters/Iori.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { FIGHTER_START_DISTANCE, FighterDirection } from "./constants/fighter.js";  
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "./InputHandler.js";
import { Shadow } from "./entities/fighters/Shadow.js";
import { StatusBar } from "./entities/overlays/StatusBar.js";
import { Camera } from "./Camera.js";

export class StreetFighterGame {
    constructor() {
        this.context = this.getContext();
        this.fighters = [
            new Iori(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGE_FLOOR, FighterDirection.RIGHT, 0),
            new Ryu(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGE_FLOOR, FighterDirection.LEFT, 1),
        ];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - (this.context.canvas.width / 2), 16, this.fighters);

        this.entities = [
            new Stage(),
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
        ];
        
        this.frameTime = {
            previous:0,
            secondsPassed:0,
        };
    }

    getContext(){
        const canvasEl = document.querySelector('canvas');
        const context = canvasEl.getContext('2d'); 
        context.imageSmoothingEnabled = false;

        return context;
    }

    update(){
        this.camera.update(this.frameTime, this.context);

        for (const entity of this.entities){
            entity.update(this.frameTime, this.context, this.camera);
        }
    }

    draw(){
        for (const entity of this.entities) {
            entity.draw(this.context, this.camera);
        }
    }

    frame(time){
        window.requestAnimationFrame(this.frame.bind(this));
        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        pollGamepads();
        this.update();
        this.draw();
    }

    start(){  
        registerKeyboardEvents();
        registerGamepadEvents();

        window.requestAnimationFrame(this.frame.bind(this));
    }
}