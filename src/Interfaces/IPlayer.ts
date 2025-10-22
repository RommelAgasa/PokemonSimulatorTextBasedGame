import type { Pokemon } from "../Pokemons/Pokemon.js";

export interface IPlayer {
    name: string;
    attack(player: Pokemon): void;
    defend(): void;
    choosePokemonToFight(): void;
    isAllPokemonIsDead(): boolean;
    getActivePokemon(): Pokemon | undefined;
}