import { Fighter } from "./Fighters.js";
import { FighterState, FrameDelay, PushBoxIori } from "../../constants/fighter.js";  

export class Iori extends Fighter {
    constructor(playerId) {
        super("Iori", playerId);

        this.image = document.querySelector('img[alt="iori"]');

        this.frames = new Map([
            // Instacia de parado
            ['idle-1', [[[95, 225, 76, 110], [31, 100]], PushBoxIori.IDLE]],
            ['idle-2', [[[8, 225, 76, 110], [31, 100]], PushBoxIori.IDLE]],
            ['idle-3', [[[182, 225, 76, 110], [31, 100]], PushBoxIori.IDLE]],
            ['idle-4', [[[269, 225, 76, 110], [31, 100]], PushBoxIori.IDLE]],

            // Mover para frente
            ['forwards-1', [[[10, 456, 59, 103], [29, 99]], PushBoxIori.IDLE]],
            ['forwards-2', [[[84, 456, 51, 103], [25, 99]], PushBoxIori.IDLE]],
            ['forwards-3', [[[150, 456, 46, 103], [22, 100]], PushBoxIori.IDLE]],
            ['forwards-4', [[[211, 457, 41, 102], [22, 99]], PushBoxIori.IDLE]],
            ['forwards-5', [[[267, 458, 48, 101], [25, 97]], PushBoxIori.IDLE]],
            ['forwards-6', [[[330, 456, 49, 103], [25, 99]], PushBoxIori.IDLE]],
            ['forwards-7', [[[394, 455, 41, 104], [21, 101]], PushBoxIori.IDLE]],
            ['forwards-8', [[[450, 455, 50, 104], [22, 101]], PushBoxIori.IDLE]],
            ['forwards-9', [[[515, 456, 64, 103], [29, 100]], PushBoxIori.IDLE]],
            ['forwards-10', [[[594, 457, 63, 102], [29, 99]], PushBoxIori.IDLE]],

            // Mover para trás
            ['backwards-1', [[[10, 586, 63, 103], [29, 99]], PushBoxIori.IDLE]],
            ['backwards-2', [[[88, 585, 53, 104], [23, 101]], PushBoxIori.IDLE]],
            ['backwards-3', [[[156, 584, 47, 105], [23, 101]], PushBoxIori.IDLE]],
            ['backwards-4', [[[218, 583, 46, 106], [21, 101]], PushBoxIori.IDLE]],
            ['backwards-5', [[[279, 583, 50, 106], [23, 102]], PushBoxIori.IDLE]],
            ['backwards-6', [[[344, 583, 44, 106], [22, 102]], PushBoxIori.IDLE]],
            ['backwards-7', [[[403, 584, 43, 105], [21, 102]], PushBoxIori.IDLE]],
            ['backwards-8', [[[461, 585, 45, 104], [24, 101]], PushBoxIori.IDLE]],
            ['backwards-9', [[[521, 586, 58, 103], [31, 100]], PushBoxIori.IDLE]],

            // Pular
            ['jump-up-1', [[[10, 970, 63, 88], [30, 85]], PushBoxIori.JUMP]],
            ['jump-up-2', [[[88, 910, 41, 148], [14, 143]], PushBoxIori.JUMP]],
            ['jump-up-3', [[[144, 940, 46, 118], [17, 113]], PushBoxIori.JUMP]],
            ['jump-up-4', [[[205, 971, 60, 87], [25, 81]], PushBoxIori.JUMP]],
            ['jump-up-5', [[[280, 990, 57, 68], [23, 63]], PushBoxIori.JUMP]],
            ['jump-up-6', [[[352, 983, 55, 75], [30, 86]], PushBoxIori.JUMP]],
            ['jump-up-7', [[[422, 971, 60, 87], [27, 82]], PushBoxIori.JUMP]],
            ['jump-up-8', [[[497, 940, 46, 118], [19, 113]], PushBoxIori.JUMP]],
            ['jump-up-9', [[[558, 970, 63, 88], [29, 83]], PushBoxIori.JUMP]],

            // Pulo primeiro/ultimo frame
            ['jump-land', [[[10, 970, 63, 88], [29, 83]], PushBoxIori.IDLE]],

            // Pular para frente/tras
            ['jump-roll-1', [[[10, 970, 63, 88], [31, 85]], PushBoxIori.JUMP]],
            ['jump-roll-2', [[[88, 910, 41, 148], [17, 143]], PushBoxIori.JUMP]],
            ['jump-roll-3', [[[144, 940, 46, 118], [19, 113]], PushBoxIori.JUMP]],
            ['jump-roll-4', [[[205, 971, 60, 87], [25, 82]], PushBoxIori.JUMP]],
            ['jump-roll-5', [[[280, 990, 57, 68], [23, 65]], PushBoxIori.JUMP]],
            ['jump-roll-6', [[[352, 983, 55, 75], [20, 71]], PushBoxIori.JUMP]],
            ['jump-roll-7', [[[422, 971, 60, 87], [25, 81]], PushBoxIori.JUMP]],
            ['jump-roll-8', [[[497, 940, 46, 118], [17, 113]], PushBoxIori.JUMP]],
            ['jump-roll-9', [[[558, 970, 63, 88], [28, 85]], PushBoxIori.JUMP]],

            // Agachar
            ['crouch-1', [[[10, 343, 63, 97], [30, 94]], PushBoxIori.IDLE]],
            ['crouch-2', [[[88, 373, 64, 67], [31, 64]], PushBoxIori.BEND]],
            ['crouch-3', [[[167, 380, 65, 60], [30, 57]], PushBoxIori.CRUNCH]],

            // Virar em pé
            ['idle-turn-1', [[[519, 8226, 61, 103], [28, 99]], PushBoxIori.IDLE]],
            ['idle-turn-2', [[[595, 8226, 61, 103], [32, 98]], PushBoxIori.IDLE]],

            // Virar agachado
            ['crouch-turn-1', [[[412, 8350, 63, 62], [31, 58]], PushBoxIori.CRUNCH]],
            ['crouch-turn-2', [[[490, 8350, 63, 62], [32, 57]], PushBoxIori.CRUNCH]],

            // Soco leve
            ['light-punch-1', [[[10, 1418, 67, 110], [33, 106]], PushBoxIori.IDLE]],
            ['light-punch-2', [[[94, 1425, 79, 103], [44, 98]], PushBoxIori.IDLE]],
            ['light-punch-3', [[[188, 1444, 103, 84], [38, 79]], PushBoxIori.IDLE]],
            ['light-punch-4', [[[306, 1441, 109, 87], [36, 84]], PushBoxIori.IDLE]],
            ['light-punch-5', [[[430, 1438, 76, 90], [36, 86]], PushBoxIori.IDLE]],
            ['light-punch-6', [[[521, 1422, 66, 106], [37, 102]], PushBoxIori.IDLE]],
            ['light-punch-7', [[[602, 1426, 65, 102], [35, 98]], PushBoxIori.IDLE]],
            ['light-punch-8', [[[682, 1428, 64, 100], [34, 96]], PushBoxIori.IDLE]],
            ['light-punch-9', [[[761, 1426, 62, 102], [31, 97]], PushBoxIori.IDLE]],

            // Soco medio/forte
            ['med-punch-1', [[[10, 1818, 64, 96], [30, 91]], PushBoxIori.IDLE]],
            ['med-punch-2', [[[89, 1817, 74, 97], [32, 93]], PushBoxIori.IDLE]],
            ['med-punch-3', [[[178, 1809, 74, 105], [32, 101]], PushBoxIori.IDLE]],
            ['med-punch-4', [[[267, 1808, 75, 106], [33, 102]], PushBoxIori.IDLE]],
            ['med-punch-5', [[[357, 1781, 63, 133], [33, 128]], PushBoxIori.IDLE]],
            ['med-punch-6', [[[435, 1798, 61, 116], [32, 111]], PushBoxIori.IDLE]],
            ['med-punch-7', [[[511, 1813, 60, 101], [32, 97]], PushBoxIori.IDLE]],
            ['med-punch-8', [[[586, 1812, 63, 102], [31, 98]], PushBoxIori.IDLE]],

            // Soco forte
            ['heavy-punch-1', [[[357, 1781, 63, 133], [33, 128]], PushBoxIori.IDLE]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 68], ['idle-2', 68], ['idle-3', 68],
                ['idle-4', 68], ['idle-3', 68], ['idle-2', 68],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65],
                ['forwards-7', 65], ['forwards-8', 65], ['forwards-9', 65],
                ['forwards-10', 65],
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65],
                ['backwards-7', 65], ['backwards-8', 65], ['backwards-9', 65],
            ],
            [FighterState.JUMP_START]: [
                ['jump-land', 50], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', 100],
                ['jump-up-7', 100], ['jump-up-8', 100], ['jump-up-9', -1],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 50], ['jump-roll-3', 50],
                ['jump-roll-4', 50], ['jump-roll-5', 50], ['jump-roll-6', 50],
                ['jump-roll-7', 50], ['jump-roll-8', 50], ['jump-roll-9', FrameDelay.FrameDelay],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-9', 200], ['jump-roll-8', 50],['jump-roll-7', 50], 
                ['jump-roll-6', 50], ['jump-roll-5', 50],['jump-roll-4', 50], 
                ['jump-roll-3', 50], ['jump-roll-2', 50],['jump-roll-1', FrameDelay.FrameDelay],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 33], ['jump-land', 117], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH]: [['crouch-3', FrameDelay.FrameDelay]],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH_UP]:[
                ['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.IDLE_TURN]: [
                ['idle-turn-2', 33], ['idle-turn-1', 33], ['idle-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.CRUNCH_TURN]: [
                ['crouch-turn-2', 33], ['crouch-turn-1', 33], ['crouch-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 33], ['light-punch-2', 66], ['light-punch-3', 66], 
                ['light-punch-4', 66], ['light-punch-5', 66], ['light-punch-6', 66],
                ['light-punch-7', 66], ['light-punch-8', 66], ['light-punch-9', FrameDelay.TRANSITION],
            ],
            [FighterState.MEDIUM_PUNCH]: [
                ['med-punch-1', 16], ['med-punch-2', 33], ['med-punch-3', 33],
                ['med-punch-4', 33], ['med-punch-5', 100], ['med-punch-6', 80], 
                ['med-punch-7', 80], ['med-punch-8', FrameDelay.TRANSITION], 
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['med-punch-1', 50], ['med-punch-2', 33], ['med-punch-3', 33],
                ['med-punch-4', 33], ['heavy-punch-1', 100], ['med-punch-6', 166],
                ['med-punch-7', 199], ['med-punch-8', FrameDelay.TRANSITION], 
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
