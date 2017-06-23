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

// Declare the pre-built character starting stat sets using a multi-dimensional array
// var characterStats = ["knight", "enemy"];


// var knightStats = ["Bast", "knight", 250, 2, 50, 20, false, "knight.png"];
// var mageStats = ["Denna", "mage", 100, 4, 25, 40, true, "mage.png"];
// var priestStats = ["Auri", "priest", 130, 3, 15, 50, true, "priest.png"];
// var monkStats = ["Tempi", "monk", 160, 3, 45, 45, false, "monk.png"];
// var slimeStats = ["Slime", "enemy", 80, 2, 10, 20, false];
// var trollStats = ["Troll", "enemy", 150, 4, 15, 35, false];

// function Hero(stats) {
// 	var that = this;
// 	this.name = stats[0];
// 	this.charClass = stats[1];
// 	this.hp = stats[2];
// 	this.baseAttk = stats[3];
// 	this.def = stats[4];
// 	this.counterAttack = stats[5];
// 	this.range = stats[6];
// 	this.position = "teamCamp";
// 	this.divId = this.charClass + "Div";
// 	this.img = "<div class='col-xs-3 hero' id='" + this.charClass + "Div'><img id='" + this.charClass + "Image' src='assets/images/" + this.charClass + ".png' alt='" + this.charClass + ".png'></div>";
// 	var image = this.img;

// 	this.toCamp = function() {
// 		relocate(this.divId);
// 		console.log(this.divId);
// 		$("#teamCamp").append(this.img);
// 		this.position = $("#teamCamp");
// 	}
// 	this.toBattle = function() {
// 		relocate(this.divId);
// 		console.log(this.divId);
// 		$("#battlefield").append(this.img);
// 		this.position = $("#battlefield");
// 	}
// 	this.initialize = function() {
// 		$("#teamCamp").append(this.img);
// 		$(".hero").click(function() {
// 			console.log(this);
// 			console.log(that);
// 		// 	relocate(that);

// 		});
// 	}
// }

// function relocate(hero) {
// 	console.log(hero);
// 	console.log(hero.position);
// 	if (hero.position === "teamCamp") {
// 		console.log("to battle. currently at " + hero.position);
// 		console.log(hero.divId);
// 		$("'#" + hero.divId + "'").remove();
// 		$("#battlefield").append(hero.img);

// 	}
// 	else if (hero.position === "battlefield") {
		
// 	}
// 	else {
		
// 	}
//

// var mage = new Hero(mageStats);
// var knight = new Hero(knightStats);
// var priest = new Hero(priestStats);
// var monk = new Hero(monkStats);

// knight.initialize();
// mage.initialize();
// priest.initialize();
// monk.initialize();

// $(".hero").click(function() {

// 	console.log(this);



// 			// console.log(this);
// 			// console.log(that);
// 			// relocate(that);

// });
// var knightStats = ["Bast", "knight", 250, 2, 50, 20, false, "knight.png"];
// var mageStats = ["Denna", "mage", 100, 4, 25, 40, true, "mage.png"];

var heroes = {
	"knight": {
		"hp": 250,
		"attk": 4,
		"def": 75,
		"counterAttack": 20,
		"state": "resting",
		
	},
	"mage": {
		"hp": 100,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		
	},
	"priest": {
		"hp": 100,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		
	},
	"monk": {
		"hp": 100,
		"attk": 15,
		"def": 25,
		"counterAttack": 40,
		"state": "resting",
		
	},
}

var enemies = {
	"minataur": {
		"hp": 250,
		"attk": 4,
		"def": 75,
		"counterAttack": 20,
	},
	"warlock": {
		"hp": 250,
		"attk": 4,
		"def": 45,
		"counterAttack": 20,	
	},
}

var empty = true;
var currentEnemy = enemies["minataur"]
console.log(currentEnemy);

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
	if ($(image).attr("data-location") === "camp") {
		$("#battlefield").append(image);
		$(image).attr("data-location", "battle");
		$(image).removeClass("col-xs-3").addClass("col-xs-10 col-xs-offset-2");
	}
	else if ($(image).attr("data-location") === "battle") {
		$("#teamCamp").append(image);
		$(image).attr("data-location", "camp");
		$(image).removeClass("col-xs-10 col-xs-offset-2").addClass("col-xs-3");
	}
	else {
		alert("fail");
	}
}

function beginBattle(hero) {
	$("#attackButton").css("display", "inline-block");
	var enemy = currentEnemy;
	var player = hero;
	$("#attackButton").on("click",)

}

function endBattle() {
	$("#attackButton").css("display", "none");
}