import { Battle } from "./BattleSimulator/battle.js";
import Player from "./Player/Player.js";
import { availablePokemons } from "./Pokemons/AvailablePokemons.js";
import type { Pokemon } from "./Pokemons/Pokemon.js";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });
const battle = new Battle();

let endGame = false;

async function ask(question: string): Promise<string> {
  const answer = await rl.question(question);
  return answer.trim();
}

async function choosePokemons(): Promise<Pokemon[]> {
  console.log("\nAvailable Pokémon:");
  availablePokemons.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (Type: ${p.power}, Level: ${p.level})`);
  });

  let chosen: Pokemon[] = [];
  while (chosen.length !== 6) {
    const input = await ask(
      "\nChoose 6 Pokémon by number (comma-separated, e.g. 1,3,5,6,7,9): "
    );
    const indexes = input
      .split(",")
      .map((x) => parseInt(x.trim()) - 1)
      .filter((i) => i >= 0 && i < availablePokemons.length);

    if (indexes.length === 6) {
      chosen = indexes.map((i) => availablePokemons[i]);
    } else {
      console.log("❌ You must select exactly 6 Pokémon!");
    }
  }

  return chosen;
}

do {
  console.clear();
  console.log("🎮 Welcome to Pokémon Battle Simulator!\n");

  const playerName = await ask("Enter your name: ");
  console.log(`\nHello, ${playerName}! Let's pick your team.\n`);

  const chosenPokemons = await choosePokemons();

  const player = new Player(chosenPokemons, playerName);
  await battle.startBattle(player);

  const again = await ask("\nDo you want to play again? (y/n): ");
  endGame = again.toLowerCase() !== "y";

} while (!endGame);

console.log("\n👋 Thanks for playing! Goodbye!");
await rl.close();
