import type { IPokemon } from "../Interfaces/IPokemon.js";
export declare class Pokemon implements IPokemon {
    name: string;
    health: number;
    level: number;
    power: string;
    maxHealth: number;
    constructor(name: string, power: string, level?: number);
    attack(target: IPokemon): void;
    defend(): void;
    private getTypeMultiplier;
}
//# sourceMappingURL=Pokemon.d.ts.map