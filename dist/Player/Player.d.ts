import type { IPokemon } from "../Interfaces/IPokemon.js";
import type { IPlayer } from "../Interfaces/IPlayer.js";
import { PokemonBag } from "../Pokemons/PokemonBag.js";
export declare class Player implements IPlayer {
    name: string;
    private bag;
    private playerPoke;
    constructor(name: string);
    catchPokemon(name: string, power: string, level: number): void;
    choosePokemonToFight(): void;
    healAllPokemons(): void;
    getBag(): PokemonBag;
    getActivePokemon(): IPokemon | null;
    attack(enemy: IPokemon): void;
    defend(): void;
    isAllPokemonIsDead(): boolean;
}
//# sourceMappingURL=Player.d.ts.map