import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const leftHPBar = document.querySelector('#left-fighter-indicator');
    const rightHPBar = document.querySelector('#right-fighter-indicator');

    const handleHPMutation = () => {
      if (secondFighterState.health <= 0) {
        secondFighterState.health = 0;
        resolve(firstFighter);
      }
      if (firstFighterState.health <= 0) {
        firstFighterState.health = 0;
        resolve(secondFighter);
      }
      leftHPBar.style.width = `${(firstFighterState.health / firstFighter.health) * 100}%`;
      rightHPBar.style.width = `${(secondFighterState.health / secondFighter.health) * 100}%`;
    };

    const firstFighterState = {
      health: firstFighter.health,
      critEnabled: true,
      isBlocking: false
    };
    const secondFighterState = {
      health: secondFighter.health,
      critEnabled: true,
      isBlocking: false
    };

    const firstFighterCombination = [];
    const secondFighterCombination = [];

    document.addEventListener('keydown', (e) => {
      if (!e.repeat) {
        switch (e.code) {
          case controls.PlayerOneAttack:
            !secondFighterState.isBlocking &&
              !firstFighterState.isBlocking &&
              (secondFighterState.health -= getDamage(firstFighter, secondFighter));
            break;
          case controls.PlayerTwoAttack:
            !firstFighterState.isBlocking &&
              !secondFighterState.isBlocking &&
              (firstFighterState.health -= getDamage(secondFighter, firstFighter));
            break;
          case controls.PlayerOneBlock:
            firstFighterState.isBlocking = true;
            break;
          case controls.PlayerTwoBlock:
            secondFighterState.isBlocking = true;
            break;
        }
        if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
          firstFighterCombination.push(e.code);
          if (firstFighterCombination.length === 3 && firstFighterState.critEnabled && !firstFighterState.isBlocking) {
            secondFighterState.health -= firstFighter.attack * 2;
            firstFighterState.critEnabled = false;
            setTimeout(() => {
              firstFighterState.critEnabled = true;
            }, 10000);
          }
        }
        if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
          secondFighterCombination.push(e.code);
          if (
            secondFighterCombination.length === 3 &&
            secondFighterState.critEnabled &&
            !secondFighterState.isBlocking
          ) {
            firstFighterState.health -= secondFighter.attack * 2;
            secondFighterState.critEnabled = false;
            setTimeout(() => {
              secondFighterState.critEnabled = true;
            }, 10000);
          }
        }
        handleHPMutation();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (!e.repeat) {
        switch (e.code) {
          case controls.PlayerOneBlock:
            firstFighterState.isBlocking = false;
            break;
          case controls.PlayerTwoBlock:
            secondFighterState.isBlocking = false;
            break;
        }
        if (firstFighterCombination.includes(e.code))
          firstFighterCombination.splice(firstFighterCombination.indexOf(e.code), 1);
        if (secondFighterCombination.includes(e.code))
          secondFighterCombination.splice(secondFighterCombination.indexOf(e.code), 1);
      }
    });
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const hitPower = fighter.attack * (Math.random() + 1);
  return hitPower;
}

export function getBlockPower(fighter) {
  const blockPower = fighter.defense * (Math.random() + 1);
  return blockPower;
}
