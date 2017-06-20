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

var knightStats = ["Bast", "knight", 250, 2, 50, 20, false];
var mageStats = ["Denna", "mage", 100, 4, 25, 40, true];
var priestStats = ["Auri", "priest", 130, 3, 15, 50, true];
var monkStats = ["Tempi", "monk", 160, 3, 45, 45, false];
var slimeStats = ["Slime", "enemy", 80, 2, 10, 20, false];
var trollStats = ["Troll", "enemy", 150, 4, 15, 35, false];


// A funtion to assign properties to each character
// function character(name, charClass, hp, baseAttk, def, counterAttack, range) {
// 	this.name = name;
// 	this.charClass = charClass;
// 	this.hp = hp;
// 	this.baseAttk = baseAttk;
// 	this.def = def;
// 	this.counterAttack = counterAttack;
// 	this.range = range;
// }

// var Knight = new character("Bast", "knight", 250, 2, 45, 20, false);
// var Mage = new character("Denna", "mage", 100, 4, 25, 40, true);
// var Priest = new character("Auri", "priest", 130, 3, 15, 50, true);
// var Monk = new character("Tempi", "monk", 160, 3, 45, 45, false);
// var Troll = new character("Troll", "enemy", 150, 4, 15, 35, false);
// var Slime = new character("Slime", "enemy", 80, 2, 10, 20, false);

// function Hero(job) {
// 	$(this).html("<div><img id='monkImage' src='assets/images/mage.png' alt='mage'></div>");
// 	$(this).addClass("hero alive active col-xs-3");
// 	$(this).attr('id', job);
// 	console.log(this);
// 	var pic = $('<img id="monkImage" src="assets/images/mage.png" alt="mage">');
// 	$('#teamCamp').append(this);
// }
// var monk = new Hero("monk");
// var heroes = ['knight', 'mage', 'priest', 'monk']

// var knight = $("<div>");
// knight.addClass("hero alive active col-xs-3");
// knight.attr('id', 'knight');
// $('#teamCamp').append(knight);
// console.log(knight);
// var knightPic = $('<img id="knightImage" src="assets/images/knight.png" alt="knight">');
// knight.append(knightPic);

// var mage = $("<div>");
// mage.addClass("hero alive active col-xs-3");
// mage.attr('id', 'mage');
// $('#teamCamp').append(mage);
// console.log(mage);
// var magePic = $('<img id="mageImage" src="assets/images/mage.png" alt="mage">');
// mage.append(magePic);

// var priest = $("<div>");
// priest.addClass("hero alive active col-xs-3");
// priest.attr('id', 'priest');
// $('#teamCamp').append(priest);
// console.log(priest);
// var priestPic = $('<img id="priestImage" src="assets/images/priest.png" alt="priest">');
// priest.append(priestPic);

// var monk = $("<div>");
// monk.addClass("hero alive active col-xs-3");
// monk.attr('id', 'monk');
// $('#teamCamp').append(monk);
// console.log(monk);
// var monkPic = $('<img id="monkImage" src="assets/images/monk.png" alt="monk">');
// monk.append(monkPic);

function Hero(stats) {
	this.name = stats[0];
	this.charClass = stats[1];
	this.hp = stats[2];
	this.baseAttk = stats[3];
	this.def = stats[4];
	this.counterAttack = stats[5];
	this.range = stats[6];
	console.log(this);
}

var mage = new Hero(mageStats);
var knight = new Hero(knightStats);

var magePic = $('<div><img class="heroPic" src="assets/images/mage.png" alt="mage"></div>');
magePic.addClass("hero alive active col-xs-3");
$('#teamCamp').append(magePic);




