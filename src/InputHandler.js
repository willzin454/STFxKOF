const heldKeys = new Set();

function handleKeyDown(event){
    event.preventDefault();

    heldKeys.add(event.code);
}

function handleKeyUp(event){
    event.preventDefault();

    heldKeys.delete(event.code);
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);