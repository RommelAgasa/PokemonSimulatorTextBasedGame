import type { IPlayer } from "../Interfaces/IPlayer.js";

export class Training {
    private player: IPlayer;

    constructor(player: IPlayer) {
        this.player = player;
    }

    public startTraining(): void {
        console.log("\n\n=== Pokémon Training Ground ===\n\n");
        console.log("Choosing Pokémons for training...");
    }
    
}