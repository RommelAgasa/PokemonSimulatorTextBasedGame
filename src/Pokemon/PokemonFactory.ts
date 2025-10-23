import { IPokemon } from "../Interfaces/IPokemon.js";
import { Pokemon } from "./Pokemon.js";

export class PokemonFactory {
  
  public static createPokemon(name: string, power: string, level: number): IPokemon {
    return new Pokemon(name, power, level);
  }
}
