import Player from "../Player/Player.js";
export declare class Battle {
    private enemyPokemons;
    private enemy;
    startBattle(player: Player, ask: (question: string) => Promise<string>): Promise<void>;
    private AttackTurn;
    private static displayVsMessage;
}
//# sourceMappingURL=battle.d.ts.map