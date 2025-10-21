import type { Pokemon } from "../Pokemons/Pokemon.js";
export interface IPlayer {
    attack(player: Pokemon): void;
    defend(): void;
    choosePokemonToFight(): void;
    isAllPokemonIsDead(): boolean;
}
//# sourceMappingURL=IPlayer.d.ts.map