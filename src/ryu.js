const ryu = document.querySelector('img[alt="Ryu"]');

const position = {
    x: 80,
    y: 100,
}

let velocity = 2;

export function updateRyu(context) {
    position.x += velocity;

    if (position.x > context.canvas.width - ryu.width || position.x < 0) {
        velocity = -velocity;
    }
}

export function drawRyu(context){
    context.drawImage(ryu, position.x, position.y);
}
