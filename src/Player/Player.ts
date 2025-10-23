import type { IPokemon } from "../Interfaces/IPokemon.js";
import type { IPlayer } from "../Interfaces/IPlayer.js";
import { PokemonBag } from "../Pokemon/PokemonBag.js";

export class Player implements IPlayer {
  public name: string;
  private bag: PokemonBag;
  private playerPoke: IPokemon | null = null;

  constructor(name: string) {
    this.name = name;
    this.bag = new PokemonBag(); // Each player has their own bag
  }

  // ==========================
  // Core Pokémon Management
  // ==========================

  public catchPokemon(name: string, power: string, level: number): void {
    this.bag.registerPokemon(name, power, level);
    console.log(`${this.name} caught a ${name} (${power}, Lv.${level})!`);
  }

  public choosePokemonToFight(): void {
    const allPokemons = this.bag.getAllPokemons() as IPokemon[]; // get all pokemons in the bag
    const healthyPokemon = allPokemons.find(p => p.health > 0);

    if (healthyPokemon) {
      this.playerPoke = healthyPokemon;
      console.log(`${this.name} sent out ${healthyPokemon.name} to battle!`);
    } else {
      this.playerPoke = null;
      console.log(`${this.name} has no healthy Pokémon left!`);
    }
  }

  public healAllPokemons(): void {
    this.bag.restoreAllPokemons();
  }

  public getBag(): PokemonBag {
    return this.bag;
  }

  // ==========================
  // Battle-related Methods
  // ==========================

  public getActivePokemon(): IPokemon | null{
    return this.playerPoke;
  }

   public attack(enemy: IPokemon): void {
    if (!this.playerPoke) {
      console.log("No active Pokémon selected!");
      return;
    }

    this.playerPoke.attack(enemy);
  }

  public defend(): void {
    if (!this.playerPoke) {
      console.log("No active Pokémon selected!");
      return;
    }

    this.playerPoke.defend();
  }

  public isAllPokemonIsDead(): boolean {
    return this.bag.allPokemonDead();
  }
}
