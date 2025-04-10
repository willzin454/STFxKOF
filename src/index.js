import { Ryu } from "./ryu.js";
import { Iori } from "./iori.js";
import { Stage } from "./stage.js";

const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    
    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    const ryu = new Ryu(80, 110, 1);
    const iori = new Iori(80, 110, -1);
    const stage = new Stage();

    function frame(){
        ryu.update(context);
        iori.update(context);
        stage.draw(context);
        ryu.draw(context);
        iori.draw(context);

        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
}