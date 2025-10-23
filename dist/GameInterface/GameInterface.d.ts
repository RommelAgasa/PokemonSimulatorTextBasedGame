import { IPokemon } from "../Interfaces/IPokemon.js";
export declare class GameInterface {
    private static rl;
    static ask(question: string): Promise<string>;
    static choosePokemons(): Promise<IPokemon[]>;
}
//# sourceMappingURL=GameInterface.d.ts.map