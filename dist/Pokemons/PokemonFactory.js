import { Pokemon } from "./Pokemon.js";
export class PokemonFactory {
    static pokemons = {};
    static getKey(name, power, level) {
        return `${name.toLowerCase()}_${power.toLowerCase()}_${level}`;
    }
    static registerPokemon(pokemon) {
        const key = this.getKey(pokemon.name, pokemon.power, pokemon.level);
        this.pokemons[key] = pokemon;
    }
    static spawnPokemon(name, power, level) {
        if (power && level !== undefined) {
            const key = this.getKey(name, power, level);
            return this.pokemons[key] ?? null;
        }
        // if only name is provided, return the first Pokémon found with that name
        const found = Object.values(this.pokemons).find(p => p.name.toLowerCase() === name.toLowerCase());
        return found ?? null;
    }
    static createPokemon(name, power, level) {
        const existing = this.spawnPokemon(name, power, level);
        if (existing) {
            return existing; // same template found
        }
        const newPokemon = new Pokemon(name, power, level);
        this.registerPokemon(newPokemon);
        return newPokemon;
    }
    static restoreAllPokemons() {
        Object.values(this.pokemons).forEach(p => {
            p.health = p.maxHealth;
        });
    }
}
//# sourceMappingURL=PokemonFactory.js.map