# Game

Jogo baseado em JavaScript

fontes:

https://street-fighter-sprites.fandom.com/wiki/Street_Fighter_II:_The_World_Warrior#Ryu


versionamento:

MAJOR (versão principal): muda quando você faz mudanças grandes ou incompatíveis, tipo reescrever parte do jogo ou trocar o motor de renderização.

MINOR (versão menor): muda quando você adiciona funcionalidades novas, mas mantendo compatibilidade.

PATCH: muda quando você corrige bugs ou ajusta pequenos detalhes.

    npm version patch     # +0.0.1
    npm version minor     # +0.1.0
    npm version major     # +1.0.0


ideias:

        // this.previousState = this.state; Inicializa o estado anterior com o estado atual

        // Verifica se o estado mudou e reseta o frame de animação
        // if (this.previousState !== this.state) {
        //     this.animationFrame = 0;
        //     this.previousState = this.state;
        // }

        // if(time.previous > this.animationTimer + 60){
        //     this.animationTimer = time.previous;
        //     this.animationFrame++;
            
        //     // Reseta o frame de animação ao atingir o limite
        //     if (this.animationFrame >= this.animations[this.state].length) {
        //         this.animationFrame = 0;
        //     }
        // }

//20:30 https://www.youtube.com/watch?v=c2un9AyHvTs&list=PLf9yt-2olqyLxr-vouWl-qk4toUfjF2LC&index=5