addLayer("w", {
    name: "Wind",
    symbol: "W",
    position: 2,

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

     tabFormat: {
    "Upgrades": { 
        content: ["main-display", "prestige-button", "blank", ["upgrades", [1, 2]]] 
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
        ["upgrades", [3, 4]]
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

    15: {
        title: "Yes have difference",
        description: "(Wind boosts Power and Super Power as the same formula of previous upgrade)",
        cost: new Decimal(1),

        effect() {
            let eff = player.w.points.add(1).pow(0.25).div(10).add(2)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("e", 11)}
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
        title: "Powering Ash to hundred milions",
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
    },

    34: {
        title: "Next Layer at 1e36 Power",
        description: "(Ash boost Power a bit better)",

        cost() {
            return new Decimal(5e9)
        },

        unlocked() { 
            return hasUpgrade("w", 33) 
        }
    },

    35: {
        title: "Next unlock is unexpected",
        description: "(You don't lose fire per second (tbh, -4% of the loss per second))",

        cost() {
            return new Decimal(1e44)
        },

        currencyDisplayName: "powers",

        canAfford() {
            return player.points.gte(this.cost())
        },

        pay() {
            player.points = player.points.sub(this.cost())
        },

        unlocked() { 
            return hasUpgrade("e", 14) 
        }  
    },

    41: {
        title: "1 Power upgrade",
        description: "(Unlock a new Power Upgrade, and x3 Fire and Ash)",

        cost() {
            return new Decimal(1)
        },

        currencyDisplayName: "powers",

        canAfford() {
            return player.points.gte(this.cost())
        },

        pay() {
            player.points = player.points.sub(this.cost())
        },

        unlocked() { 
            return hasUpgrade("e", 15) 
        }  
    },
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
            goal: new Decimal(30),
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


addLayer("e", {
    name: "Earth",
    symbol: "E",
    position: 3,

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    color: "#a54a00",
    requires: new Decimal(4e34),

    resource: "earth",
    baseResource: "points",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.3,

    effect() {
            let power2Ea = player.e.points.add(1).pow(0.5).add(1);

            let sPower2Ea = player.e.points.add(1).log10().add(1);

            return {
                power: power2Ea,
                superPower: sPower2Ea,
            }
        },

    tabFormat: {
    "Upgrades": {

        content: [
        "main-display",
        "prestige-button",
        ["display-text", function() {
            return "You have " + format(player.e.points + " earth.")
        }],

        ["display-text", function() {
            return "Which is increasing Power by x" + format(tmp.e.effect.power) + ", and Super Power by x" + format(tmp.e.effect.superPower + ".")
        }],
        "blank",
        "upgrades"
    ]

    },

    },

    gainMult() {
       let mult = new Decimal(1)

       return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    upgrades: {
        11: {
            title: "Earth, the third element of the four ones",
            description: "There is no difference, prefer buy this (x2 Power and unlock a Fire and a Wind Upgrade)",
            cost: new Decimal(1),
        },

        12: {
            title: "Slow like a turtle...",
            description: "Early buff and also a challenge buff (+1 Super Power gen and unlock Super Power Upgrade)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("e", 11) }
        },

        13: {
            title: "Scaling ++",
            description: "(Keep Super Power Upgs)",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("e", 12) }
        },

        14: {
            title: "Scaling +++",
            description: "(Unlock new luchts upgrades, per Earth upgrade, and keep challenges completed)",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("e", 13) }
        },

        15: {
            title: "Passive scaling",
            description: "(Power boost Power again (it have a softcap at 1), keep fire upgrades unlocked)",
            cost: new Decimal(5000),

            effect() {
            let eff = player.points.add(1).pow(0.25).add(1)

            if (eff.gt(1)) {
                eff = eff.div(1).pow(0.5).mul(1)
            }

            if (eff.gt(1e5)) {
                eff = eff.div(1e5).pow(0.5).mul(1e5)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

            unlocked() { return hasUpgrade("e", 14) }
        },
    },

    doReset(resettingLayer) {
    if (resettingLayer === "e") {
        
        let keepP = []
        if (hasUpgrade("e", 13)) keepP.push("upgrades")
        layerDataReset("p", keepP)

        
        let keepF = []
        if (hasUpgrade("e", 15)) keepF.push("upgrades")
        if (hasUpgrade("e", 14)) keepF.push("challenges") 
        layerDataReset("f", keepF)

       
        let keepW = []
        if (hasUpgrade("e", 14)) keepW.push("challenges")
        layerDataReset("w", keepW)
    }
},

    row: 1,
    layerShown() { return player.points.gte(4e34) || player.e.unlocked }
})


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