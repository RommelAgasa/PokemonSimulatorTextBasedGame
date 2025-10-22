import { IPlayer } from "../Interfaces/IPlayer.js";
import { Pokemon } from "../Pokemons/Pokemon.js";
export declare class Battle {
    private player;
    private enemy;
    constructor(player: IPlayer);
    static makeEnemy(): IPlayer;
    setup(playerPokemons: Pokemon[], enemyPokemons: Pokemon[], playerName: string, enemyName: string): void;
    startBattle(ask: (q: string) => Promise<string>): Promise<void>;
    private processTurn;
    private handleAttack;
    private handleDefend;
    private handleFaint;
    private displayWinner;
    private displayVsMessage;
}
//# sourceMappingURL=battle.d.ts.map