// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
// Write your own CODE: https://github.com/kaansoral/adventureland

var attack_mode=true

let last4 = [0]
let cmdIndex = 0
cruise(1000)
//buy("mpot1", 500)
//buy("hpot1", 500)
function use_hp_or_mp()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return;
	var used=true;
	if(is_on_cooldown("use_hp")) return;
	if(character.mp/character.max_mp<0.2) use_skill('use_mp');
	else if(character.max_hp-character.hp>500) use_skill('use_hp');
	else if(character.max_mp-character.mp>500) use_skill('use_mp');
	else if(character.max_hp-character.hp>100) use_skill('regen_hp');
	else if(character.max_mp-character.mp>100) use_skill('regen_mp');
	else used=false;
	if(used) last_potion=new Date();
}
setInterval(function(){
	use_hp_or_mp();
	// Uses potions only when the above conditions are met
	loot();

	if(!attack_mode || character.rip) return;

	var target=get_targeted_monster();

	if(!target) {

	target=get_nearest_monster({
		min_xp:0,
		path_check:true,
		no_target:true
	}); // Ensures that your character can walk to the target (path_check) and the target isn't engaging with anyone else (no_target)

		if(target) change_target(target);
		else {
			set_message("No Monsters");
			return;
		}
		log(target.xp)
	}

	if(in_attack_range(target)) {
		let cmds = ['left','down','right','up']
		strafe(last4, cmds)
		// Walk half the distance
	}
	if(!in_attack_range(target)){
		move(
			character.real_x+(target.real_x-character.real_x)/2,
			character.real_y+(target.real_y-character.real_y)/2
			);
	}
	if(can_attack(target)) {
		set_message("Attacking");
		const worth = target.hp>.7*(character.mp/2)
		const can = character.mp/character.max_mp>.9
		if (can && worth) use_skill("burst", target)
		attack(target);
	}

},250);

function strafe(last4, cmds) {
	const d = 15

	if (last4.length >= 13 && last4.every(i => i== last4[0])) {
		cmdIndex = (cmdIndex+1)%4
	}
	switch(cmds[cmdIndex]) {
		case "left":
			if(!check_left(d)) {
				move_any(d)
			} else {
				move_left(d)
				last4.unshift(1)
			}
			break;
		case "right":
			if(!check_right(d)) {
				move_any(d)
			} else {
				move_right(d)
				last4.unshift(2)
			}
			break;
		case "up":
			if(!check_up(d)) {
				move_any(d)
			} else {
				move_up(d)
				last4.unshift(3)
			}
			break;
		case "down":
			if(!check_down(d)) {
				move_any(d)
			} else {
				move_down(d)
				last4.unshift(4)
			}
			break;
	}
	if (last4.length == 14) {
		last4.pop()
	}
}
function move_any(d) {
	if(check_left(d)) {
		move_left(d)
	} else if(check_right(d)) {
		move_right(d)
	} else if(check_up(d)) {
		move_up(d)
	} else if(check_down(d)) {
		move_down(d)
	}

}

function move_left(dist) {
	move(character.real_x-dist, character.real_y)
}
function check_left(dist) {
	return can_move_to(character.real_x-dist,character.real_y)
}

function move_right(dist) {
	move(character.real_x+dist, character.real_y)
}
function check_right(dist) {
	return can_move_to(character.real_x+dist,character.real_y)
}

function move_up(dist) {
	move(character.real_x, character.real_y-dist)
}
function check_up(dist) {
	return can_move_to(character.real_x,character.real_y-dist)
}

function move_down(dist) {
	move(character.real_x, character.real_y+dist)
}
function check_down(dist) {
	return can_move_to(character.real_x,character.real_y+dist)
}
