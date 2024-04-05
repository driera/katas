import { Character } from ".";

describe("RPG Combat", () => {
  describe("Character", () => {
    it("has 1000 health when created", () => {
      const character = new Character();

      expect(character.getStatus().health).toBe(1000);
    });

    it("is alive when created", () => {
      const character = new Character();

      expect(character.getStatus().alive).toBe(true);
    });

    it("has a starting level of 1", () => {
      const character = new Character();

      expect(character.getStatus().level).toBe(1);
    });

    it("can join a Faction", () => {
      const character = new Character();

      const faction = "Funny legion";
      character.joinFaction(faction);
      expect(character.getStatus().factions).toContain(faction);
    });

    it("can join multiple factions", () => {
      const character = new Character();

      const faction1 = "Funny legion";
      const faction2 = "Sad legion";
      character.joinFaction(faction1);
      character.joinFaction(faction2);
      expect(character.getStatus().factions).toEqual([faction1, faction2]);
    });

    it("can leave a faction", () => {
      const faction = "Funny legion";
      const character = new Character({ factions: [faction] });

      character.leaveFaction(faction);
      expect(character.getStatus().factions).toEqual([]);
    });
  });

  describe("Combat", () => {
    it("decreases health when receives damage", () => {
      const attacker = new Character();
      const target = new Character({ health: 1000 });

      attacker.attacks(target);

      expect(target.getStatus().health).toBe(900);
    });

    it("dies when health reaches 0", () => {
      const attacker = new Character({ baseDamage: 1000 });
      const target = new Character({ health: 1000 });

      attacker.attacks(target);

      expect(target.getStatus().alive).toBe(false);
    });

    it("cannot receive damage when dead", () => {
      const attacker = new Character({ baseDamage: 1000 });
      const target = new Character({ health: 1000 });

      attacker.attacks(target);
      expect(target.getStatus().alive).toBe(false);

      attacker.attacks(target);
      expect(target.getStatus().health).toBe(0);
    });

    it("reduces damage if attacker level is 5 lvls lower than target", () => {
      const attacker = new Character({ baseDamage: 10, level: 1 });
      const target = new Character({ health: 10, level: 6 });

      attacker.attacks(target);

      expect(target.getStatus().health).toBe(5);
    });

    it("increases damage if attacker level is 5 lvls higher than target", () => {
      const attacker = new Character({ baseDamage: 10, level: 6 });
      const target = new Character({ health: 20, level: 1 });

      attacker.attacks(target);

      expect(target.getStatus().health).toBe(0);
    });

    it("can't attack if target belongs to same faction", () => {
      const faction = "Funny legion";
      const attacker = new Character({ factions: [faction] });
      const target = new Character({ factions: [faction] });

      attacker.attacks(target);

      expect(target.getStatus().health).toBe(1000);
    });
  });

  describe("Healing", () => {
    it("can heal themselves", () => {
      const character = new Character({ health: 500 });

      character.heals(character);

      expect(character.getStatus().health).toBe(1000);
    });

    it("cannot heal above maxHealth", () => {
      const character = new Character({ health: 900 });

      character.heals(character);

      expect(character.getStatus().health).toBe(1000);
    });

    it("can't heal other characters if they belong to different factions", () => {
      const faction = "Funny legion";
      const healer = new Character({ factions: [faction] });
      const target = new Character({ health: 1 });

      healer.heals(target);

      expect(target.getStatus().health).toBe(1);
    });
  });
});
