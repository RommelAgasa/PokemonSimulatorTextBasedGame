import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { PokemonFactory } from "../Pokemons/PokemonFactory.js";
import { PokemonCatalog } from "../Pokemons/PokemonCatalog.js";
export class GameInterface {
    static rl = createInterface({ input, output });
    static async ask(question) {
        const answer = await GameInterface.rl.question(question);
        return answer.trim();
    }
    static async choosePokemons() {
        const allPokemons = PokemonCatalog.all;
        console.log("\nAvailable Pokémon:");
        allPokemons.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} (Type: ${p.power}, Level: ${p.level})`);
        });
        let chosen = [];
        while (chosen.length !== 3) {
            const input = await GameInterface.ask("\nChoose 3 Pokémon by number (comma-separated, e.g. 1,3,5): ");
            const indexes = input
                .split(",")
                .map((x) => parseInt(x.trim()) - 1)
                .filter((i) => i >= 0 && i < allPokemons.length);
            if (indexes.length === 3) {
                chosen = indexes.map((i) => {
                    const p = allPokemons[i];
                    // Spawn a fresh instance with the same properties
                    return PokemonFactory.createPokemon(p.name, p.power, p.level);
                });
            }
            else {
                console.log("You must select exactly 3 Pokémon!");
            }
        }
        return chosen;
    }
}
//# sourceMappingURL=GameInterface.js.map