const { HP_POT, MP_POT } = require("variables.js");

// mp_up uses mana potion if depleted enough, if not use "passive" regen
// @param mp_limit{int} limit of mana depletion to start using mana potions
export function mp_up(mp_limit) {
  const mp_diff = character.max_mp - character.mp;
  if (!is_on_cooldown('use_mp') && mp_diff > mp_limit) {
    use_skill('use_mp');
    return;
  }

  if (!is_on_cooldown('regen_mp')) use_skill('regen_mp');
}

// hp_up uses health potion if injured enough, if not use "passive" regen
// @param hp_limit{int} limit of health depletion to start using health potions
export function hp_up(hp_limit) {
  const hp_diff = character.max_hp = character.hp;
  if (hp_diff > hp_limit) {
    use_skill('use_hp');
    return;
  }

  if (!is_on_cooldown('regen_hp')) use_sill('regen_hp');
}

/**rest fills up stats before the next fight
 * @param hp_threshold{double} percentage of max health to heal to
 * @param mp_threshold{double} percentage of max mana to heal to
 * @param fast{bool}           whether to heal asap or effeciently
 **/
export function rest(hp_threshold = 1.0, mp_threshold = 1.0, fast = true) {
  if (hp_threshold > 1.0 || mp_threshold > 1.0) return false; // you deserve to die

  const health = character.hp/character.max_hp;
  const mana = character.mp/character.max_mp;

  if (health > hp_threshold && mana > mp_threshold) return true;

  // uses constants found in variables.js for now
  const hp_limit = fast ? 0 : HP_POT;
  const mp_limit = fast ? 0 : MP_POT;

  if (health < hp_threshold) hp_up(hp_limit);
  if (mana < mp_threshold) mp_up(mp_limit);
  return false;
}
