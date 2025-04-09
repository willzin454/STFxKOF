const background = document.querySelector('img[alt="RyuStage"]');

export function drawBackground(context){
    context.drawImage(background, 0, 0);
}
