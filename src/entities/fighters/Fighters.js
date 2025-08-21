import { Control } from "../../constants/control.js";
import { FIGHTER_START_DISTANCE, FighterDirection, FighterState, FrameDelay, PUSH_FRICTION } from "../../constants/fighter.js";
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from "../../constants/stage.js";
import * as control from "../../engine/InputHandler.js";
import { rectsOverlap } from "../../utils/collisions.js";

export class Fighter {
    constructor(name, playerId) {
        this.name = name;
        this.playerId = playerId;
        this.position = {
            x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE),
            y: STAGE_FLOOR
        };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;
        this.gravity = 0;
        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        this.image = new Image();
        this.opponent;
        this.boxes = {
            push: { x: 0, y: 0, width: 0, height: 0 },
            hurt: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            hit: { x: 0, y: 0, width: 0, height: 0 }
        };

        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND, FighterState.IDLE_TURN,
                    FighterState.LIGHT_PUNCH, FighterState.MEDIUM_PUNCH, FighterState.HEAVY_PUNCH,
                    FighterState.LIGHT_KICK, FighterState.MEDIUM_KICK, FighterState.HEAVY_KICK,
                ],
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_BACKWARD
                ],
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_FORWARD
                ],
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [
                    FighterState.JUMP_START,
                ],
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [
                    FighterState.JUMP_START,
                ],
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [
                    FighterState.JUMP_START,
                ],
            },
            [FighterState.JUMP_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ],
            },
            [FighterState.CROUCH]: {
                init: () => { },
                update: this.handleCrunchState.bind(this),
                validFrom: [FighterState.CROUCH_DOWN, FighterState.CRUNCH_TURN],
            },
            [FighterState.CROUCH_DOWN]: {
                init: this.handleCrunchDownInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.CROUCH_UP]: {
                init: () => { },
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.IDLE_TURN]: {
                init: () => { },
                update: this.handleCrouchUpState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.CRUNCH_TURN]: {
                init: () => { },
                update: this.handleCrunchTurnState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.LIGHT_PUNCH]: {
                init: this.handleStandardLightAttackInit.bind(this),
                update: this.handleLightPunchState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.MEDIUM_PUNCH]: {
                init: this.handleStandardMediumAttackInit.bind(this),
                update: this.handleMediumPunchState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD],
            },
            [FighterState.HEAVY_PUNCH]: {
                init: this.handleStandardHeavyAttackInit.bind(this),
                update: this.handleHeavyPunchState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD],
            },
            [FighterState.LIGHT_KICK]: {
                init: this.handleStandardLightAttackInit.bind(this),
                update: this.handleLightKickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.MEDIUM_KICK]: {
                init: this.handleStandardMediumAttackInit.bind(this),
                update: this.handleMediumKickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD],
            },
            [FighterState.HEAVY_KICK]: {
                init: this.handleStandardHeavyAttackInit.bind(this),
                update: this.handleHeavyKickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD],
            },
        };

        this.changeState(FighterState.IDLE);
    }

    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] == FrameDelay.TRANSITION;

    hasCollidedWithOpponent = () => rectsOverlap(
        this.position.x + this.boxes.push.x, this.position.y + this.boxes.push.y,
        this.boxes.push.width, this.boxes.push.height,
        this.opponent.position.x + this.opponent.boxes.push.x,
        this.opponent.position.y + this.opponent.boxes.push.y,
        this.opponent.boxes.push.width, this.opponent.boxes.push.height,
    );

    resetVelocities() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    getDirection() {
        if (
            this.position.x + this.boxes.push.x + this.boxes.push.width
            <= this.opponent.position.x + this.opponent.boxes.push.x
        ) {
            return FighterDirection.RIGHT;
        } else if (
            this.position.x + this.boxes.push.x
            >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width
        ) {
            return FighterDirection.LEFT;
        }
        return this.direction;
    }

    getBoxes(frameKey) {
        const [,
            [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
            [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
        ] = this.frames.get(frameKey);

        return {
            push: { x: pushX, y: pushY, width: pushWidth, height: pushHeight },
            hurt: [head, body, feet],
            hit: { x: hitX, y: hitY, width: hitWidth, height: hitHeight },
        };
    }

    changeState(newState) {
        if (
            newState === this.currentState
            || !this.states[newState].validFrom.includes(this.currentState)
        ) return;

        this.currentState = newState;
        this.animationFrame = 0;
        this.states[this.currentState].init();
    }

    handleIdleInit() {
        this.resetVelocities();
    }

    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleJumpInit() {
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }

    handleCrunchDownInit() {
        this.resetVelocities();
    }

    handleJumpStartInit() {
        this.resetVelocities();
    }

    handleJumpLandInit() {
        this.resetVelocities();
    }

    handleStandardLightAttackInit() {
        this.resetVelocities();
    }

    handleStandardMediumAttackInit() {
        this.resetVelocities();
    }

    handleStandardHeavyAttackInit() {
        this.resetVelocities();
    }

    handleIdleState() {
        if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        } else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        } else if (control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD);
        } else if (control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_FORWARD);
        } else if (control.isLightPunch(this.playerId)) {
            this.changeState(FighterState.LIGHT_PUNCH);
        } else if (control.isMediumPunch(this.playerId)) {
            this.changeState(FighterState.MEDIUM_PUNCH);
        } else if (control.isHeavyPunch(this.playerId)) {
            this.changeState(FighterState.HEAVY_PUNCH);
        } else if (control.isLightKick(this.playerId)) {
            this.changeState(FighterState.LIGHT_KICK);
        } else if (control.isMediumKick(this.playerId)) {
            this.changeState(FighterState.MEDIUM_KICK);
        } else if (control.isHeavyKick(this.playerId)) {
            this.changeState(FighterState.HEAVY_KICK);
        }

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.IDLE_TURN);
        }
    }

    handleWalkForwardState() {
        if (!control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        } else if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        } else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        }

        this.direction = this.getDirection();
    }

    handleWalkBackwardState() {
        if (!control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        } else if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_START);
        } else if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH_DOWN);
        }

        this.direction = this.getDirection();
    }

    handleCrunchState() {
        if (!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.CRUNCH_TURN);
        }
    }

    handleCrouchDownState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.CROUCH);
        }

        if (!control.isDown(this.playerId)) {
            this.currentState = FighterState.CROUCH_UP;
            this.animationFrame = this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame;
        }
    }

    handleCrouchUpState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpStartState() {
        if (this.isAnimationCompleted()) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARD);
            } else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARD);
            } else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleJumpLandState() {
        if (this.animationFrame < 1) return;

        let newState = FighterState.IDLE;

        if (!control.isIdle(this.playerId)) {
            this.direction = this.getDirection();

            this.handleIdleState();
        } else {
            const newDirection = this.getDirection();

            if (newDirection !== this.direction) {
                this.direction = newDirection;
                newState = FighterState.IDLE_TURN;
            } else {

                if (!this.isAnimationCompleted()) return;
            }
        }

        this.changeState(newState);
    }

    handleIdleTurnState() {
        this.handleIdleState();

        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleCrunchTurnState() {
        this.handleCrunchState();

        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.CROUCH);
    }

    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.JUMP_LAND);
        }
    }

    handleLightPunchState() {
        if (this.animationFrame < 2) return;
        if (control.isLightPunch(this.playerId)) this.animationFrame = 0;

        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleMediumPunchState() {
        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleHeavyPunchState() {
        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleLightKickState() {
        if (this.animationFrame < 2) return;
        if (control.isLightKick(this.playerId)) this.animationFrame = 0;

        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleMediumKickState() {
        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleHeavyKickState() {
        if (!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    updateStageConstraints(time, context, camera) {
        if (this.position.x > camera.position.x + context.canvas.width - this.boxes.push.width) {
            this.position.x = camera.position.x + context.canvas.width - this.boxes.push.width;
        }

        if (this.position.x < camera.position.x + this.boxes.push.width) {
            this.position.x = camera.position.x + this.boxes.push.width;
        }

        if (this.hasCollidedWithOpponent()) {
            if (this.position.x <= this.opponent.position.x) {
                this.position.x = Math.max(
                    (this.opponent.position.x + this.opponent.boxes.push.x) - (this.boxes.push.x + this.boxes.push.width),
                    this.boxes.push.width,
                );

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x += PUSH_FRICTION * time.secondsPassed;
                }
            }

            if (this.position.x >= this.opponent.position.x) {
                this.position.x = Math.min(
                    (this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width)
                    + (this.boxes.push.width + this.boxes.push.x),
                    camera.position.x + context.canvas.width - this.boxes.push.width,
                );

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x -= PUSH_FRICTION * time.secondsPassed;
                }
            }
        }
    }


    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [, frameDelay] = animation[this.animationFrame];

        if (time.previous <= this.animationTimer + frameDelay) return;
        this.animationTimer = time.previous;

        if (frameDelay <= FrameDelay.FREEZE) return;

        this.animationFrame++;
        if (this.animationFrame >= animation.length) this.animationFrame = 0;

        this.boxes = this.getBoxes(animation[this.animationFrame][0]);
    }

    update(time, context, camera) {
        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;
        this.states[this.currentState].update(time, context);
        this.updateAnimation(time);
        this.updateStageConstraints(time, context, camera);
    }

    drawDebugBox(context, camera, dimensions, baseColor) {
        if (!Array.isArray(dimensions)) return;

        const [x = 0, y = 0, width = 0, height = 0] = dimensions;

        context.beginPath();
        context.strokeStyle = baseColor + 'AA';
        context.fillStyle = baseColor + '44';
        context.fillRect(
            Math.floor(this.position.x + (x * this.direction) - camera.position.x + 0.5),
            Math.floor(this.position.y + y - camera.position.y + 0.5),
            width * this.direction,
            height,
        )
        context.rect(
            Math.floor(this.position.x + (x * this.direction) - camera.position.x + 0.5),
            Math.floor(this.position.y + y - camera.position.y + 0.5),
            width * this.direction,
            height,
        );
        context.stroke();
    }

    drawDebug(context, camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const boxes = this.getBoxes(frameKey);
        context.lineWidth = 1;

        //Push Box
        this.drawDebugBox(context, camera, Object.values(boxes.push), '#55FF55');

        //Hurt Boxes
        for (const hurtBox of boxes.hurt) {
            this.drawDebugBox(context, camera, hurtBox, '#7777FF');
        }

        //Hit Box
        this.drawDebugBox(context, camera, Object.values(boxes.hit), '#FF5555');

        //Origem
        context.beginPath();
        context.strokeStyle = "White";
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) - 4,
            Math.floor(this.position.y - camera.position.y) - 0.5
        );
        context.lineTo(
            Math.floor(this.position.x - camera.position.x) + 5,
            Math.floor(this.position.y - camera.position.y) - 0.5
        );
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) + 0.5,
            Math.floor(this.position.y - camera.position.y) - 5
        );
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) + 0.5,
            Math.floor(this.position.y - camera.position.y) + 4
        );
        context.stroke();
    }

    draw(context, camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[
            [x, y, width, height],
            [originX, originY],
        ]] = this.frames.get(frameKey);

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.direction) - originX,
            Math.floor(this.position.y - camera.position.y) - originY,
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0)

        this.drawDebug(context, camera);
    }
}