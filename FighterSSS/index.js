const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 

    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    context.strokeStyle = 'yellow';
    context.moveTo(0, 0);
    context.lineTo(GameViewport.width, GameViewport.height);
    context.moveTo(GameViewport.width, 0);
    context.lineTo(0, GameViewport.height);
    context.stroke();

    console.log(context);
}