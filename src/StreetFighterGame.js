import { Ryu } from "./entities/fighters/Ryu.js";
import { Iori } from "./entities/fighters/Iori.js";
import { Stage } from "./entities/stage/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "./InputHandler.js";
import { Shadow } from "./entities/fighters/Shadow.js";
import { StatusBar } from "./entities/overlays/StatusBar.js";
import { Camera } from "./Camera.js";
import { getContext } from "./utils/context.js";

export class StreetFighterGame {
    context = getContext();
    fighters = [new Iori(0), new Ryu(1)];
    camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - (this.context.canvas.width / 2), 16, this.fighters);
        
    frameTime = {
        previous:0,
        secondsPassed:0,
    };
        
    constructor(){
        this.stage = new Stage();
        
        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.entities = [
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
        ];
    }

    update(){
        this.camera.update(this.frameTime, this.context);
        this.stage.update(this.frameTime, this.context);

        for (const entity of this.entities){
            entity.update(this.frameTime, this.context, this.camera);
        }
    }

    draw(){
        this.stage.drawBackground(this.context, this.camera);
        for (const entity of this.entities) {
            entity.draw(this.context, this.camera);
        }

        this.stage.drawForeground(this.context, this.camera);
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