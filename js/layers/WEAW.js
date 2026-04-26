addLayer("w", {
    name: "Wind",
    symbol: "W",
    position: 1,

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            activeNodes: []
        }
    },

     tabFormat: {
    "Upgrades": { 
        content: ["main-display", "prestige-button", "blank", ["upgrades", [1], [2]]] 
    },

    "Challenges": { 
        unlocked() { return true }, 
        content: ["main-display", "blank", "challenges"] 
    },

    "Lucht": {
    unlocked() { return hasChallenge("w", 11) },

    content: [
        "main-display",
        "blank",
        ["upgrades", [3]]
    ]
},
},

    color: "#d7d7d7",
    requires: new Decimal(2.5e16),

    resource: "wind",
    baseResource: "points",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.5,

    gainMult() {
        let mult = new Decimal(1)

        // boosts: f \\

        if (player.f.windSB.gt(0)) {
		    mult = mult.times(player.f.windSB)
	    }

        if (hasUpgrade("f", 25))
            mult = mult.times(upgradeEffect("f", 25))


        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    upgrades: {
    11: {
        title: "Two of four bases",
        description: "This feels as new winds :) (x2 Super Power and Power)",
        cost: new Decimal(1),
        visibility() { return player.w.tab === "Upgrades" }
    },

    12: {
        title: "To the repeat and beyond",
        description: "Wind can skyrocket your Power if you imagine correctly (x2 Fire and x3 Ash, also Fire boost Power)",
        cost: new Decimal(5),

        effect() {
            let eff = player.f.points.add(1).pow(0.25).div(10).add(2)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("w", 11)}
    },

    13: {
        title: "Wind don't matter?",
        description: "(Wind boosts Power as the same formula of previous upgrade, feel the power)",
        cost: new Decimal(30),

        effect() {
            let eff = player.w.points.add(1).pow(0.25).div(10).add(2)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("w", 12)}
    },

    14: {
        title: "Regrind it",
        description: "(Wind boosts Power and Super Power as the same formula of previous upgrade)",
        cost: new Decimal(4e5),

        effect() {
            let eff = player.w.points.add(1).pow(0.25).div(10).add(2)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("w", 13)}
    },

    31: {
        title: "Wind is important, or I just don't like Fire?",
        description: "(Wind boosts Ash and Ash boost Fire)",
        cost: new Decimal(1e5),

        effect() {
            let eff = player.w.points.add(1).pow(0.1).add(1)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { 
            return format(upgradeEffect(this.layer, this.id))+"x, " + 
                   format(player.f.ash.add(1).log10().pow(0.2)) + "x"
        },

        unlocked() { return hasUpgrade("w", 14)}
    },

    32: {
        title: "Powering Ash to milions",
        description: "(Unlock a new Alle)",
        cost: new Decimal(1e6),

        unlocked() { return hasUpgrade("w", 31) }
    },

    33: {
        title: "Powering gain to decilions",
        description: "(Ash gain is 8 times higher, wait for something big...)",

        cost() {
            return new Decimal(1e6)
        },

        currencyDisplayName: "ash",

        canAfford() {
            return player.f.ash.gte(this.cost())
        },

        pay() {
            player.f.ash = player.f.ash.sub(this.cost())
        },

        unlocked() { 
            return hasUpgrade("w", 32) 
        }
    }
},


    // CHALLENGES \\
    challenges: {
        11: {
            name: "Take some wind",
            challengeDescription: "You should attempt, this challenge is not about what do, think after it, reset almost everything in fire, also /1000 Power",
            goal: new Decimal(1e6),
            rewardDescription: "Unlock Lucht", 

            onEnter() {
                player.points = new Decimal(10)
                player.p.points = new Decimal(0)
                player.f.points = new Decimal(0)
                player.f.ash = new Decimal(0)
                player.f.upgrades = []
                player.p.upgrades = []
            },

            unlocked() { return true },
        },

        12: {
            name: "Have you tried<br> to translate names?",
            challengeDescription: "same as before, but don't reset anything in fire, and /1e10 Power",
            goal: new Decimal(12.75),
            rewardDescription: "Introduce soft cap in game, but also, better a bit, some gains of almost all Alles", 

            unlocked() { return true },
        },
       
    },


    row: 1,

    layerShown() {
        return player.points.gte(2.5e16) || player.w.unlocked
    }
})


//
//
// layer 3
//
//


//add


//
//
// layer 4
//
//


//add


//
//
// layer 5
//
//