const GameViewport = {
    width: 384,
    height: 224,
}

window.onload = function() {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d'); 
    const [ryu, riustage] = document.querySelectorAll('img');

    canvasEl.width  = GameViewport.width;
    canvasEl.height = GameViewport.height;

    const position = {
        x: GameViewport.width / 2 - ryu.width / 2,
        y: 100,
    }

    let velocity = 2;

    function frame(){
        position.x += velocity;

        if(position.x > GameViewport.width - ryu.width || position.x < 0){
            velocity = -velocity;
        }

        context.drawImage(riustage, 0, 0);  
        // context.clearRect(0, 0, GameViewport.width, GameViewport.height);
        context.strokeStyle = 'yellow';
        // context.moveTo(0, 0);
        // context.lineTo(GameViewport.width, GameViewport.height);
        // context.moveTo(GameViewport.width, 0);
        // context.lineTo(0, GameViewport.height);
        // context.stroke();
        context.drawImage(ryu, position.x, position.y); 
        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
    // console.log(context);
}