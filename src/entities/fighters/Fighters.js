import { FighterDirection, FighterState } from "../../constants/fighter.js";
import { STAGE_FLOOR } from "../../constants/stage.js";
import * as control from "../../InputHandler.js";

export class Fighter{
    constructor(name, x, y, direction, playerId){
        this.name = name;
        this.playerId = playerId;
        this.position = {x, y};
        this.velocity = {x: 0, y: 0};
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;
        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        this.image = new Image();
        this.opponent;
        
        this.states = {
            [FighterState.IDLE] : {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND,
                ],
            },
            [FighterState.WALK_FORWARD] : {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_BACKWARD
                ],
            },
            [FighterState.WALK_BACKWARD] : {
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
            [FighterState.JUMP_UP] : {
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
                validFrom: [FighterState.CROUCH_DOWN],
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
        };
        
        this.changeState(FighterState.IDLE);
    }

    getDirection = () => this.position.x >= this.opponent.position.x ? FighterDirection.LEFT : FighterDirection.RIGHT;

    changeState (newState) { 
        if(newState == this.currentState || !this.states[newState].validFrom.includes(this.currentState)) return;
        
        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleIdleInit(){
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    handleMoveInit(){
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleJumpInit(){
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }

    handleCrunchDownInit(){
        this.handleIdleInit();
    }

    handleJumpStartInit(){
        this.handleIdleInit();
    }

    handleJumpLandInit(){
        this.handleIdleInit();
    }

    handleIdleState(){
        if(control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if(control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);
        if(control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.WALK_BACKWARD);
        if(control.isFoward(this.playerId, this.direction)) this.changeState(FighterState.WALK_FORWARD);
    }

    handleWalkForwardState(){
        if(!control.isFoward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if(control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);
    }

    handleWalkBackwardState(){
        if(!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if(control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);
    }

    handleCrunchState(){
        if(!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);
    }

    handleCrouchDownState(){
        if(this.animations[this.currentState][this.animationFrame][1] == -2){
            this.changeState(FighterState.CROUCH);
        }
    }

    handleCrouchUpState(){
        if(this.animations[this.currentState][this.animationFrame][1] == -2){
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpStartState(){
        if (this.animations[this.currentState][this.animationFrame][1] == -2) {
            if(control.isBackward(this.playerId, this.direction)){
                this.changeState(FighterState.JUMP_BACKWARD);
            } else if (control.isFoward(this.playerId, this.direction)){
                this.changeState(FighterState.JUMP_FORWARD);
            } else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleJumpLandState(){
        if(this.animationFrame < 1) return;

        if(!control.isIdle(this.playerId)) {
            this.handleIdleState();
        } else if (this.animations[this.currentState][this.animationFrame][1] !== -2){
            return;
        }
 
        this.changeState(FighterState.IDLE);
    }

    handleJumpState(time){
        this.velocity.y += this.gravity * time.secondsPassed;

        if(this.position.y > STAGE_FLOOR){
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.JUMP_LAND);
        }
    }

    updateStageContraints(context){
        const WIDTH = 32;

        if (this.position.x > context.canvas.width - WIDTH){
            this.position.x = context.canvas.width - WIDTH; 
        }
    
        if (this.position.x < WIDTH){
            this.position.x = WIDTH;
        }
    }

    updateAnimation(time){
        const animation = this.animations[this.currentState];
        const [, frameDelay] = animation[this.animationFrame];

        if(time.previous > this.animationTimer + frameDelay){
            this.animationTimer = time.previous;

            if(frameDelay > 0){
                this.animationFrame++;
            }
            
            if (this.animationFrame >= animation.length){
                this.animationFrame = 0;
            }
        }
    }

    update(time, context){
        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;
        if(
            [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD].includes(this.currentState)
        ){
            this.direction = this.getDirection();
        }
        this.states[this.currentState].update(time, context); 
        this.updateAnimation(time);
        this.updateStageContraints(context);      
    }

    drawDebug(context){
        context.lineWidth =1;
        context.beginPath();
        context.strokeStyle = "White";
        context.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        context.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        context.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        context.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
        context.stroke();
    }

    draw(context){
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(frameKey);

        context.scale(this.direction, 1);
        context.drawImage(
            this.image, 
            x, y, 
            width, height, 
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY, 
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0)

        this.drawDebug(context);
    }
}