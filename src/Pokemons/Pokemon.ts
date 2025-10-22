import type { IPokemon } from "../Interfaces/IPokemon.js";

export class Pokemon implements IPokemon {
  name: string;
  health: number;
  level: number;
  power: string; //"Fire", "Water", "Grass"
  maxHealth: number;

  constructor(name: string, power: string, level: number = 1) {
    this.name = name;
    this.power = power;
    this.level = level;
    this.maxHealth = 50 + level * 10; // base HP grows with level
    this.health = this.maxHealth;
  }

  attack(target: IPokemon): void {
    const baseDamage = 5 + this.level * 2;
    const multiplier = this.getTypeMultiplier(target.power);
    const damage = Math.floor(baseDamage * multiplier);

    target.health -= damage;
    if (target.health < 0) target.health = 0;

    console.log(
      `\n${this.name} attacks ${target.name} with ${this.power} power and deals ${damage} damage!`
    );

    if (target.health <= 0) {
      console.log(`${target.name} fainted!`);
    } else {
      console.log(`${target.name} has ${target.health}/${target.maxHealth} HP left.`);
    }
  }

  defend(): void {
    const healAmount = 10 + this.level * 2;
    this.health += healAmount;
    if (this.health > this.maxHealth) this.health = this.maxHealth;

    console.log(`${this.name} defends and recovers ${healAmount} HP!`);
    console.log(`${this.name} now has ${this.health}/${this.maxHealth} HP.`);
  }

  private getTypeMultiplier(enemyType: string): number {
    // Simplified Pokémon type chart
    const chart: Record<string, Record<string, number>> = {
      Fire: { Grass: 2, Water: 0.5, Fire: 1 },
      Water: { Fire: 2, Grass: 0.5, Water: 1 },
      Grass: { Water: 2, Fire: 0.5, Grass: 1 },
    };

    const typeEffectiveness = chart[this.power]?.[enemyType];
    return typeEffectiveness ?? 1; // default neutral damage
  }
}
