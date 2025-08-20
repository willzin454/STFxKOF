import { Fighter } from "./Fighters.js";
import { FighterState, FrameDelay, HurtBoxRyu, PushBoxRyu } from "../../constants/fighter.js";

export class Ryu extends Fighter {
    constructor(playerId) {
        super("Ryu", playerId);

        this.image = document.querySelector('img[alt="ryu"]');

        this.frames = new Map([
            // Instacia de parado
            ['idle-1', [[[75, 14, 60, 89], [34, 86]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['idle-2', [[[7, 14, 59, 90], [33, 87]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['idle-3', [[[277, 11, 58, 92], [32, 89]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['idle-4', [[[211, 10, 55, 93], [31, 90]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],

            // Mover para frente
            ['forwards-1', [[[4, 134, 64, 90], [27, 81]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],
            ['forwards-2', [[[72, 127, 73, 96], [35, 86]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],
            ['forwards-3', [[[152, 128, 64, 92], [35, 89]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],
            ['forwards-4', [[[229, 130, 63, 90], [29, 89]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],
            ['forwards-5', [[[307, 128, 54, 91], [25, 89]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],
            ['forwards-6', [[[371, 128, 50, 89], [25, 86]], PushBoxRyu.IDLE, HurtBoxRyu.FORWARD]],

            // Mover para trás
            ['backwards-1', [[[777, 128, 61, 87], [35, 85]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],
            ['backwards-2', [[[430, 124, 59, 90], [36, 87]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],
            ['backwards-3', [[[495, 124, 57, 90], [36, 88]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],
            ['backwards-4', [[[559, 124, 58, 90], [38, 89]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],
            ['backwards-5', [[[631, 125, 58, 91], [36, 88]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],
            ['backwards-6', [[[707, 126, 57, 89], [36, 87]], PushBoxRyu.IDLE, HurtBoxRyu.BACKWARD]],

            // Pular para frente/tras
            ['jump-roll-1', [[[442, 261, 61, 78], [22, 90]], PushBoxRyu.JUMP, [[17, -90, 24, 16], [-15, -90, 40, 42], [-18, -60, 40, 32]]]],
            ['jump-roll-2', [[[507, 259, 104, 42], [61, 76]], PushBoxRyu.JUMP, [[17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]]]],
            ['jump-roll-3', [[[617, 240, 53, 82], [42, 111]], PushBoxRyu.JUMP, [[22, -51, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]]]],
            ['jump-roll-4', [[[676, 257, 122, 44], [71, 81]], PushBoxRyu.JUMP, [[-39, -46, 24, 16], [-30, -88, 40, 42], [-34, -118, 44, 48]]]],
            ['jump-roll-5', [[[804, 258, 71, 87], [53, 98]], PushBoxRyu.JUMP, [[-72, -56, 24, 16], [-54, -77, 52, 40], [-14, -82, 48, 34]]]],
            ['jump-roll-6', [[[883, 261, 54, 109], [31, 113]], PushBoxRyu.JUMP, [[-23, -100, 24, 16], [-28, -87, 44, 38], [-22, -47, 38, 18]]]],
            
            // Pular
            ['jump-up-1', [[[67, 244, 56, 104], [32, 107]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            ['jump-up-2', [[[138, 233, 50, 89], [25, 103]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            ['jump-up-3', [[[197, 233, 54, 77], [25, 103]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            ['jump-up-4', [[[259, 240, 48, 70], [28, 101]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            ['jump-up-5', [[[319, 234, 48, 89], [25, 106]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            ['jump-up-6', [[[375, 244, 55, 109], [31, 113]], PushBoxRyu.JUMP, HurtBoxRyu.JUMP]],
            
            // Pulo primeiro/ultimo frame
            ['jump-land', [[[7, 268, 55, 85], [29, 83]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],

            // Agachar
            ['crouch-1', [[[551, 21, 53, 83], [27, 81]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['crouch-2', [[[611, 36, 57, 69], [25, 66]], PushBoxRyu.BEND, HurtBoxRyu.BEND]],
            ['crouch-3', [[[679, 44, 61, 61], [25, 58]], PushBoxRyu.CRUNCH, HurtBoxRyu.CROUCH]],

            // Virar em pé
            ['idle-turn-1', [[[348, 8, 54, 95], [29, 92]], PushBoxRyu.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
            ['idle-turn-2', [[[414, 6, 58, 97], [30, 94]], PushBoxRyu.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
            ['idle-turn-3', [[[486, 10, 54, 94], [27, 90]], PushBoxRyu.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],

            // Virar agachado
            ['crouch-turn-1', [[[751, 46, 53, 61], [26, 58]], PushBoxRyu.CRUNCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
            ['crouch-turn-2', [[[816, 46, 52, 61], [27, 58]], PushBoxRyu.CRUNCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
            ['crouch-turn-3', [[[878, 46, 53, 61], [29, 58]], PushBoxRyu.CRUNCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],

            // Soco leve
            ['light-punch-1', [[[9, 365, 64, 91], [32, 88]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['light-punch-2', [[[98, 365, 92, 91], [32, 88]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],

            // Soco medio/forte
            ['med-punch-1', [[[6, 466, 60, 94], [29, 92]], PushBoxRyu.IDLE, HurtBoxRyu.IDLE]],
            ['med-punch-2', [[[86, 465, 74, 95], [29, 92]], PushBoxRyu.IDLE, HurtBoxRyu.PUNCH]],
            ['med-punch-3', [[[175, 465, 108, 94], [24, 92]], PushBoxRyu.IDLE, HurtBoxRyu.PUNCH]],

            // Soco forte
            ['heavy-punch-1', [[[175, 465, 108, 94], [24, 92]], PushBoxRyu.IDLE, HurtBoxRyu.PUNCH]],

            // Chute leve/medio
            ['light-kick-1', [[[87, 923, 66, 92], [46, 93]], PushBoxRyu.IDLE, [[-33, -96, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]]]],
            ['light-kick-2', [[[162, 922, 114, 94], [68, 95]], PushBoxRyu.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]]]],

            // Chute medio
            ['med-kick-1', [[[162, 922, 114, 94], [68, 95]], PushBoxRyu.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]]]],

            // Chute forte
            ['heavy-kick-1', [[[5, 1196, 61, 90], [37, 87]], PushBoxRyu.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
            ['heavy-kick-2', [[[72, 1192, 94, 94], [44, 91]], PushBoxRyu.IDLE, [[12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
            ['heavy-kick-3', [[[176, 1191, 120, 94], [42, 91]], PushBoxRyu.IDLE, [[13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
            ['heavy-kick-4', [[[306, 1208, 101, 77], [39, 74]], PushBoxRyu.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
            ['heavy-kick-5', [[[418, 1204, 64, 81], [38, 78]], PushBoxRyu.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 68], ['idle-2', 68], ['idle-3', 68],
                ['idle-4', 68], ['idle-3', 68], ['idle-2', 68],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65],
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65],
            ],
            [FighterState.JUMP_START]: [
                ['jump-land', 50], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 50], ['jump-roll-3', 50],
                ['jump-roll-4', 50], ['jump-roll-5', 50], ['jump-roll-6', FrameDelay.FREEZE],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-6', 200], ['jump-roll-5', 50], ['jump-roll-4', 50],
                ['jump-roll-3', 50], ['jump-roll-2', 50], ['jump-roll-1', FrameDelay.FREEZE],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 33], ['jump-land', 117], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH]: [['crouch-3', FrameDelay.FREEZE]],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH_UP]: [
                ['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.IDLE_TURN]: [
                ['idle-turn-3', 33], ['idle-turn-2', 33], ['idle-turn-1', 33], ['idle-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.CRUNCH_TURN]: [
                ['crouch-turn-3', 33], ['crouch-turn-2', 33], ['crouch-turn-1', 33], ['crouch-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 33], ['light-punch-2', 66], ['light-punch-1', 66], ['light-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MEDIUM_PUNCH]: [
                ['med-punch-1', 16], ['med-punch-2', 33], ['med-punch-3', 66],
                ['med-punch-2', 50], ['med-punch-1', 50], ['med-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['med-punch-1', 50], ['med-punch-2', 33], ['heavy-punch-1', 100],
                ['med-punch-2', 166], ['med-punch-1', 199], ['med-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_KICK]: [
                ['med-punch-1', 50], ['light-kick-1', 50], ['light-kick-2', 133],
                ['light-kick-1', 66], ['med-punch-1', 16], ['med-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MEDIUM_KICK]: [
                ['med-punch-1', 83], ['light-kick-1', 100], ['med-kick-1', 199],
                ['light-kick-1', 116], ['light-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_KICK]: [
                ['heavy-kick-1', 33], ['heavy-kick-2', 66], ['heavy-kick-3', 133],
                ['heavy-kick-4', 166], ['heavy-kick-5', 116], ['heavy-kick-5', FrameDelay.TRANSITION],
            ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD]: 3 * 60,
                [FighterState.WALK_BACKWARD]: -(2 * 60),
                [FighterState.JUMP_FORWARD]: ((48 * 3) + (12 * 2)),
                [FighterState.JUMP_BACKWARD]: -((45 * 4) + (15 * 3)),
            },
            jump: -420,
        };

        this.gravity = 1000;
    }
}
