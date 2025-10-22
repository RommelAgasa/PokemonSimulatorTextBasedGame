import { Battle } from "../BattleSimulator/battle.js";
import { GameInterface } from "../GameInterface/GameInterface.js";
import Player from "../Player/Player.js";
import { PokemonFactory } from "../Pokemons/PokemonFactory.js";
export class GameController {
    static async start() {
        let playAgain = true;
        let playerName = "";
        let player;
        while (playAgain) {
            console.clear();
            console.log("Welcome to Pokémon Battle Simulator!\n");
            if (playerName == "") {
                playerName = await GameInterface.ask("Enter your player name: ");
            }
            console.log(`\nHello, ${playerName}! Let's pick your team.\n`);
            const chosenPokemons = await GameInterface.choosePokemons();
            player = new Player(chosenPokemons, playerName); // create new player each game // to reset state
            const battle = new Battle(player);
            await battle.startBattle(GameInterface.ask);
            const again = await GameInterface.ask("\nDo you want to play again? (y/n): ");
            playAgain = again.toLowerCase() === "y";
            if (playAgain) {
                PokemonFactory.restoreAllPokemons();
            }
        }
        console.log("\nThanks for playing! Goodbye!");
        process.exit(0);
    }
}
//# sourceMappingURL=GameController.js.map