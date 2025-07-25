export class StatusBar{
    constructor(fighters){
        this.image = document.querySelector('img[alt="misc"]');
        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters;
        this.frame = new map([
            ['health-bar', [16, 18, 145, 11]],
            ['ko-white', [161, 16, 32, 14]],
            ['time-0', [16, 32, 14, 16]],
            ['time-1', [32, 32, 14, 16]],
            ['time-2', [48, 32, 14, 16]],
            ['time-3', [64, 32, 14, 16]],
            ['time-4', [80, 32, 14, 16]],
            ['time-5', [96, 32, 14, 16]],
            ['time-6', [112, 32, 14, 16]],
            ['time-7', [128, 32, 14, 16]],
            ['time-8', [144, 32, 14, 16]],
            ['time-9', [160, 32, 14, 16]],

            ['tag-ken', [128, 56, 30, 9]],
            ['tag-ryu', [16, 56, 28, 9]],

        ]);
    }

    update(time){

    }

    draw(context){
        
    }
}