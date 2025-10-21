import type { IPlayer } from '../Interfaces/IPlayer.js';
import { Pokemon } from '../Pokemons/Pokemon.js';
export default class Player implements IPlayer {
    name: string;
    private pokemons;
    private activePokemon?;
    constructor(IPokemon: Pokemon[], name: string);
    choosePokemonToFight(): void;
    isAllPokemonIsDead(): boolean;
    attack(enemy: Pokemon): void;
    defend(): void;
    getActivePokemon(): Pokemon | undefined;
}
//# sourceMappingURL=Player.d.ts.map