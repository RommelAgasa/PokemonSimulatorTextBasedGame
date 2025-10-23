import { Pokemon } from "./Pokemon.js";
export class PokemonFactory {
    static createPokemon(name, power, level) {
        return new Pokemon(name, power, level);
    }
}
//# sourceMappingURL=PokemonFactory.js.map