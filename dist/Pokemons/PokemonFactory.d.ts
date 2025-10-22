import { IPokemon } from "../Interfaces/IPokemon.js";
export declare class PokemonFactory {
    private static pokemons;
    private static getKey;
    static registerPokemon(pokemon: IPokemon): void;
    static spawnPokemon(name: string, power?: string, level?: number): IPokemon | null;
    static createPokemon(name: string, power: string, level: number): IPokemon;
    static restoreAllPokemons(): void;
}
//# sourceMappingURL=PokemonFactory.d.ts.map