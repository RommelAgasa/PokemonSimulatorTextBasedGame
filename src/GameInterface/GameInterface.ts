import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Pokemon } from "../Pokemon/Pokemon.js";
import { PokemonFactory } from "../Pokemon/PokemonFactory.js";
import { PokemonCatalog } from "../Pokemon/PokemonCatalog.js";
import { IPokemon } from "../Interfaces/IPokemon.js";

export class GameInterface {

    private static rl = createInterface({ input, output });

    public static async ask(question: string): Promise<string> {
        const answer = await GameInterface.rl.question(question);
        return answer.trim();
    }

    public static async choosePokemons(): Promise<IPokemon[]> {
      const allPokemons = PokemonCatalog.all;

      console.log("\nAvailable Pokémon:");
      allPokemons.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (Type: ${p.power}, Level: ${p.level})`);
      });

      let chosen: IPokemon[] = [];

      while (chosen.length !== 3) {
        const input = await GameInterface.ask(
          "\nChoose 3 Pokémon by number (comma-separated, e.g. 1,3,5): "
        );

        const indexes = input
          .split(",")
          .map((x) => parseInt(x.trim()) - 1)
          .filter((i) => i >= 0 && i < allPokemons.length);

        if (indexes.length === 3) {
          chosen = indexes.map((i) => {
            const p = allPokemons[i];
            // Spawn a fresh instance with the same properties
            return PokemonFactory.createPokemon(p.name, p.power, p.level) as Pokemon;
          });
        } else {
          console.log("You must select exactly 3 Pokémon!");
        }
      }

      return chosen;
    }

    

}