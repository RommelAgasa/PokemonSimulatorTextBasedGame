import { IPokemon } from "../Interfaces/IPokemon.js";
import { Pokemon } from "./Pokemon.js";

export class PokemonFactory {
  private static pokemons: Record<string, IPokemon> = {};

  private static getKey(name: string, power: string, level: number): string {
    return `${name.toLowerCase()}_${power.toLowerCase()}_${level}`;
  }

  public static registerPokemon(pokemon: IPokemon): void {
    const key = this.getKey(pokemon.name, pokemon.power, pokemon.level);
    this.pokemons[key] = pokemon;
  }

  public static spawnPokemon(name: string, power?: string, level?: number): IPokemon | null {
    if (power && level !== undefined) {
      const key = this.getKey(name, power, level);
      return this.pokemons[key] ?? null;
    }

    // if only name is provided, return the first Pokémon found with that name
    const found = Object.values(this.pokemons).find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
    return found ?? null;
  }

  public static createPokemon(name: string, power: string, level: number): IPokemon {
    const existing = this.spawnPokemon(name, power, level);

    if (existing) {
      return existing; // same template found
    }

    const newPokemon = new Pokemon(name, power, level);
    this.registerPokemon(newPokemon);
    return newPokemon;
  }

  public static restoreAllPokemons(): void {
    Object.values(this.pokemons).forEach(p => {
      p.health = p.maxHealth;
    });
  }

}
