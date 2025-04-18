import { Ryu } from "./entities/fighters/Ryu.js";
import { Iori } from "./entities/fighters/Iori.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";

const GameViewport = {
    width: 384,
    height: 224,
}   

window.addEventListener = ('load', function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    
    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    const entities = [
        new Stage(),
        new Ryu(80, 110, 150),
        new Iori(80, 97, -150),
        new FpsCounter(),
    ];

    let previousTime = 0;
    let secondsPassed = 0;

    function frame(time){
        window.requestAnimationFrame(frame)
        
        secondsPassed = (time - previousTime) / 1000;
        previousTime = time;

        for (const entity of entities){
            entity.update(secondsPassed, context);
        }

        for (const entity of entities) {
            entity.draw(context);
        }
    }
    window.requestAnimationFrame(frame)
});