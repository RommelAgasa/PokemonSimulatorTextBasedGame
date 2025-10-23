import { IPokemon } from "../Interfaces/IPokemon.js";
import { Pokemon } from "./Pokemon.js";

export class PokemonBag {
  private pokemons: Record<string, IPokemon> = {};

  public registerPokemon(name: string, power: string, level: number): void {
    // Check if the Pokémon already exists in the bag
    const existing = this.spawnPokemon(name, power, level);

    if (!existing) {
        const newPokemon: IPokemon = new Pokemon(name, power, level);
        const key = this.getKey(newPokemon.name, newPokemon.power, newPokemon.level);
        this.pokemons[key] = newPokemon;
    }
  }

  public getAllPokemons(): IPokemon[] {
    return Object.values(this.pokemons);
  }

  private getKey(name: string, power: string, level: number): string {
    return `${name.toLowerCase()}_${power.toLowerCase()}_${level}`;
  }

  public spawnPokemon(name: string, power?: string, level?: number): IPokemon | null {
    if (power && level !== undefined) {
      const key = this.getKey(name, power, level);
      return this.pokemons[key] ?? null;
    }

    // If only name is provided, return the first Pokémon found with that name
    const found = Object.values(this.pokemons).find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
    return found ?? null;
  }

  public allPokemonDead(): boolean {
    return Object.values(this.pokemons).every(p => p.health <= 0);
  }

  public restoreAllPokemons(): void {
    Object.values(this.pokemons).forEach(p => {
      p.health = p.maxHealth;
    });
  }
}
