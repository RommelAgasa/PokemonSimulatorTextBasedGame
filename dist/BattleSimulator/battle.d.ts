import { IPlayer } from "../Interfaces/IPlayer.js";
export declare class Battle {
    private enemyPokemons;
    private enemy;
    startBattle(player: IPlayer, ask: (question: string) => Promise<string>): Promise<void>;
    private AttackTurn;
    private static displayVsMessage;
}
//# sourceMappingURL=battle.d.ts.map