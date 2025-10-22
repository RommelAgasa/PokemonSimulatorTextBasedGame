
export interface IPokemon {
    name: string;
    health: number;
    maxHealth: number;
    level: number;
    power: string;
    attack(target: IPokemon): void;
    defend(): void;
}