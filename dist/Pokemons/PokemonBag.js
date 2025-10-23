import { Pokemon } from "./Pokemon.js";
export class PokemonBag {
    pokemons = {};
    registerPokemon(name, power, level) {
        // Check if the Pokémon already exists in the bag
        const existing = this.spawnPokemon(name, power, level);
        if (!existing) {
            const newPokemon = new Pokemon(name, power, level);
            const key = this.getKey(newPokemon.name, newPokemon.power, newPokemon.level);
            this.pokemons[key] = newPokemon;
        }
    }
    getAllPokemons() {
        return Object.values(this.pokemons);
    }
    getKey(name, power, level) {
        return `${name.toLowerCase()}_${power.toLowerCase()}_${level}`;
    }
    spawnPokemon(name, power, level) {
        if (power && level !== undefined) {
            const key = this.getKey(name, power, level);
            return this.pokemons[key] ?? null;
        }
        // If only name is provided, return the first Pokémon found with that name
        const found = Object.values(this.pokemons).find(p => p.name.toLowerCase() === name.toLowerCase());
        return found ?? null;
    }
    allPokemonDead() {
        return Object.values(this.pokemons).every(p => p.health <= 0);
    }
    restoreAllPokemons() {
        Object.values(this.pokemons).forEach(p => {
            p.health = p.maxHealth;
        });
    }
}
//# sourceMappingURL=PokemonBag.js.map