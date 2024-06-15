#! /usr/bin/env node

import inquirer from "inquirer";

class Hero {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 20;
  }

  increaseHealth() {
    this.health = 100;
  }
}

class Enemy {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 20;
  }

  increaseHealth() {
    this.health = 100;
  }
}

async function main() {
  const { heroName } = await inquirer.prompt([
    {
      type: "input",
      name: "heroName",
      message: "Enter your Hero name",
    },
  ]);

  const { enemyType } = await inquirer.prompt([
    {
      type: "list",
      name: "enemyType",
      message: "Choose your enemy",
      choices: ["Goblin", "Orc", "Troll"],
    },
  ]);

  const hero = new Hero(heroName);
  const enemy = new Enemy(enemyType);

  console.log(`${enemy.name} Vs ${hero.name}`);

  while (hero.health > 0 && enemy.health > 0) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose your action",
        choices: ["Attack", "Defend", "Range Target", "Run"],
      },
    ]);

    switch (action) {
      case "Attack":
        const randomNum = Math.random();
        if (randomNum > 0.5) {
          hero.decreaseHealth();
          console.log(`${hero.name} Health: ${hero.health}`);
        } else {
          enemy.decreaseHealth();
          console.log(`${enemy.name} Health: ${enemy.health}`);
        }
        break;

      case "Defend":
        console.log(`${hero.name} is defending.`);
        break;

      case "Range Target":
        console.log(`${hero.name} used a ranged attack.`);
        enemy.decreaseHealth();
        console.log(`${enemy.name} Health: ${enemy.health}`);
        break;

      case "Run":
        console.log(`${hero.name} ran away.`);
        return;
    }

    if (hero.health <= 0) {
      console.log("You lost! Try again.");
      return;
    } else if (enemy.health <= 0) {
      console.log("Congratulations! You won.");
      return;
    }
  }
}

main();
