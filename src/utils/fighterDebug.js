function drawCross(context, camera, position, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(
        Math.floor(position.x - camera.position.x) - 4,
        Math.floor(position.y - camera.position.y) - 0.5
    );
    context.lineTo(
        Math.floor(position.x - camera.position.x) + 5,
        Math.floor(position.y - camera.position.y) - 0.5
    );
    context.moveTo(
        Math.floor(position.x - camera.position.x) + 0.5,
        Math.floor(position.y - camera.position.y) - 5
    );
    context.moveTo(
        Math.floor(position.x - camera.position.x) + 0.5,
        Math.floor(position.y - camera.position.y) + 4
    );
    context.stroke();
}

function drawBox(context, camera, position, direction, dimensions, color) {
    if (!Array.isArray(dimensions)) return;

    const [x = 0, y = 0, width = 0, height = 0] = dimensions;

    context.beginPath();
    context.strokeStyle = color + 'AA';
    context.fillStyle = color + '44';
    context.fillRect(
        Math.floor(position.x + (x * direction) - camera.position.x + 0.5),
        Math.floor(position.y + y - camera.position.y + 0.5),
        width * direction,
        height,
    )
    context.rect(
        Math.floor(position.x + (x * direction) - camera.position.x + 0.5),
        Math.floor(position.y + y - camera.position.y + 0.5),
        width * direction,
        height,
    );
    context.stroke();
}

export function DEBUG_drawCollisionInfo(figther, context, camera) {
    const { position, direction, boxes } = figther;

    context.lineWidth = 1;

    drawBox(context, camera, position, direction, Object.values(boxes.push), '#55FF55');

    for (const hurtBox of boxes.hurt) {
        drawBox(context, camera, position, direction, hurtBox, '#7777FF');
    }

    drawBox(context, camera, position, direction, Object.values(boxes.hit), '#FF5555');

    drawCross(context, camera, position, '#FFFFFF');
}