import { IPlayer } from "../Interfaces/IPlayer.js";
import Player from "../Player/Player.js";
import { Pokemon } from "../Pokemons/Pokemon.js";
import { PokemonCatalog } from "../Pokemons/PokemonCatalog.js";
import { PokemonFactory } from "../Pokemons/PokemonFactory.js";

export class Battle {
  private player!: IPlayer;
  private enemy!: IPlayer;

  constructor(player: IPlayer) {
    this.player = player;
    this.enemy = Battle.makeEnemy();
  }

  public static makeEnemy(): IPlayer {
      const enemyName = "Team Rocket Grunt";
      const allPokemons = PokemonCatalog.all;
      const enemyPokemons: Pokemon[] = [];
      while (enemyPokemons.length < 3) {
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        const p = allPokemons[randomIndex];
        const spawned = PokemonFactory.createPokemon(p.name, p.power, p.level) as Pokemon;
        if (!enemyPokemons.find(ep => ep.name === spawned.name)) {
          enemyPokemons.push(spawned);
        }
      }

      return new Player(enemyPokemons, enemyName);
    }

  // --- Setup Players ---
  public setup(playerPokemons: Pokemon[], enemyPokemons: Pokemon[], playerName: string, enemyName: string): void {
    this.player = new Player(playerPokemons, playerName);
    this.enemy = new Player(enemyPokemons, enemyName);
  }

  // --- Entry Point ---
  public async startBattle(ask: (q: string) => Promise<string>): Promise<void> {
    if (!this.player || !this.enemy) {
      throw new Error("Battle not properly set up. Call setup() before starting.");
    }

    console.log("\n\n=== Pokémon Battle Simulator ===\n\n");

    // Setup active Pokémon
    this.player.choosePokemonToFight();
    this.enemy.choosePokemonToFight();

    this.displayVsMessage(this.player.getActivePokemon()!, this.enemy.getActivePokemon()!, false);

    // Main battle loop
    while (!this.player.isAllPokemonIsDead() && !this.enemy.isAllPokemonIsDead()) {
      const action = (await ask("Press [A] to Attack or [D] to Defend and press Enter to continue...  ")).toLowerCase();
      await this.processTurn(action);
    }

    this.displayWinner();
  }

  // --- Handle a Player's Turn ---
  private async processTurn(action: string): Promise<void> {
    switch (action) {
      case "a":
        this.handleAttack();
        break;
      case "d":
        this.handleDefend();
        break;
      default:
        console.log("Invalid action! Please enter A or D.");
        return;
    }

    console.log("\n---------------------------------------------------------------\n");

    this.handleFaint(this.player, this.enemy);
    this.handleFaint(this.enemy, this.player);
  }

  // --- Attack Flow ---
  private handleAttack(): void {
    this.player.attack(this.enemy.getActivePokemon()!);
    if (this.enemy.getActivePokemon()!.health > 0) {
      this.enemy.attack(this.player.getActivePokemon()!);
    }
  }

  // --- Defend Flow ---
  private handleDefend(): void {
    this.player.defend();
    if (this.enemy.getActivePokemon()!.health > 0) {
      this.enemy.attack(this.player.getActivePokemon()!);
    }
  }

  // --- Handle Pokémon Fainting ---
  private handleFaint(activePlayer: IPlayer, opponent: IPlayer): void {
    const activePokemon = activePlayer.getActivePokemon()!;
    if (activePokemon.health <= 0) {
      console.log(`${activePlayer.name}'s ${activePokemon.name} fainted!\n`);

      if (!activePlayer.isAllPokemonIsDead()) {
        activePlayer.choosePokemonToFight();
        const newPokemon = activePlayer.getActivePokemon()!;
        this.displayVsMessage(newPokemon, opponent.getActivePokemon()!, true);
      }
    }
  }

  // --- Display Winner ---
  private displayWinner(): void {
    if (this.player.isAllPokemonIsDead()) {
      console.log("\nEnemy wins the battle!");
    } else {
      console.log(`\n${this.player.name} wins the battle!`);
    }
    console.log("\n=== Battle End ===\n");
  }

  // --- Show Pokémon VS Status ---
  private displayVsMessage(playerPoke: Pokemon, enemyPoke: Pokemon, switched: boolean): void {
    const context = switched ? "New matchup:" : "";
    console.log(
      `\n${context} ${playerPoke.name} (HP: ${playerPoke.health}/${playerPoke.maxHealth}) VS ${enemyPoke.name} (HP: ${enemyPoke.health}/${enemyPoke.maxHealth})\n`
    );
  }
}
