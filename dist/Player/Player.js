import { PokemonBag } from "../Pokemons/PokemonBag.js";
export class Player {
    name;
    bag;
    playerPoke = null;
    constructor(name) {
        this.name = name;
        this.bag = new PokemonBag(); // Each player has their own bag
    }
    // ==========================
    // Core Pokémon Management
    // ==========================
    catchPokemon(name, power, level) {
        this.bag.registerPokemon(name, power, level);
        console.log(`${this.name} caught a ${name} (${power}, Lv.${level})!`);
    }
    choosePokemonToFight() {
        const allPokemons = this.bag.getAllPokemons(); // get all pokemons in the bag
        const healthyPokemon = allPokemons.find(p => p.health > 0);
        if (healthyPokemon) {
            this.playerPoke = healthyPokemon;
            console.log(`${this.name} sent out ${healthyPokemon.name} to battle!`);
        }
        else {
            this.playerPoke = null;
            console.log(`${this.name} has no healthy Pokémon left!`);
        }
    }
    healAllPokemons() {
        this.bag.restoreAllPokemons();
    }
    getBag() {
        return this.bag;
    }
    // ==========================
    // Battle-related Methods
    // ==========================
    getActivePokemon() {
        return this.playerPoke;
    }
    attack(enemy) {
        if (!this.playerPoke) {
            console.log("No active Pokémon selected!");
            return;
        }
        this.playerPoke.attack(enemy);
    }
    defend() {
        if (!this.playerPoke) {
            console.log("No active Pokémon selected!");
            return;
        }
        this.playerPoke.defend();
    }
    isAllPokemonIsDead() {
        return this.bag.allPokemonDead();
    }
}
//# sourceMappingURL=Player.js.map