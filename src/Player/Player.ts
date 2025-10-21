import type { IPlayer } from '../Interfaces/IPlayer.js';
import { Pokemon } from '../Pokemons/Pokemon.js';

export default class Player implements IPlayer {
  public name: string;
  private pokemons: Pokemon[] = [];
  private activePokemon?: Pokemon;

  constructor(IPokemon: Pokemon[], name: string) {
    this.pokemons = IPokemon;
    this.name = name;
  }

  public choosePokemonToFight(): void {
    // Choose the first healthy Pokémon
    const available = this.pokemons.find(p => p.health > 0);
    if (available) {
      this.activePokemon = available;
      console.log(`\n${this.name} sends out ${available.name}!`);
    } else {
      console.log("All Pokémon fainted!");
    }
  }

  public isAllPokemonIsDead(): boolean {
    return this.pokemons.every(p => p.health <= 0);
  }

  public attack(enemy: Pokemon): void {
    if (!this.activePokemon) {
      console.log("No active Pokémon selected!");
      return;
    }

    this.activePokemon.attack(enemy);
  }

  public defend(): void {
    if (!this.activePokemon) {
      console.log("No active Pokémon selected!");
      return;
    }

    this.activePokemon.defend();
  }

  public getActivePokemon(): Pokemon | undefined {
    return this.activePokemon;
  }
}
