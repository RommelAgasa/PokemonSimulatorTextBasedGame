import { IPokemon } from "./IPokemon.js";
export interface IPlayer {
    name: string;
    attack(player: IPokemon): void;
    defend(): void;
    choosePokemonToFight(): void;
    isAllPokemonIsDead(): boolean;
    getActivePokemon(): IPokemon | null;
    getBag(): import("../Pokemons/PokemonBag.js").PokemonBag;
}
//# sourceMappingURL=IPlayer.d.ts.map