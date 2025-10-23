import { IPokemon } from "../Interfaces/IPokemon.js";
export declare class PokemonBag {
    private pokemons;
    registerPokemon(name: string, power: string, level: number): void;
    getAllPokemons(): IPokemon[];
    private getKey;
    spawnPokemon(name: string, power?: string, level?: number): IPokemon | null;
    allPokemonDead(): boolean;
    restoreAllPokemons(): void;
}
//# sourceMappingURL=PokemonBag.d.ts.map