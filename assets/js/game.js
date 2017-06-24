"use strict";
/*	Pseudo code
	
	Characters are objects with stats like hp, attack, defense, and counter-attack
	Loot are global funtions that modify character stats
	Attack and defend functions compate the stats for battle and update accordingly

	player starts a new game
	chooses character to attack with
	chooses enemy to attck
	run the battle
	update player and enemy stats
	if enemy dies, chance to drop loot
	if player dies a new character can be chosen to finish the fight

	rules for battle from assignment:
		* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.
		* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  		* For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
		* The enemy character only has `Counter Attack Power`. 
  		* Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
		* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.
		* No characters in the game can heal or recover Health Points. 

	Bonus - allow loot to be reassigned
	Bonus - popover to display all character stats
*/



var heroes = {
	"knight": {
		"name": "knight",
		"hp": 250,
		"attk": 4,
		"def": 75,
		"counterAttack": 20,
		"state": "resting",
		"level": 1,	
	},
	"mage": {
		"name": "mage",
		"hp": 140,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		"level": 1,	
	},
	"priest": {
		"name": "priest",
		"hp": 100,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		"level": 1,	
	},
	"monk": {
		"name": "monk",
		"hp": 200,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		"level": 1,	
	},
}

var enemies = {
	"minataur": {
		"name": "minataur",
		"hp": 250,
		"attk": 4,
		"def": 75,
		"counterAttack": 20,
		"state": "resting",
	},
	"warlock": {
		"name": "warlock",
		"hp": 250,
		"attk": 4,
		"def": 45,
		"counterAttack": 20,
		"state": "resting",	
	},
}

var empty = true;
var currentEnemy = enemies["minataur"]
console.log("currentEnemy: " + currentEnemy.name);

// $("#knight").

$(".hero").on("click", function() {

	var clickedHero = $(this).attr("data-hero");
	var currHero = heroes[clickedHero];
	var heroPosition = $(this).attr("data-location");

	if (empty === true && heroPosition === "camp") {
		empty = false;
		move(this);
		currHero.state = "battling";
		beginBattle(currHero);
	}
	else if ($(this).attr("data-location") === "battle") {
		move(this);
		empty = true;
		endBattle();
	}	
})

function move(image) {
	var hpIcon = $(image).children("h3");

	if ($(image).attr("data-location") === "camp") {
		$("#battlefield").append(image);
		$(image).attr("data-location", "battle");
		$(image).removeClass("col-xs-3").addClass("col-md-10 col-md-offset-2 battle");
		hpIcon.addClass("battleHp").removeClass("campHp");
	}
	else if ($(image).attr("data-location") === "battle") {
		$("#teamCamp").append(image);
		$(image).attr("data-location", "camp");
		$(image).removeClass("col-md-10 col-md-offset-2 battle").addClass("col-xs-3");
		hpIcon.addClass("campHp").removeClass("battleHp");
	}
	else {
		alert("move fail");
	}
}

function beginBattle(hero) {
	$("#attackButton").css("display", "inline-block");
	var enemy = currentEnemy;
	var player = hero;
	$("#attackButton").on("click", function() {
		var damageDone = player.attk * player.level;
		currentEnemy.hp = currentEnemy.hp - damageDone;
		console.log(player + currentEnemy.hp);
		player.level++;
		var damageTaken = currentEnemy.counterAttack;
		player.hp = player.hp - damageTaken;
		redraw(hero);
	})
}

function endBattle() {
	$("#attackButton").css("display", "none");
}

function redraw(character) {
	var hp = $(".battle > h3");
	hp.text(character.hp);
	var enemyHp = $("#enemyField > h3");
	enemyHp.text(currentEnemy.hp);
}

function draw(characters) {
	var charNames = ["priest", "mage", "monk", "knight"]
	var hp = $(".camp > h3");
	for (var i = 0; i < 4; i++) {
		$(hp[i]).text(characters[charNames[i]].hp);
	}
}

draw(heroes);