import { IPlayer } from "../Interfaces/IPlayer.js";
export declare class Battle {
    private player;
    private enemy;
    constructor(player: IPlayer);
    static makeEnemy(): IPlayer;
    startBattle(ask: (q: string) => Promise<string>): Promise<void>;
    private processTurn;
    private handleAttack;
    private handleDefend;
    private handleFaint;
    private displayWinner;
    private displayVsMessage;
}
//# sourceMappingURL=battle.d.ts.map