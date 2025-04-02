const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    const ryu = document.querySelector('img');

    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    const position = {
        x: 0,
        y: 0,
    }

    function frame(){
        position.x += 1;

        context.strokeStyle = 'yellow';
        context.moveTo(0, 0);
        context.lineTo(GameViewport.width, GameViewport.height);
        context.moveTo(GameViewport.width, 0);
        context.lineTo(0, GameViewport.height);
        context.stroke();
        context.drawImage(ryu, position.x, position.y); 
        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
    console.log(context);
}