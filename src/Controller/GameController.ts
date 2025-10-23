import { Battle } from "../BattleSimulator/Battle.js";
import { GameInterface } from "../GameInterface/GameInterface.js";
import { IPlayer } from "../Interfaces/IPlayer.js";
import { Player } from "../Player/Player.js";


export class GameController {
  public static async start(): Promise<void> {
    let playAgain = true;
    let playerName: string = "";

    while (playAgain) {
      console.clear();
      console.log("Welcome to Pokémon Battle Simulator!\n");

      // Get player name
      if (playerName === "") {
        playerName = await this.getPlayerName();
      }

      console.log(`\nHello, ${playerName}! Let's pick your team.\n`);

      // Let player choose pokemons
      const chosenPokemons = await GameInterface.choosePokemons();

      // Setup player
      const player = this.setupPlayer(playerName, chosenPokemons);

      // Start battle
      await this.playBattle(player);

      // Ask if player wants to play again
      playAgain = await this.askPlayAgain(player);
    }

    console.log("\nThanks for playing! Goodbye!");
    process.exit(0);
  }


  // Helper Methods ----------------------------------------------------------------------------------

  private static async getPlayerName(): Promise<string> {
    return await GameInterface.ask("Enter your player name: ");
  }

  private static setupPlayer(name: string, pokemons: any[]): IPlayer {
    const player: IPlayer = new Player(name);
    pokemons.forEach(p => player.getBag().registerPokemon(p.name, p.power, p.level));
    return player;
  }

  private static async playBattle(player: IPlayer): Promise<void> {
    const battle = new Battle(player);
    await battle.startBattle(GameInterface.ask);
  }

  private static async askPlayAgain(player: IPlayer): Promise<boolean> {
    const again = await GameInterface.ask("\nDo you want to play again? (y/n): ");
    if (again.toLowerCase() === "y") {
      player.getBag().restoreAllPokemons(); // heal pokemons for next battle
      return true;
    }
    return false;
  }
}
