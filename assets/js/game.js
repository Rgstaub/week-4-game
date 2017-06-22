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

var knightStats = ["Bast", "knight", 250, 2, 50, 20, false, "knight.png"];
var mageStats = ["Denna", "mage", 100, 4, 25, 40, true, "mage.png"];
var priestStats = ["Auri", "priest", 130, 3, 15, 50, true, "priest.png"];
var monkStats = ["Tempi", "monk", 160, 3, 45, 45, false, "monk.png"];
var slimeStats = ["Slime", "enemy", 80, 2, 10, 20, false];
var trollStats = ["Troll", "enemy", 150, 4, 15, 35, false];

var openCampSpot = 3;
var campSpots = [$("#tc1"), $("#tc2"), $("#tc3"), $("#tc4")];

function Hero(stats) {
	this.name = stats[0];
	this.charClass = stats[1];
	this.hp = stats[2];
	this.baseAttk = stats[3];
	this.def = stats[4];
	this.counterAttack = stats[5];
	this.range = stats[6];
	this.position = $("#teamCamp");
	this.divId = this.charClass + "Div";
	console.log(this.divId);
	this.img = "<div class='col-xs-3 hero' id='" + this.charClass + "Div'><img id='" + this.charClass + "Image' class='hero' src='assets/images/" + this.charClass + ".png' alt='" + this.charClass + ".png'></div>";
	console.log(this.img);
	this.start = function() {
		$("#teamCamp").append(this.img);
	}
	this.toCamp = function() {
		relocate(this.divId);
		console.log(this.divId);
		$("#teamCamp").append(this.img);
		this.position = $("#teamCamp");
	}
	this.toBattle = function() {
		relocate(this.divId);
		console.log(this.divId);
		$("#battlefield").append(this.img);
		this.position = $("#battlefield");
	}
}

function relocate(divId) {
	console.log(divId);
	$('#' +divId).remove();
}



var mage = new Hero(mageStats);
var knight = new Hero(knightStats);
var priest = new Hero(priestStats);
var monk = new Hero(monkStats);

knight.start();
mage.start();
priest.start();
monk.start();

$(".hero").on("click", function() {
	console.log(this.charClass);
	console.log(this);
	if (this.position === $("#teamCamp")) {
		this.toBattle();
	}
	else if (this.position === $("#battlefield")) {
		this.toCamp();
	}
	else {
		console.log("movement error");
	}
})