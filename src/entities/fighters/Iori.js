import { FighterState } from "../../constants/fighter.js";  
import { Fighter } from "./Fighters.js";

export class Iori extends Fighter {
    constructor(x, y, velocity) {
        super("Iori", x, y, velocity);

        this.image = document.querySelector('img[alt="iori"]');

        this.frames = new Map([
            // Instacia de parado
            ['idle-1', [[95, 225, 76, 110], [31, 100]]],
            ['idle-2', [[8, 225, 76, 110], [31, 100]]],
            ['idle-3', [[182, 225, 76, 110], [31, 100]]],
            ['idle-4', [[269, 225, 76, 110], [31, 100]]],

            // Mover para frente
            ['forwards-1', [[10, 456, 59, 103], [30, 100]]],
            ['forwards-2', [[150, 456, 46, 103], [15, 101]]],
            ['forwards-3', [[268, 458, 47, 101], [25, 98]]],
            ['forwards-4', [[394, 455, 41, 104], [20, 100]]],
            ['forwards-5', [[515, 456, 64, 103], [29, 100]]],
            ['forwards-6', [[594, 457, 63, 102], [29, 99]]],

            // Mover para trás
            ['backwards-1', [[4, 585, 74, 106], [28, 103]]],
            ['backwards-2', [[143, 581, 70, 109], [30, 106]]],
            ['backwards-3', [[209, 578, 59, 114], [27, 109]]],
            ['backwards-4', [[338, 578, 55, 115], [27, 109]]],
            ['backwards-5', [[452, 577, 66, 118], [28, 110]]],
            ['backwards-6', [[513, 580, 75, 111], [33, 105]]],

            // Pular
            ['jump-up-1', [[88, 910, 41, 148], [15, 144]]],
            ['jump-up-2', [[144, 940, 46, 118], [17, 113]]],
            ['jump-up-3', [[205, 971, 60, 87], [25, 84]]],
            ['jump-up-4', [[280, 990, 57, 68], [23, 66]]],
            ['jump-up-5', [[497, 940, 46, 118], [16, 113]]],
            ['jump-up-6', [[558, 970, 63, 88], [30, 86]]],
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
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1],
            ],
        };

        this.initialVelocity = {
            jump: -420,
        };

        this.gravity = 1000;
    }
}
