/**attack attacks
 * @param target_method{Callback} a function that returns a monster/player object
 * @param attack_method{Callback} a function that attacks the target
 **/
export function find_attack(target_method, attack_method) {
  return new Promise(_ => target_method())
    .then(target => {
      if (!target) return;
      return attack_method(target);
    });
}

/** nearest_target finds the nearest target that meets your criteria
 * @param target_data{Object} monster data
 *  args:
 *      max_att{int}              max monster attack
 *      min_xp{int}               min monster xp reward
 *      target{String or Object}  specific name or player object
 *      no_target{bool}           only fight monsters not attacking/being attacked
 *      path_check{bool}          can you move to target
 *      type{String}              target specific monster type
 **/
export function nearest_target(target_data) {
  const target = get_targeted_monster();

  if (target.dead == true) { // dead can also be a string
    loot();
  } else if (target.dead) {

  }

  if (target) return target;

  return get_nearest_monster(target_data);
}

/** revive calls respawn, later on it will probably get last target and move back to it */
export function revive() {
  respawn();
}
