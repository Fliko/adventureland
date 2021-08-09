import Event from 'eventSystem.js';
import {hp_up, mp_up} from 'skills.js';
import {attack, get_nearest_target, } from 'attack.js';

/** Events
 * injured      - Health below maximum
 * mana_depleted- mana below maximum
 * attacking    - Targeted or targeting a creature
 * resting      - waiting for stats to max before next fight
 * travelling   - going places
 * shopping     - buying potions, upgrgrading items, etc
 * killed       - revive when can
 **/


const gameEvents = Event({
  events: {
    injured: {is: false},
    mana_depleted: {is: false},
    attacking: {attack},
    resting: {},
    travelling: {},
    shopping: {},
    killed: {is: false}
  },
  listeners: {
    injured: [hp_up],
    mana_depleted: [mp_up],
    attacking: [],
    resting: [],
    travelling: [],
    shopping: [],
    killed: []
  }
});

setInterval(checkHealth, 1000);
setInterval(checkMana, 1000);
setInterval(isDead, 10000);

function checkHealth() {
  // if already emitted or healthy, return
  if (gameEvents.events.injured.is || character.hp == character.max_hp) return;
  gameEvents.emit("injured");
}

function checkMana() {
  // if already emitted or full, return
  if (gameEvents.events.mana_depleted.is || character.mp == character.max_mp) return;
  gameEvents.emit("mana_depleted");
}

function isDead() {
  // if already emitted or not dead, return
  if(gameEvents.events.killed.is || !character.rip) return;
  gameEvents.emit("killed");
}

function basic_attack() {
  return find_attack()
    .then(
    data => {

    },
    err => {
      switch(err.reason) {
        case "not_found":

      }
    });
}
