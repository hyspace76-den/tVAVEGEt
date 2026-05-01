addLayer("w", {
    name: "Wind",
    symbol: "W",
    position: 2,
    branches: ["p"],

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            boostActive: false,
            superBoostActive: false,
            windBoostActive: false,

            
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
        ["upgrades", [3, 4]],
        "blank",
        "clickables"
    ]
},
},

    color: "#d7d7d7",
    requires: new Decimal(2.5e16),

    resource: "wind flows",
    baseResource: "powers",
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

        // boosts: w \\
        if (player.w && player.w.windBoostActive)
        mult = mult.times(player.w.points.add(1).log10().add(1).pow(0.7))


        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    upgrades: {
    11: {
        title: "Two of four bases",
        description: "This feels as new winds (x2 Super Power and Power)",
        cost: new Decimal(1),
        unlocked() { return true }
    },

    12: {
        title: "Thaya, the Celestial of Wind",
        description: "(x2 Fire and x3 Ash, also Fire boost Power)",
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
        title: "No, Celestial is not equal to Original Celestials",
        description: "(Wind boosts Power)",
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
        title: "Is not something to kill, wind is... wind",
        description: "(Wind boosts Power and Super Power)",
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
        description: "(Wind boosts Power and Super Power)",
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
        title: "Wind is strong, or Fire is weak?",
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
            currencyInternalName: "ash",
            currencyLayer: "f",
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
        title: "Owtia is getting weaker",
        description: "(You don't lose fire per second (tbh, -4% of the loss per second))",

        cost() {
            return new Decimal(1e44)
        },

        currencyDisplayName: "powers",
        currencyInternalName: "points",

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
        title: "Power upgrade",
        description: "(Unlock a new Power Upgrade, and x3 Fire and Ash)",

        cost() {
            return new Decimal(1)
        },

        currencyDisplayName: "powers",
        currencyInternalName: "points",

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

    42: {
        title: "Timewall :( ",
        description: "(log10(Ash+1) boost Ash, and also, Power effect is 1.3 times higher)",

        cost() {
            return new Decimal(1e50)
        },

        currencyDisplayName: "powers",
        currencyInternalName: "points",

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

    43: {
        title: "Let's do new challenges?",
        description: "(x16 Power, and unlock new challenges)",

        cost() {
            return new Decimal(1e12)
        },

        currencyDisplayName: "ashes",
        currencyInternalName: "ash",
        currencyLayer: "f",

        canAfford() {
            return player.f.ash.gte(this.cost())
        },

        pay() {
            player.f.ash = player.f.ash.sub(this.cost())
        },

        unlocked() { 
            return hasUpgrade("e", 21) 
        }  
    },

    44: {
        title: "Another free one for you",
        description: "(Gain 1% Fire per second, and 10 Ash)",

        cost() {
            return new Decimal(1)
        },

        currencyDisplayName: "ashes",
        currencyInternalName: "ash",
        currencyLayer: "f",


        effect() { 
            let eff = 0.01

            return eff
        },

        canAfford() {
            return player.f.ash.gte(this.cost())
        },

        pay() {
            player.f.ash = player.f.ash.sub(this.cost())
        },

        unlocked() { 
            return hasUpgrade("e", 22) 
        }  
    },

    45: {
        title: "You need to learn more...?",
        description: "(Power boost Fire and Ash)",

        cost() {
            return new Decimal(1)
        },

        currencyDisplayName: "ashes",
        currencyInternalName: "ash",
        currencyLayer: "f",

        canAfford() {
            return player.f.ash.gte(this.cost())
        },

        effect() { 
            let eff = player.points.add(1).pow(0.5).log(6).add(1)

            return eff
        },

        effectDisplay() { 
            return format(upgradeEffect(this.layer, this.id)) + "x, " + format(player.points.add(1).log10().pow(0.2)) + "x"
        },

        pay() {
            player.f.ash = player.f.ash.sub(this.cost())
        },

        unlocked() { 
            return hasChallenge("e", 11) 
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
            style() {
                return {
                    'background': 'linear-gradient(145deg, #f5f7fa, #d2d9e6)',
                    'color': '#1a1a1a',
                    'border': '4px solid #c8d1df',
                    'box-shadow': '0 0 18px rgba(173, 181, 196, 0.45)',
                }
            },

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
            style() {
                return {
                    'background': 'linear-gradient(145deg, #f8fbff, #d7e2f0)',
                    'color': '#151515',
                    'border': '4px solid #d3dce8',
                    'box-shadow': '0 0 18px rgba(170, 181, 195, 0.45)',
                }
            },
            unlocked() { return true },
        },

        
       
    },

    clickables: {
        11: {
            display() {
                let effect = player.points.add(1).log10().add(1).pow(0.7)
                return player.w.boostActive ? "Power Verkoel is on (x" + format(effect) + " Powers)" : "Power Verkoel is off"
            },
            canClick() {
                return true
            },
            onClick() {
                player.w.superBoostActive = false
                player.w.windBoostActive = false
                player.f.boostActive = false
                player.e.boostActive = false
                player.w.boostActive = !player.w.boostActive
            },
            style() {
                return {
                    'background-color': player.w.boostActive ? '#f6f6f6' : '#b7b7b7',
                    'color': 'black',
                    'border-radius': '10px',
                    'width': '150px',
                    'height': '50px',
                    'font-size': '16px'
                }
            }
        },

        12: {
            display() {
                let effect = player.p.points.add(1).log10().add(1).pow(0.7)
                return player.w.superBoostActive ? "Super Power Verkoel is on (x" + format(effect) + " Super Power)" : "Super Power Verkoel is off"
            },
            canClick() {
                return true
            },
            onClick() {
                player.w.boostActive = false
                player.w.windBoostActive = false
                player.f.boostActive = false
                player.e.boostActive = false
                player.w.superBoostActive = !player.w.superBoostActive
            },
            style() {
                return {
                    'background-color': player.w.superBoostActive ? '#f6f6f6' : '#b7b7b7',
                    'color': 'black',
                    'border-radius': '10px',
                    'width': '150px',
                    'height': '50px',
                    'font-size': '16px'
                }
            }
        },

        13: {
            display() {
                let effect = player.f.points.add(1).log10().add(1).pow(0.7)
                return player.f.boostActive ? "Fire Verkoel is on (x" + format(effect) + " Fire)" : "Fire Verkoel is off"
            },
            canClick() {
                return true
            },
            onClick() {
                player.w.boostActive = false
                player.w.superBoostActive = false
                player.w.windBoostActive = false
                player.e.boostActive = false
                player.f.boostActive = !player.f.boostActive
            },
            style() {
                return {
                    'background-color': player.f.boostActive ? '#f6f6f6' : '#b7b7b7',
                    'color': 'black',
                    'border-radius': '10px',
                    'width': '150px',
                    'height': '50px',
                    'font-size': '16px'
                }
            }
        },

        14: {
            display() {
                let effect = player.w.points.add(1).log10().add(1).pow(0.7)
                return player.w.windBoostActive ? "Wind Verkoel is on (x" + format(effect) + " Wind)" : "Wind Verkoel is off"
            },
            canClick() {
                return true
            },
            onClick() {
                player.w.boostActive = false
                player.w.superBoostActive = false
                player.f.boostActive = false
                player.e.boostActive = false
                player.w.windBoostActive = !player.w.windBoostActive
            },
            style() {
                return {
                    'background-color': player.w.windBoostActive ? '#f6f6f6' : '#b7b7b7',
                    'color': 'black',
                    'border-radius': '10px',
                    'width': '150px',
                    'height': '50px',
                    'font-size': '16px'
                }
            }
        },

        15: {
            display() {
                let effect = player.e.points.add(1).log10().add(1).pow(0.7)
                return player.e.boostActive ? "Earth Verkoel is on (x" + format(effect) + " Earth)" : "Earth Verkoel is off"
            },
            canClick() {
                return true
            },
            onClick() {
                player.w.boostActive = false
                player.w.superBoostActive = false
                player.w.windBoostActive = false
                player.f.boostActive = false
                player.e.boostActive = !player.e.boostActive
            },
            style() {
                return {
                    'background-color': player.e.boostActive ? '#f6f6f6' : '#b7b7b7',
                    'color': 'black',
                    'border-radius': '10px',
                    'width': '150px',
                    'height': '50px',
                    'font-size': '16px'
                }
            }
        }
    },

    row: 1,

    layerShown() {
        return hasUpgrade("f", 25) || player.w.unlocked
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
    branches: ["p"], 

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            boostActive: false,
            challenge11Unlocked: false,
        }
    },

    color: "#a54a00",
    requires: new Decimal(4e34),

    resource: "dirts",
    baseResource: "powers",
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

    "Challenges": {
        unlocked() { return true },
        content: ["main-display", "blank", "challenges"]
    },

    },

    gainMult() {
       let mult = new Decimal(1)

        if (hasChallenge("p", 12))
            mult = mult.times(5)

       
	    if (player.e && player.e.boostActive)
            mult = mult.times(player.e.points.add(1).log10().add(1).pow(0.7))

       return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    upgrades: {
        11: {
            title: "Earth, the third element of the four ones",
            description: "(x2 Power and unlock a Fire and a Wind Upgrade)",
            cost: new Decimal(1),
        },

        12: {
            title: "Asase is the Celestial of Earth",
            description: "Early buff and also a challenge buff (Super Power gen is better and unlock a new Super Power Upgrade)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("e", 11) }
        },

        13: {
            title: "Cost jump...",
            description: "(Keep Super Power Upgs on resets)",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("e", 12) }
        },

        14: {
            title: "Now the resets are faster and not stronger",
            description: "(Unlock new luchts upgrades per Earth upgrade, and keep challenges completed)",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("e", 13) }
        },

        15: {
            title: "Passive scaling",
            description: "(Power boost Power again (it have a softcap at 1), keep fire upgrades buyed, and an extra lucht upgrade)",
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

         21: {
            title: "Basically nothing",
            description: "(x2 Power, go check Lucht in wind)",
            cost: new Decimal(1e5),
            unlocked() { return hasUpgrade("e", 15) }
        },

        22: {
            title: "All you want is a new<br> upgrade or feature",
            description: "(Go check Lucht for the 7th upgrades)",
            cost: new Decimal(3e7),
            unlocked() { return hasUpgrade("e", 21) }
        },
    },

    challenges: {
        11: {
            name: "Earth is Fire",
            challengeDescription: "If you think Earth is weak... (DONT ENTER ANY OTHER CHALLENGE)",
            goal: new Decimal(1e26),
            currencyLayer: "f",
            currencyInternalName: "points",
            currencyDisplayName: "flames",
            rewardDescription: "You will unlock the last Lucht upgrade",
            style() {
                return {
                    'background': 'linear-gradient(145deg, #9fa67a, #3d2f14)',
                    'color': '#f3f0d8',
                    'border': '4px solid #b9a675',
                    'box-shadow': '0 0 18px rgba(143, 132, 94, 0.45)',
                }
            },

            onEnter() {},
            
            unlocked() {
                if (player.e.challenge11Unlocked) return true
                if (player.points.gte(new Decimal("1e54")) && player.f.points.gte(new Decimal("1e26"))) {
                    player.e.challenge11Unlocked = true
                    return true
                }
                return false
            },
        },
       
    },

    doReset(resettingLayer) {
    if (resettingLayer === "e") {
        let savedChallenge11Flag = player.e.challenge11Unlocked
        
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
        
        player.e.challenge11Unlocked = savedChallenge11Flag
    }
},

    row: 1,
    layerShown() { return hasUpgrade("w", 14) || player.e.unlocked }
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