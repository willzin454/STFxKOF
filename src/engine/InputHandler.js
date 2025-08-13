import { Control, controls, GamepadThumbstick } from "../constants/control.js";
import { FighterDirection } from "../constants/fighter.js";

const heldKeys = new Set();
const gamePads = new Map();

const mappedKeys = controls.map(({keyboard}) => Object.values(keyboard)).flat();

function handleKeyDown(event){
    if(!mappedKeys.includes(event.code)) return;

    event.preventDefault();
    heldKeys.add(event.code);
}

function handleKeyUp(event){
    if(!mappedKeys.includes(event.code)) return;

    event.preventDefault();
    heldKeys.delete(event.code);
}

function handleGamepadConnected(event){
    const { gamepad: {index, axes, buttons} } = event;
    gamePads.set(index, {axes, buttons});
}

function handleGamepadDisconnected(event){
    const { gamepad: {index} } = event;
    gamePads.delete(index);
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

export function registerGamepadEvents() {
    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
}

export function pollGamepads(){
    for (const gamePad of navigator.getGamepads()){
        if(!gamePad) continue;

        if(gamePads.has(gamePad.index)){
            const {index, axes, buttons} = gamePad;
            gamePads.set(index, {axes, buttons});
        }
    }
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export const isButtonDown = (padId, button) => gamePads.get(padId)?.buttons[button].pressed;
export const isButtonUp = (padId, button) => !gamePads.get(padId)?.buttons[button].pressed;

export const isAxesGreater = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] >= value;
export const isAxesLower = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] <= value;

export const isControlDown = (id, control) => isKeyDown(controls[id].keyboard[control]) 
|| isButtonDown(id, controls[id].gamePad[control]);

export const isLeft = (id) => (
    isKeyDown(controls[id].keyboard[Control.LEFT]) ||
    isButtonDown(id, controls[id].gamePad[Control.LEFT]) ||
    isAxesLower(id, controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID], -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE])
);

export const isRight = (id) => (
    isKeyDown(controls[id].keyboard[Control.RIGHT]) ||
    isButtonDown(id, controls[id].gamePad[Control.RIGHT]) ||
    isAxesGreater(id, controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID], controls[id].gamePad[GamepadThumbstick.DEAD_ZONE])
);

export const isUp = (id) => (
    isKeyDown(controls[id].keyboard[Control.UP]) ||
    isButtonDown(id, controls[id].gamePad[Control.UP]) ||
    isAxesLower(id, controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID], -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE])
);

export const isDown = (id) => (
    isKeyDown(controls[id].keyboard[Control.DOWN]) ||
    isButtonDown(id, controls[id].gamePad[Control.DOWN]) ||
    isAxesGreater(id, controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID], controls[id].gamePad[GamepadThumbstick.DEAD_ZONE])
);

export const isForward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);

export const isIdle = (id) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id));