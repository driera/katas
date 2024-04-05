export class Character {
  private maxHealth = 1000;
  private health: number;
  private alive: boolean;
  private baseDamage: number;
  private level: number;
  private factions: Set<string>;

  constructor({
    health = 1000,
    alive = true,
    baseDamage = 100,
    level = 1,
    factions = [] as string[]
  } = {}) {
    this.health = health;
    this.alive = alive;
    this.baseDamage = baseDamage;
    this.level = level;
    this.factions = new Set(factions);
  }

  receiveDamage(damage: number) {
    if (!this.alive) {
      return;
    }
    this.health -= damage;
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  receiveHealing(healing: number) {
    if (this.health + healing > this.maxHealth) {
      this.health = this.maxHealth;
      return;
    }
    this.health += healing;
  }

  attacks(target: Character) {
    const targetLevel = target.getStatus().level;
    const targetFactions = target.getStatus().factions;
    if (targetFactions.some((faction) => this.factions.has(faction))) {
      target.receiveDamage(0);
      return;
    }

    if (targetLevel - this.level >= 5) {
      target.receiveDamage(this.baseDamage / 2);
      return;
    }

    if (this.level - targetLevel >= 5) {
      target.receiveDamage(this.baseDamage * 2);
      return;
    }

    target.receiveDamage(this.baseDamage);
    return;
  }

  heals(target: Character) {
    const targetFactions = target.getStatus().factions;
    if (
      target === this ||
      targetFactions.some((faction) => this.factions.has(faction))
    ) {
      target.receiveHealing(500);
    }
  }

  joinFaction(faction: string) {
    this.factions.add(faction);
  }

  leaveFaction(faction: string) {
    this.factions.delete(faction);
  }

  getStatus() {
    return {
      health: this.health,
      alive: this.alive,
      level: this.level,
      factions: Array.from(this.factions)
    };
  }
}
