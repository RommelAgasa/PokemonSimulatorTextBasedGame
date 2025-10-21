import Player from "../Player/Player.js";
import { Pokemon } from "../Pokemons/Pokemon.js";
export class Battle {
    // Enemy setup
    enemyPokemons = [
        new Pokemon("Meowth", "Normal", 4),
        new Pokemon("Arbok", "Poison", 6),
        new Pokemon("Koffing", "Poison", 5),
        new Pokemon("Sandshrew", "Ground", 5),
        new Pokemon("Raticate", "Normal", 4),
        new Pokemon("Weezing", "Poison", 7)
    ];
    enemy = new Player(this.enemyPokemons, "Enemy");
    startBattle(player) {
        console.log("\n\n=== Pokémon Battle Simulator ===\n\n");
        player.choosePokemonToFight();
        this.enemy.choosePokemonToFight();
        console.log("\n=== Battle Start ===\n");
        let playerPoke = player.getActivePokemon();
        let enemyPoke = this.enemy.getActivePokemon();
        Battle.displayVsMessage(playerPoke, enemyPoke, false);
        while (!player.isAllPokemonIsDead() && !this.enemy.isAllPokemonIsDead()) {
            if (playerPoke.health <= 0) {
                player.choosePokemonToFight();
                playerPoke = player.getActivePokemon();
                Battle.displayVsMessage(playerPoke, enemyPoke, true);
            }
            if (enemyPoke.health <= 0) {
                this.enemy.choosePokemonToFight();
                enemyPoke = this.enemy.getActivePokemon();
                Battle.displayVsMessage(playerPoke, enemyPoke, true);
            }
            this.AttackTurn(player);
            console.log("\n-----------------------\n");
        }
        if (player.isAllPokemonIsDead()) {
            console.log("Enemy wins the battle!");
        }
        else {
            console.log(`${player.name} wins the battle!`);
        }
        console.log("\n=== Battle End ===\n");
    }
    AttackTurn(player) {
        // Player attacks first
        player.attack(this.enemy.getActivePokemon());
        // check if enemy fainted immediately after attack
        if (this.enemy.getActivePokemon().health <= 0) {
            return; // skip enemy’s attack this round
        }
        // Enemy attacks back
        this.enemy.attack(player.getActivePokemon());
        // check if player fainted immediately after attack
        if (player.getActivePokemon().health <= 0) {
            return; // skip to next loop (will switch next turn)
        }
    }
    static displayVsMessage(playerPoke, enemyPoke, switched) {
        if (switched) {
            console.log(`\nNew matchup: ${playerPoke.name} (HP: ${playerPoke.health}/${playerPoke.maxHealth}) VS ${enemyPoke.name} (HP: ${enemyPoke.health}/${enemyPoke.maxHealth})\n`);
        }
        else {
            console.log(`\n${playerPoke.name} (HP: ${playerPoke.health}/${playerPoke.maxHealth}) VS ${enemyPoke.name} (HP: ${enemyPoke.health}/${enemyPoke.maxHealth})\n`);
        }
    }
}
//# sourceMappingURL=battle.js.map