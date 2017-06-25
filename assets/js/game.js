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
		"initHp": 250,
		"hp": 250,
		"attk": 4,
		"def": 75,
		"counterAttack": 20,
		"state": "resting",
		"level": 1,	
	},
	"mage": {
		"name": "mage",
		"initHp": 140,
		"hp": 140,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		"level": 1,	
	},
	"priest": {
		"name": "priest",
		"initHp": 100,
		"hp": 100,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		"level": 1,	
	},
	"monk": {
		"name": "monk",
		"initHp": 200,
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


$(".hero").off().on("click", function() {

	var clickedHero = $(this).attr("data-hero");
	var currHero = heroes[clickedHero];
	var heroPosition = $(this).attr("data-location");
	if (chosenEmpty === true && heroPosition === "camp") {
		chosenHero = currHero;
		chosenEmpty = false;
		$(".select")[0].play();
		move(this);
		currHero.state = "battling";
		console.log(this.id);
		$(this).children("img").attr("src", "assets/images/" + this.id + "Picked.png");
		chosenHeroAvatar = this;
		chosenHero = currHero;
		console.log(chosenHero);
		selectOpponent();
		return;
	}
})

function selectOpponent() {
	$(".camp").off().on("click", function() {
		var clickedOpp = $(this).attr("data-hero");
		var currOpp = heroes[clickedOpp];
		if (opponentEmpty === true) {
			currentEnemy = currOpp;
			$(".select")[0].play();
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

		$("#chosenField").append(image);
		$(image).attr("data-location", "battle");
		$(image).removeClass("col-xs-3 camp").addClass("col-md-10 battle");
		hpIcon.addClass("battleHp").removeClass("campHp");

}

function beginBattle() {
	$("#attackButton").css("display", "inline-block");
	$("#attackButton").off().on("click", function() {
		$(".sword")[Math.floor(Math.random() * 17)].play();
		var damageDone = chosenHero.attk * chosenHero.level;
		console.log("Damage done: " + damageDone);
		currentEnemy.hp -= damageDone;
		chosenHero.level++;
		if (currentEnemy.hp < 1) {
			nextEnemy();
			redraw();
			return;
		}
		var damageTaken = currentEnemy.counterAttack;
		chosenHero.hp -= damageTaken;
		if (chosenHero.hp < 1) {
			gameOver();
			return;
		}
		redraw();
	})
	return;
}

function gameOver() {
	endBattle();
	chosenEmpty = true;
	opponentEmpty = true;
	draw(heroes);

}


function nextEnemy() {
	$(currentEnemyAvatar).css("display", "none");
	opponentEmpty = true;
	endBattle();
	selectOpponent();
}

function endBattle() {
	$("#attackButton").css("display", "none");
}

function redraw() {
	var chosenHp = $(chosenHeroAvatar).children("h3");
	chosenHp.text(chosenHero.hp);
	var enemyHp = $(currentEnemyAvatar).children("h3");
	enemyHp.text(currentEnemy.hp);
	return;
}

function draw(characters) {
	var charNames = ["priest", "mage", "monk", "knight"]
	var hp = $(".hero > h3");
	for (var i = 0; i < 4; i++) {

		characters[charNames[i]].hp = characters[charNames[i]].initHp;
		$(hp[i]).text(characters[charNames[i]].initHp);
	}
	var allHeroes = $(".hero");
	var allTags = $(".hp")
	$(allHeroes).addClass("col-xs-3 camp").removeClass("col-md-10 col-md-offset-2 battle");
	$(allTags).addClass("campHp").removeClass("battleHp");
	$("#teamCamp").append(allHeroes);
	return;
}

draw(heroes);
