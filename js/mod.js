let modInfo = {
	name: "tVAVEGEt",
	author: "hyspace",
	pointsName: "Power",
	modFiles: [
		"layers/SPAF.js", 
		"layers/WEAW.js", 
		"tree.js"
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 24000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "A0.0.1",
	name: "not even a release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added all x elements.`

let winText = `Something is wrong`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getPointGen() {
    if (!canGenPoints()) 
		return new Decimal(0)

    let gain = new Decimal(1)
	
	 if (inChallenge("f", 11))
            gain = gain.div(10)

	 if (inChallenge("f", 12))
            gain = gain.div(100)

	 if (inChallenge("w", 11))
            gain = gain.div(1000)

	 if (inChallenge("w", 12))
            gain = gain.div(1e10)

	// boosts: p \\
    if (hasUpgrade("p", 11)) gain = gain.times(2)
    if (hasUpgrade("p", 12)) gain = gain.times(3)
    if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade("p", 15)) gain = gain.times(upgradeEffect('p', 15))
	if (hasUpgrade("p", 21)) gain = gain.times(upgradeEffect('p', 21))
	if (hasUpgrade("p", 22)) gain = gain.times(2)
	if (hasUpgrade("p", 31)) gain = gain.times(1.3)

	// boosts: f \\

	if (hasUpgrade("f", 11)) gain = gain.times(2)
	if (hasUpgrade("f", 12)) gain = gain.times(2)
	if (hasUpgrade("f", 23)) gain = gain.times(upgradeEffect("f", 23))
	if (player.f.ash.gt(0)) {
		gain = gain.times(player.f.ash.add(1).pow(0.25).add(2))
	}

	if (player.f.powerSB.gt(0)) {
		gain = gain.times(player.f.powerSB)
	}

	// boosts: w \\
	if (hasUpgrade("w", 11)) gain = gain.times(2)
	if (hasUpgrade("w", 12)) gain = gain.times(upgradeEffect("w", 12))
	if (hasUpgrade("w", 14))
        gain = gain.times(upgradeEffect("w", 14))

	// boosts: e \\
	if (hasUpgrade("e", 11)) gain = gain.times(2)
		
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}