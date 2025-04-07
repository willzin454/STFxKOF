const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    const [ryu, riustage] = document.querySelectorAll('img');

    const position = {
        x: GameViewport.width / 2 - ryu.width / 2,
        y: 100,
    }

    let velocity = 2;

    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    function frame(){
        position.x += velocity;

        if(position.x > GameViewport.width - ryu.width || position.x < 0){
            velocity = -velocity;
        }

        context.clearRect(0, 0, canvasEl.width, canvasEl.height);
        context.drawImage(riustage, 0, 0);  
        context.drawImage(ryu, position.x, position.y); 
        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
}