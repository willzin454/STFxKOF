import { FRAME_TIME } from "../../constants/game.js";
import { drawFrame } from "../../utils/context.js";
import { BackgroundAnimation } from "./shared/BackgroundAnimation.js";

export class Stage{
    constructor(){
        this.image = document.querySelector('img[alt="stage"]');

        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor', [8, 392, 896, 72]],
        ]);

        //NPCsBegins
        this.baldMan = new BackgroundAnimation(
            this.image,
            [
                ['bald-man-1', [552, 8, 40, 64]],
                ['bald-man-2', [552, 72, 40, 64]],
                ['bald-man-3', [552, 136, 40, 64]],
            ],
            [
                ['bald-man-1', 100], ['bald-man-2', 133], ['bald-man-3', 664], ['bald-man-2', 133]
            ]
        );
        this.cheeringWoman = new BackgroundAnimation(
            this.image,
            [
                ['woman-1', [624, 16, 32, 56]],
                ['woman-2', [624, 80, 32, 64]],
                ['woman-3', [624, 144, 32, 64]],
            ],
            [
                ['woman-1', 216], ['woman-2', 216], ['woman-3', 216], ['woman-2', 216]
            ]
        );
        this.greenJumperGuy = new BackgroundAnimation(
            this.image,
            [
                ['green-jumper-1', [664, 16, 32, 56]],
                ['green-jumper-2', [664, 80, 32, 56]],
            ],
            [
                ['green-jumper-1', 664], ['green-jumper-2', 498], ['green-jumper-1', 113], 
                ['green-jumper-2', 133]
            ]
        );
        this.blueCoatGuy = new BackgroundAnimation(
            this.image,
            [
                ['blue-coat-1', [704, 16, 48, 56]],
                ['blue-coat-2', [704, 80, 48, 56]],
                ['blue-coat-3', [704, 144, 48, 56]],
            ],
            [
                ['blue-coat-1', 246], ['blue-coat-2', 133], ['blue-coat-3', 100], 
                ['blue-coat-2', 133], ['blue-coat-1', 544], ['blue-coat-2', 133],
                ['blue-coat-3', 100], ['blue-coat-2', 133]
            ]
        );
        this.purpleJumperGuy = new BackgroundAnimation(
            this.image,
            [
                ['purple-jumper-1', [808, 24, 48, 32]],
                ['purple-jumper-2', [808, 72, 48, 32]],
                ['purple-jumper-3', [808, 120, 48, 32]],
            ],
            [   
                ['purple-jumper-1', 1992], ['purple-jumper-2', 166], ['purple-jumper-3', 166],
                ['purple-jumper-2', 166], ['purple-jumper-1', 664], ['purple-jumper-2', 166],
                ['purple-jumper-3', 166], ['purple-jumper-2', 166], ['purple-jumper-3', 166],
                ['purple-jumper-2', 166],
            ]
        );
        this.brownSuitGuy = new BackgroundAnimation(
            this.image,
            [
                ['brown-suit-1', [760, 16, 40, 40]],
                ['brown-suit-2', [760, 64, 40, 40]],
                ['brown-suit-3', [760, 112, 40, 40]],
            ],
            [
                ['brown-suit-1', 133], ['brown-suit-2', 133], ['brown-suit-3', 133],
                ['brown-suit-2', 133],
            ]
        );
        //NPCsEnds

        this.boat = {
            position: { x: 0, y: 0 },
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 22,
            animation: [0, -1, -2, -3, -4, -3, -2, -1],
        };
    }

    updateBoat(time){
        if(time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME){
            this.boat.animationTimer = time.previous;
            this.boat.animationFrame += 1;
            this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
        }

        if(this.boat.animationFrame >= this.boat.animation.length){
            this.boat.animationFrame = 0;
        }
    }

    update(time) {
        this.updateBoat(time);
        this.baldMan.update(time);
        this.cheeringWoman.update(time);
        this.greenJumperGuy.update(time);
        this.blueCoatGuy.update(time);
        this.purpleJumperGuy.update(time);
        this.brownSuitGuy.update(time);
    }

    drawFrame(context, frameKey, x, y) {
        drawFrame(context, this.image, this.frames.get(frameKey), x, y);
    }

    drawBoat(context, camera){
        this.boat.position = {
            x: Math.floor(150 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        };

        this.drawFrame(context, 'stage-boat', this.boat.position.x, this.boat.position.y);
        this.baldMan.draw(context, this.boat.position.x + 128, this.boat.position.y + 96);
        this.cheeringWoman.draw(context, this.boat.position.x + 192, this.boat.position.y + 104);
        this.greenJumperGuy.draw(context, this.boat.position.x + 224, this.boat.position.y + 104);
        this.blueCoatGuy.draw(context, this.boat.position.x + 288, this.boat.position.y + 96);
        this.purpleJumperGuy.draw(context, this.boat.position.x + 128, this.boat.position.y + 24);
        this.brownSuitGuy.draw(context, this.boat.position.x + 88, this.boat.position.y + 24);
    }

    draw(context, camera) {
        this.drawFrame(context, 'stage-background', Math.floor(16 - (camera.position.x / 2.157303)), -camera.position.y);
        this.drawBoat(context, camera);
        this.drawFrame(context, 'stage-floor', Math.floor(192 - camera.position.x), 176 - camera.position.y);
    }
}
 