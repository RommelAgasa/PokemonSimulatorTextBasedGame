import { Battle } from "../BattleSimulator/battle.js";
import { GameInterface } from "../GameInterface/GameInterface.js";
import { Player } from "../Player/Player.js";
export class GameController {
    static async start() {
        let playAgain = true;
        let playerName = "";
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
    static async getPlayerName() {
        return await GameInterface.ask("Enter your player name: ");
    }
    static setupPlayer(name, pokemons) {
        const player = new Player(name);
        pokemons.forEach(p => player.getBag().registerPokemon(p.name, p.power, p.level));
        return player;
    }
    static async playBattle(player) {
        const battle = new Battle(player);
        await battle.startBattle(GameInterface.ask);
    }
    static async askPlayAgain(player) {
        const again = await GameInterface.ask("\nDo you want to play again? (y/n): ");
        if (again.toLowerCase() === "y") {
            player.getBag().restoreAllPokemons(); // heal pokemons for next battle
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=GameController.js.map