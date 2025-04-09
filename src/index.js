import { drawRyu, updateRyu } from "./ryu.js";
import { drawBackground } from "./stage.js";

const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    
    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    function frame(){
        updateRyu(context);
        drawBackground(context);
        drawRyu(context);
        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
}