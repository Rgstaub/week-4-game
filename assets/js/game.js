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

var chosenEmpty = true;
var opponentEmpty = true;
var currentEnemy = {};
var currentEnemyAvatar
var chosenHero = {};
var chosenHeroAvatar = {};
console.log("currentEnemy: " + currentEnemy.name);


$(".hero").on("click", function() {

	var clickedHero = $(this).attr("data-hero");
	var currHero = heroes[clickedHero];

	
	var heroPosition = $(this).attr("data-location");

	if (chosenEmpty === true && heroPosition === "camp") {
		chosenHero = currHero;
		chosenEmpty = false;
		move(this);
		currHero.state = "battling";
		console.log(this.id);
		$(this).children("img").attr("src", "assets/images/" + this.id + "Picked.png");
		chosenHeroAvatar = this;
		chosenHero = currHero;
		console.log(chosenHero);
		selectOpponent();
	}
	return;
	// else if ($(this).attr("data-location") === "battle") {
	// 	move(this);
	// 	empty = true;
	// 	endBattle();
	// }	
})

function selectOpponent() {
	// var clickedOpp = $(this).attr("data-hero");
	// console.log(clickedOpp);
	// var currOpp = heroes[clickedOpp];
	// console.log(currOpp);

	$(".camp").on("click", function() {
		var clickedOpp = $(this).attr("data-hero");

		var currOpp = heroes[clickedOpp];

		if (opponentEmpty === true) {
			currentEnemy = currOpp;
			console.log(currentEnemy);
			opponentEmpty = false;
			$("#enemyField").append(this);
			$(this).removeClass("col-xs-3 camp").addClass("col-md-10 col-md-offset-2 battle");
			$(this).children("h3").addClass("battleHp").removeClass("campHp");
			currentEnemyAvatar = this;
			beginBattle()
		}
	})
	return;
}


function move(image) {
	var hpIcon = $(image).children("h3");

	// if ($(image).attr("data-location") === "camp") {
		$("#chosenField").append(image);
		$(image).attr("data-location", "battle");
		$(image).removeClass("col-xs-3 camp").addClass("col-md-10 battle");
		hpIcon.addClass("battleHp").removeClass("campHp");
		return;
	// }
	// else if ($(image).attr("data-location") === "battle") {
	// 	$("#teamCamp").append(image);
	// 	$(image).attr("data-location", "camp");
	// 	$(image).removeClass("col-md-10 col-md-offset-2 battle").addClass("col-xs-3");
	// 	hpIcon.addClass("campHp").removeClass("battleHp");
	// }
	// else {
	// 	alert("move fail");
	// }
}

function beginBattle() {
	$("#attackButton").css("display", "inline-block");
	// var enemy = currentEnemy;
	// var player = chosenHero;
	$("#attackButton").on("click", function() {
		var damageDone = chosenHero.attk * chosenHero.level;
		console.log("damageDone: " + damageDone);
		currentEnemy.hp -= damageDone;
		console.log("enemy hp: " +currentEnemy.hp)
		chosenHero.level++;
		var damageTaken = currentEnemy.counterAttack;
		console.log("damage taken: " + damageTaken);
		chosenHero.hp -= damageTaken;
		console.log("hero hp: " + chosenHero.hp);
		redraw();
	})
}

function endBattle() {
	$("#attackButton").css("display", "none");
}

function redraw() {
	console.log(chosenHeroAvatar);
	console.log(currentEnemyAvatar);
	var chosenHp = $(chosenHeroAvatar).children("h3");
	console.log("chosenHP div: " + chosenHp);
	console.log("hero hp: " + chosenHero.hp);
	chosenHp.text(chosenHero.hp);
	var enemyHp = $(currentEnemyAvatar).children("h3");
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