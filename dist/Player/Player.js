export default class Player {
    name;
    pokemons = [];
    activePokemon;
    constructor(IPokemon, name) {
        this.pokemons = IPokemon;
        this.name = name;
    }
    choosePokemonToFight() {
        // Choose the first healthy Pokémon
        const available = this.pokemons.find(p => p.health > 0);
        if (available) {
            this.activePokemon = available;
            console.log(`\n${this.name} sends out ${available.name}!`);
        }
        else {
            console.log("All Pokémon fainted!");
        }
    }
    isAllPokemonIsDead() {
        return this.pokemons.every(p => p.health <= 0);
    }
    attack(enemy) {
        if (!this.activePokemon) {
            console.log("No active Pokémon selected!");
            return;
        }
        this.activePokemon.attack(enemy);
    }
    defend() {
        if (!this.activePokemon) {
            console.log("No active Pokémon selected!");
            return;
        }
        this.activePokemon.defend();
    }
    getActivePokemon() {
        return this.activePokemon;
    }
}
//# sourceMappingURL=Player.js.map