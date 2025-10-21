import type Tanngol from "../Player/Player.js";
import Player from "../Player/Player.js";
import { Pokemon } from "../Pokemons/Pokemon.js";


export class Battle{

    // Enemy setup
    private enemyPokemons: Pokemon[] = [
        new Pokemon("Meowth", "Normal", 4),
        new Pokemon("Arbok", "Poison", 6),
        new Pokemon("Koffing", "Poison", 5),
        new Pokemon("Sandshrew", "Ground", 5)
    ];

    private enemy = new Player(this.enemyPokemons, "Enemy");

    async startBattle(player: Player, ask: (question: string) => Promise<string>): Promise<void> {
        
        console.log("\n\n=== Pokémon Battle Simulator ===\n\n");

        // Both players choose their first Pokémon to fight
        player.choosePokemonToFight();
        this.enemy.choosePokemonToFight();

        let playerPoke = player.getActivePokemon()!;
        let enemyPoke = this.enemy.getActivePokemon()!;

        console.log("\n=== Battle Start ===\n");
        Battle.displayVsMessage(playerPoke, enemyPoke, false);
        let action: string;

        do {
            //  Wait for player action
            action = (await ask("Press [A] to Attack or [D] to Defend and press Enter to continue...")).toLowerCase();

            if (action === "a") {
                // Player attacks first
                this.AttackTurn(player);
            } 
            else if (action === "d") {
                // Player defends first
                player.defend();

                // Enemy only attacks if still alive
                if (this.enemy.getActivePokemon()!.health > 0) {
                    this.enemy.attack(player.getActivePokemon()!);
                }
            } 
            else {
                console.log("❌ Invalid action! Please enter A or D.");
                continue; // repeat the turn
            }

            console.log("\n---------------------------------------------------------------\n");

            // Check if enemy fainted after attack
            if (this.enemy.getActivePokemon()!.health <= 0) {
                console.log(`${this.enemy.name}'s ${this.enemy.getActivePokemon()!.name} fainted!\n`);
                if (!this.enemy.isAllPokemonIsDead()) {
                    this.enemy.choosePokemonToFight();
                    const enemyPoke = this.enemy.getActivePokemon()!;
                    Battle.displayVsMessage(player.getActivePokemon()!, enemyPoke, true);
                }
                continue; // skip to next loop
            }

            // Check if player fainted after enemy’s attack
            if (player.getActivePokemon()!.health <= 0) {
                console.log(`${player.name}'s ${player.getActivePokemon()!.name} fainted!\n`);
                if (!player.isAllPokemonIsDead()) {
                    player.choosePokemonToFight();
                    const playerPoke = player.getActivePokemon()!;
                    Battle.displayVsMessage(playerPoke, this.enemy.getActivePokemon()!, true);
                }
                continue; // skip to next loop
            }

        } while (!player.isAllPokemonIsDead() && !this.enemy.isAllPokemonIsDead());

        if(player.isAllPokemonIsDead()) {
            console.log("\nEnemy wins the battle!");
        } else {
            console.log(`\n${player.name} wins the battle!`);
        }


        console.log("\n=== Battle End ===\n");
    }


    private AttackTurn(player: Player): void {
        // Player attacks first
        player.attack(this.enemy.getActivePokemon()!);

        // check if enemy fainted immediately after attack
        if (this.enemy.getActivePokemon()!.health <= 0) {
            return; // skip enemy’s attack this round
        }

        // Enemy attacks back
        this.enemy.attack(player.getActivePokemon()!);

        // check if player fainted immediately after attack
        if (player.getActivePokemon()!.health <= 0) {
            return; // skip to next loop (will switch next turn)
        }
    }

    private static displayVsMessage(playerPoke: Pokemon, enemyPoke: Pokemon, switched: boolean): void {
        if(switched) {
            console.log(`\nNew matchup: ${playerPoke.name} (HP: ${playerPoke.health}/${playerPoke.maxHealth}) VS ${enemyPoke.name} (HP: ${enemyPoke.health}/${enemyPoke.maxHealth})\n`);
        } else {
            console.log(`\n${playerPoke.name} (HP: ${playerPoke.health}/${playerPoke.maxHealth}) VS ${enemyPoke.name} (HP: ${enemyPoke.health}/${enemyPoke.maxHealth})\n`);
        }
    }

}