import { Fighter } from "./Fighters.js";
import { FighterState, FrameDelay, HurtBoxIori, PushBox } from "../../constants/fighter.js";

export class Iori extends Fighter {
    constructor(playerId) {
        super("Iori", playerId);

        this.image = document.querySelector('img[alt="iori"]');

        this.frames = new Map([
            // Instacia de parado                                          
            ['idle-1', [[[95, 225, 76, 110], [31, 100]], PushBox.IDLE, HurtBoxIori.IDLE]],
            ['idle-2', [[[8, 225, 76, 110], [31, 100]], PushBox.IDLE, HurtBoxIori.IDLE]],
            ['idle-3', [[[182, 225, 76, 110], [31, 100]], PushBox.IDLE, HurtBoxIori.IDLE]],
            ['idle-4', [[[269, 225, 76, 110], [31, 100]], PushBox.IDLE, HurtBoxIori.IDLE]],

            // Mover para frente
            ['forwards-1', [[[10, 456, 59, 103], [29, 99]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-2', [[[84, 456, 51, 103], [25, 99]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-3', [[[150, 456, 46, 103], [22, 100]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-4', [[[211, 457, 41, 102], [22, 99]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-5', [[[267, 458, 48, 101], [25, 97]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-6', [[[330, 456, 49, 103], [25, 99]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-7', [[[394, 455, 41, 104], [21, 101]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-8', [[[450, 455, 50, 104], [22, 101]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-9', [[[515, 456, 64, 103], [29, 100]], PushBox.IDLE, HurtBoxIori.FORWARD]],
            ['forwards-10', [[[594, 457, 63, 102], [29, 99]], PushBox.IDLE, HurtBoxIori.FORWARD]],

            // Mover para trás
            ['backwards-1', [[[10, 586, 63, 103], [29, 99]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-2', [[[88, 585, 53, 104], [23, 101]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-3', [[[156, 584, 47, 105], [23, 101]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-4', [[[218, 583, 46, 106], [21, 101]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-5', [[[279, 583, 50, 106], [23, 102]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-6', [[[344, 583, 44, 106], [22, 102]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-7', [[[403, 584, 43, 105], [21, 102]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-8', [[[461, 585, 45, 104], [24, 101]], PushBox.IDLE, HurtBoxIori.BACKWARD]],
            ['backwards-9', [[[521, 586, 58, 103], [31, 100]], PushBox.IDLE, HurtBoxIori.BACKWARD]],

            // Pular para frente/tras
            ['jump-roll-1', [[[10, 970, 63, 88], [31, 85]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-2', [[[144, 940, 46, 118], [19, 113]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-3', [[[205, 971, 60, 87], [25, 82]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-4', [[[280, 990, 57, 68], [23, 65]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-5', [[[352, 983, 55, 75], [20, 71]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-6', [[[422, 971, 60, 87], [25, 81]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],
            ['jump-roll-7', [[[558, 970, 63, 88], [28, 85]], PushBox.JUMP, [[-3, -90, 24, 20], [-28, -70, 60, 32], [-18, -40, 40, 32]]]],

            // Pular
            ['jump-up-1', [[[10, 970, 63, 88], [30, 85]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-2', [[[88, 910, 41, 148], [14, 143]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-3', [[[144, 940, 46, 118], [17, 113]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-4', [[[205, 971, 60, 87], [25, 81]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-5', [[[280, 990, 57, 68], [23, 63]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-6', [[[352, 983, 55, 75], [30, 86]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-7', [[[422, 971, 60, 87], [27, 82]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-8', [[[497, 940, 46, 118], [19, 113]], PushBox.JUMP, HurtBoxIori.JUMP]],
            ['jump-up-9', [[[558, 970, 63, 88], [29, 83]], PushBox.JUMP, HurtBoxIori.JUMP]],

            // Pulo primeiro/ultimo frame
            ['jump-land', [[[10, 970, 63, 88], [29, 83]], PushBox.IDLE, HurtBoxIori.IDLE]],

            // Agachar
            ['crouch-1', [[[10, 343, 63, 97], [30, 94]], PushBox.IDLE, HurtBoxIori.IDLE]],
            ['crouch-2', [[[88, 373, 64, 67], [31, 64]], PushBox.BEND, HurtBoxIori.BEND]],
            ['crouch-3', [[[167, 380, 65, 60], [30, 57]], PushBox.CRUNCH, HurtBoxIori.CROUCH]],

            // Virar em pé
            ['idle-turn-1', [[[519, 8226, 61, 103], [28, 99]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
            ['idle-turn-2', [[[595, 8226, 61, 103], [32, 98]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],

            // Virar agachado
            ['crouch-turn-1', [[[412, 8350, 63, 62], [31, 58]], PushBox.CRUNCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
            ['crouch-turn-2', [[[490, 8350, 63, 62], [32, 57]], PushBox.CRUNCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],

            // Soco Fraco
            ['light-punch-1', [[[10, 1305, 63, 98], [32, 92]], PushBox.IDLE, [[5, -90, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['light-punch-2', [[[88, 1307, 65, 96], [35, 90]], PushBox.IDLE, [[5, -90, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['light-punch-3', [[[168, 1309, 93, 94], [32, 86]], PushBox.IDLE, [[5, -90, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]], [25, -68, 35, 18]]],
            ['light-punch-4', [[[276, 1309, 91, 94], [32, 86]], PushBox.IDLE, [[5, -90, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]], [25, -68, 35, 18]]],
            ['light-punch-5', [[[382, 1307, 65, 96], [34, 89]], PushBox.IDLE, [[5, -90, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],

            // Soco medio/forte
            ['med-punch-1', [[[10, 1418, 67, 110], [33, 106]], PushBox.IDLE, [[10, -81, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-2', [[[94, 1425, 79, 103], [44, 98]], PushBox.IDLE, [[10, -80, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-3', [[[188, 1444, 103, 84], [38, 79]], PushBox.IDLE, [[10, -76, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-4', [[[306, 1441, 109, 87], [36, 84]], PushBox.IDLE, [[15, -75, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]], [40, -78, 35, 38]]],
            ['med-punch-5', [[[430, 1438, 76, 90], [36, 86]], PushBox.IDLE, [[15, -74, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-6', [[[521, 1422, 66, 106], [37, 102]], PushBox.IDLE, [[15, -73, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-7', [[[602, 1426, 65, 102], [35, 98]], PushBox.IDLE, [[10, -69, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-8', [[[682, 1428, 64, 100], [34, 96]], PushBox.IDLE, [[10, -68, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],
            ['med-punch-9', [[[761, 1426, 62, 102], [31, 97]], PushBox.IDLE, [[10, -67, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]]]],

            // Soco forte
            ['heavy-punch-1', [[[306, 1441, 109, 87], [36, 84]], PushBox.IDLE, [[15, -75, 24, 18], [-14, -80, 40, 50], [-20, -31, 50, 32]], [40, -78, 35, 38]]],

            // Chute leve/medio
            ['light-kick-1', [[[497, 1301, 60, 102], [30, 97]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]]]],
            ['light-kick-2', [[[572, 1304, 55, 99], [28, 93]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]]]],
            ['light-kick-3', [[[642, 1306, 89, 97], [23, 91]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]], [20, -62, 45, 24]]],
            ['light-kick-4', [[[746, 1304, 89, 99], [23, 91]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]]]],
            ['light-kick-5', [[[850, 1304, 55, 99], [28, 93]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]]]],
            ['light-kick-6', [[[920, 1301, 60, 102], [33, 96]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]]]],

            // Chute medio
            ['med-kick-1', [[[642, 1306, 89, 97], [23, 91]], PushBox.IDLE, [[-10, -93, 19, 18], [-21, -79, 42, 38], [-20, -40, 44, 47]], [20, -62, 45, 24]]],

            // Chute forte
            ['heavy-kick-1', [[[10, 1549, 61, 99], [31, 94]], PushBox.IDLE, [[-35, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-2', [[[86, 1549, 75, 99], [48, 94]], PushBox.IDLE, [[-34, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-3', [[[176, 1543, 74, 105], [33, 98]], PushBox.IDLE, [[-34, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-4', [[[265, 1545, 100, 103], [34, 97]], PushBox.IDLE, [[15, -76, 55, 30], [-25, -90, 42, 42], [-20, -46, 42, 50]], [15, -76, 55, 24]]],
            ['heavy-kick-5', [[[380, 1549, 104, 99], [34, 93]], PushBox.IDLE, [[15, -76, 55, 30], [-25, -90, 42, 42], [-20, -46, 42, 50]], [15, -74, 55, 24]]],
            ['heavy-kick-6', [[[499, 1547, 104, 101], [34, 95]], PushBox.IDLE, [[15, -76, 55, 30], [-25, -90, 42, 42], [-20, -46, 42, 50]], [15, -72, 55, 24]]],
            ['heavy-kick-7', [[[618, 1543, 72, 105], [34, 98]], PushBox.IDLE, [[-26, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-8', [[[705, 1545, 51, 103], [26, 96]], PushBox.IDLE, [[-25, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-9', [[[771, 1547, 46, 101], [22, 93]], PushBox.IDLE, [[-24, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
            ['heavy-kick-10', [[[832, 1545, 63, 103], [26, 96]], PushBox.IDLE, [[-23, -95, 20, 20], [-25, -90, 42, 42], [-20, -46, 42, 50]]]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 4], ['idle-2', 4], ['idle-3', 4],
                ['idle-4', 4], ['idle-3', 4], ['idle-2', 4],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 3], ['forwards-2', 6], ['forwards-3', 4],
                ['forwards-4', 4], ['forwards-5', 4], ['forwards-6', 6],
                ['forwards-7', 3], ['forwards-8', 6], ['forwards-9', 4],
                ['forwards-10', 4],
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 3], ['backwards-2', 6], ['backwards-3', 4],
                ['backwards-4', 4], ['backwards-5', 4], ['backwards-6', 6],
                ['backwards-7', 3], ['backwards-8', 6], ['backwards-9', 4],
            ],
            [FighterState.JUMP_START]: [
                ['jump-land', 3], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 8], ['jump-up-2', 8], ['jump-up-3', 8],
                ['jump-up-4', 8], ['jump-up-5', 8], ['jump-up-6', 8],
                ['jump-up-7', 8], ['jump-up-8', 8], ['jump-up-9', FrameDelay.FREEZE],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 13], ['jump-roll-2', 5], ['jump-roll-3', 3],
                ['jump-roll-4', 3], ['jump-roll-5', 3], ['jump-roll-6', 3],
                ['jump-roll-7', 5], ['jump-roll-7', FrameDelay.FREEZE],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-7', 16], ['jump-roll-6', 3], ['jump-roll-5', 3],
                ['jump-roll-4', 3], ['jump-roll-3', 3], ['jump-roll-2', 3],
                ['jump-roll-1', FrameDelay.FREEZE],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 2], ['jump-land', 5], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH]: [['crouch-3', FrameDelay.FREEZE]],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 2], ['crouch-2', 2], ['crouch-3', 2], ['crouch-3', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH_UP]: [
                ['crouch-3', 2], ['crouch-2', 2], ['crouch-1', 2], ['crouch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.IDLE_TURN]: [
                ['idle-turn-2', 2], ['idle-turn-1', 2], ['idle-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.CRUNCH_TURN]: [
                ['crouch-turn-2', 2], ['crouch-turn-1', 2], ['crouch-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 2], ['light-punch-2', 2], ['light-punch-3', 4],
                ['light-punch-4', 4], ['light-punch-5', 4], ['light-punch-5', FrameDelay.TRANSITION],
            ],
            [FighterState.MEDIUM_PUNCH]: [
                ['med-punch-1', 1], ['med-punch-2', 2], ['med-punch-3', 2],
                ['med-punch-4', 4], ['med-punch-5', 4], ['med-punch-6', 4],
                ['med-punch-7', 3], ['med-punch-8', 3], ['med-punch-9', 3],
                ['med-punch-9', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['med-punch-1', 3], ['med-punch-2', 2], ['med-punch-3', 2],
                ['med-punch-4', 2], ['heavy-punch-1', 6], ['med-punch-6', 10],
                ['med-punch-7', 10], ['med-punch-8', 12], ['med-punch-8', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_KICK]: [
                ['light-punch-1', 3], ['light-kick-1', 3], ['light-kick-2', 3],
                ['light-kick-3', 8], ['light-kick-4', 8], ['light-kick-5', 4],
                ['light-kick-6', 4], ['light-punch-1', 1], ['light-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MEDIUM_KICK]: [
                ['light-punch-1', 8], ['light-kick-1', 6], ['med-kick-1', 12],
                ['light-kick-1', 7], ['light-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_KICK]: [
                ['heavy-kick-1', 2], ['heavy-kick-2', 4], ['heavy-kick-3', 4],
                ['heavy-kick-4', 4], ['heavy-kick-5', 4], ['heavy-kick-6', 4],
                ['heavy-kick-7', 8], ['heavy-kick-8', 8], ['heavy-kick-9', 10],
                ['heavy-kick-10', 7], ['heavy-kick-10', FrameDelay.TRANSITION],
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
