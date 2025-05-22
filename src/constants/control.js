export const GamepadThumbstick = {
    DEAD_ZONE: 'deadZone',
    HORIZONTAL_AXE_ID: 'horizontalAxeId',
    VERTICAL_AXE_ID: 'verticalAxeId',
};

export const Control = {
    LEFT: 'left',
    RIGHT: 'right', 
    UP: 'up',   
    DOWN: 'down',
};

export const controls = [
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0, // ✔️ número
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,   // ✔️ número

            [Control.LEFT]: 14,   // ✔️ número
            [Control.RIGHT]: 15,  // ✔️ número
            [Control.UP]: 12,     // ✔️ número
            [Control.DOWN]: 13,   // ✔️ número
        },
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
        },
    },
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
        },
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
        },
    }
];
