import { IPokemon } from "./IPokemon.js";

export interface IPlayer {
    name: string;
    attack(player: IPokemon): void;
    defend(): void;
    choosePokemonToFight(): void;
    isAllPokemonIsDead(): boolean;
    getActivePokemon(): IPokemon | null;
    getBag() : import("../Pokemon/PokemonBag.js").PokemonBag;
}