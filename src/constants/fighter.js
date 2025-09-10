export const PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;
export const FIGHTER_HURT_DELAY = 7 + 8;

export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
};

export const FighterId = {
    RYU: 'Ryu',
    IORI: 'Iori',
};

export const FighterAttackType = {
    PUNCH: 'punch',
    KICK: 'kick',
};

export const FighterAttackStrength = {
    LIGHT: "light",
    MEDIUM: "medium",
    HEAVY: "heavy",
};

export const FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
        score: 100,
        damage: 12,
    },
    [FighterAttackStrength.MEDIUM]: {
        score: 300,
        damage: 20,
    },
    [FighterAttackStrength.HEAVY]: {
        score: 500,
        damage: 28,
    }
};

export const FighterState = {
    //mov
    IDLE: 'idle',
    WALK_FORWARD: 'walk-forwards',
    WALK_BACKWARD: 'walk-backwards',
    JUMP_START: "jump-start",
    JUMP_UP: 'jump-up',
    JUMP_FORWARD: 'jump-forwards',
    JUMP_BACKWARD: 'jump-backwards',
    JUMP_LAND: "jump-land",
    CROUCH: 'crouch',
    CROUCH_DOWN: 'crouch-down',
    CROUCH_UP: 'crouch-up',
    IDLE_TURN: 'idle-turn',
    CRUNCH_TURN: 'crunch-turn',
    //atk
    LIGHT_PUNCH: 'light-punch',
    MEDIUM_PUNCH: 'medium-punch',
    HEAVY_PUNCH: 'heavy-punch',
    LIGHT_KICK: 'light-kick',
    MEDIUM_KICK: 'medium-kick',
    HEAVY_KICK: 'heavy-kick',
    HURT_HEAD_LIGHT: 'hurt-head-light',
    HURT_HEAD_MEDIUM: 'hurt-head-medium',
    HURT_HEAD_HEAVY: 'hurt-head-heavy',
    HURT_BODY_LIGHT: 'hurt-body-light',
    HURT_BODY_MEDIUM: 'hurt-body-medium',
    HURT_BODY_HEAVY: 'hurt-body-heavy',
};

export const FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
};

export const PushBox = {
    IDLE: [-16, -80, 32, 78],
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
    CROUCH: [[6, -59, 20, 18], [-16, -46, 44, 24], [-16, -24, 44, 24]],
    PUNCH: [[11, -94, 24, 18], [-7, -77, 40, 43], [-7, -33, 40, 33]],
};

export const HurtBoxIori = {
    IDLE: [[10, -100, 18, 18], [-10, -82, 46, 51], [-20, -31, 50, 32]],
    BACKWARD: [[-10, -101, 24, 16], [-26, -86, 40, 58], [-26, -31, 40, 32]],
    FORWARD: [[-3, -100, 24, 16], [-20, -84, 40, 55], [-26, -31, 40, 32]],
    JUMP: [[-8, -90, 26, 18], [-26, -80, 55, 42], [-23, -40, 50, 25]],
    BEND: [[-2, -68, 24, 18], [-16, -53, 44, 24], [-16, -24, 44, 24]],
    CROUCH: [[-1, -59, 20, 18], [-25, -46, 46, 24], [-25, -24, 47, 24]],
    PUNCH: [[11, -94, 24, 18], [-7, -77, 40, 43], [-7, -33, 40, 33]],
};