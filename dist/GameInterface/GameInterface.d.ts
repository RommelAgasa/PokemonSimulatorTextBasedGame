import { Pokemon } from "../Pokemons/Pokemon.js";
export declare class GameInterface {
    private static rl;
    static ask(question: string): Promise<string>;
    static choosePokemons(): Promise<Pokemon[]>;
}
//# sourceMappingURL=GameInterface.d.ts.map