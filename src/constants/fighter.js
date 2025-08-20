export const PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;

export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
};

export const FighterState = {
    //mov
    IDLE: 'idle',
    WALK_FORWARD: 'walkForwards',
    WALK_BACKWARD: 'walkBackwards',
    JUMP_START: "jumpStart",
    JUMP_UP: 'jumpUp',
    JUMP_FORWARD: 'jumpForwards',
    JUMP_BACKWARD: 'jumpBackwards',
    JUMP_LAND: "jumpLand",
    CROUCH: 'crouch',
    CROUCH_DOWN: 'crouchDown',
    CROUCH_UP: 'crouchUp',
    IDLE_TURN: 'idleTurn',
    CRUNCH_TURN: 'crunchTurn',
    //atk
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    MEDIUM_KICK: 'mediumKick',
    HEAVY_KICK: 'heavyKick',
};

export const FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
};

export const PushBoxRyu = {
    IDLE: [-30, -80, 50, 78],
    JUMP: [-16, -91, 32, 66],
    BEND: [-16, -58, 32, 58],
    CRUNCH: [-16, -50, 32, 50],
};

export const PushBoxIori = {
    IDLE: [-25, -93, 60, 90],
    JUMP: [-16, -91, 32, 66],
    BEND: [-16, -58, 32, 58],
    CRUNCH: [-16, -50, 32, 50],
};

// Primeira e terceira = HORIZONTAL, segunda e quarta = VERTICAL (começar ajustando a primeira e a segunda primeiro)
export const HurtBoxRyu = {
    IDLE: [[-8, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    BACKWARD: [[-19, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    FORWARD: [[-3, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    JUMP: [[-13, -106, 28, 18], [-26, -90, 40, 42], [-22, -66, 38, 18]],
    BEND: [[-2, -68, 24, 18], [-16, -53, 44, 24], [-16, -24, 44, 24]],
    CROUCH: [[6, -61, 24, 18], [-16, -46, 44, 24], [-16, -24, 44, 24]],
    PUNCH: [[11, -94, 24, 18], [-7, -77, 40, 43], [-7, -33, 40, 33]],
};

export const HurtBoxIori = {
    IDLE: [[10, -100, 18, 18], [-10, -82, 46, 51], [-20, -31, 50, 32]],
    BACKWARD: [[-10, -101, 24, 16], [-26, -86, 40, 58], [-26, -31, 40, 32]],
    FORWARD: [[-3, -100, 24, 16], [-26, -84, 40, 55], [-26, -31, 40, 32]],
    JUMP: [[-8, -90, 26, 18], [-26, -80, 55, 42], [-23, -40, 50, 25]],
    BEND: [[-2, -68, 24, 18], [-16, -53, 44, 24], [-16, -24, 44, 24]],
    CROUCH: [[-1, -59, 20, 18], [-25, -46, 46, 24], [-25, -24, 47, 24]],
    PUNCH: [[11, -94, 24, 18], [-7, -77, 40, 43], [-7, -33, 40, 33]],
};