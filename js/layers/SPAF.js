addLayer("p", {
    name: "Super Powers",
    symbol: "P",
    position: 0,

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },

    color: "#48ff00",
    requires: new Decimal(10),
    resource: "super powers",
    baseResource: "points",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.5,

    gainMult() {
       let mult = new Decimal(1)

       if (inChallenge("f", 12))
            mult = mult.div(50)

       // boosts: p \\

        if (hasUpgrade("p", 22))
            mult = mult.times(2)

        if (hasUpgrade("p", 23))
            mult = mult.times(upgradeEffect("p", 23))

        if (hasUpgrade("p", 24))
            mult = mult.times(upgradeEffect("p", 24))

        if (hasUpgrade("p", 25))
            mult = mult.times(2)

        if (hasUpgrade("p", 31))
            mult = mult.times(1.2)


        // boosts: f \\
        
        if (hasUpgrade("f", 12))
            mult = mult.times(2)

        if (player.f.ash.gt(0)) {
            mult = mult.times(player.f.ash.log10().add(1))
        }

        if (hasChallenge("f", 11))
            mult = mult.times(challengeEffect("f", 11))

        if (player.f.spowerSB.gt(0)) {
            mult = mult.times(player.f.powerSB)
        }


        // boosts: w \\
        if (hasUpgrade("w", 11))
            mult = mult.times(2)

        if (hasUpgrade("w", 14))
            mult = mult.times(upgradeEffect("w", 14))

        return mult

    },

    gainExp() {
        return new Decimal(1)
    },

    passiveGeneration() {
        if (hasUpgrade("f", 22))
            return 0.01

        return 0
    },
   

    upgrades: {
        11: {
            title: "Born to be a star",
            description: "By the power of ??? you have been created, with and INFINITY power of growing (2x Power)",
            cost: new Decimal(1),
            
        },

        12: {
            title: "Your first attempt",
            description: "Try destruct an paper, and fail... (3x Power)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("p", 11)}
        },

        13: {
            title: "Try use your powers again",
            description: "You've gained a power. To use it, imagine. (Super powers boost Power)",
            cost: new Decimal(3),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.5)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 12)}
        },

        14: {
            title: "Learn the basics!",
            description: "All things begin with Pona, this is the basic (Power boost Power)",
            cost: new Decimal(8),
            effect() {
                let eff = player.points.add(1).pow(0.1)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 13)}
        },

        15: {
            title: "Power Training",
            description: "Try incinerate a paper, you can't, try imagine better (Power boost Power)",
            cost: new Decimal(25),
            effect() {
                let eff = player.points.add(1).log10().add(1)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 14)}
        },

        21: {
            title: "Let there be light",
            description: "This is not just about fire or light... (Power boost Power again, but other formula)",
            cost: new Decimal(80),
            effect() {
                let eff = player.points.add(1).pow(0.25).div(2)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 15)}
        },

        22: {
            title: "Let there to be... Air?",
            description: "Ok, are you just getting stronger each second... (x2 Super Power and Power)",
            cost: new Decimal(125),

            unlocked() { return hasUpgrade("p", 21)}
        },

        23: {
            title: "Is this a eggxplosion?",
            description: "Hasta la vista... creation (Power boost Super Power)",
            cost: new Decimal(2000),

            effect() {
                let eff = player.points.add(1).log10().pow(0.3)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

            unlocked() { return hasUpgrade("p", 22)}
        },

        24: {
            title: "Last upgrade really matter?",
            description: "Baret is trying to put you a softcap (Super Powers boost Super Power)",
            cost: new Decimal(6000),

           effect() {
                let eff = player[this.layer].points.add(1).log10().pow(0.4)

                if (eff.gte(1e33)) {
                    eff = eff.div(1e33).pow(0.3).mul(1e33)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

            unlocked() { return hasUpgrade("p", 23)},
        },

        25: {
            title: "Who is Baret?",
            description: "The Original Celestial of limits (x2 Super Power)",
            cost: new Decimal(1e5),

            unlocked() { return hasUpgrade("f", 13)}
        },

        31: {
            description: "No title, my ideas get softcapped (x1.3 Power, x1.2 Super Power and x1.1 Fire)",
            cost: new Decimal(1e6),
            unlocked() { return hasUpgrade("f", 13)}
        },



    },


    row: 0,

    hotkeys: [
        {
            key: "p",
            description: "P: Reset for super power",
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        }
    ],

    layerShown() { return true }
})

//
//
// layer 2
//
//


addLayer("f", {
    name: "Fire",
    symbol: "F",
    position: 0,

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            ash: new Decimal(0),

            // "snapshot" boosts \\
            powerSB: new Decimal(0),
            spowerSB: new Decimal(0),
            fireSB: new Decimal(0),
            windSB: new Decimal(0),
            ashSB: new Decimal(0),
        }
    },

    effect() {
            let powerCalc = player.f.ash.add(1).pow(0.25);
            let superPowerCalc = player.f.ash.add(1).log10().add(1);

            return{
                power: powerCalc,
                superPower: superPowerCalc,
            }
        }, 

     tabFormat: {
    "Upgrades": { 
        content: ["main-display", "prestige-button", "blank", "upgrades"] 
    },

    "Challenges": { 
        unlocked() { return hasUpgrade("f", 14) }, 
        content: ["main-display", "blank", "challenges"] 
    },

    "Ash Pit": {
    unlocked() { 
        return hasUpgrade("f", 15) 
    },

    content: [
        "main-display",

        ["display-text", function() {
            return "Ash: " + format(player.f.ash)
        }],

        ["display-text", function() {
            return "Increasing Power by x" + format(tmp.f.effect.power) + " and Super Power by x" + format(tmp.f.effect.superPower)
        }],

        "blank",
        "buyables"
    ]
},

"Alle": {
    unlocked() { 
        return hasUpgrade("f", 24) 
    },

    content: [
        "main-display",
        "blank",
        "clickables"
    ]
},
},

    color: "#ff0000",
    requires: new Decimal(5e8),

    resource: "fire",
    baseResource: "points",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.5,

    gainMult() {
        let mult = new Decimal(1)
        // boosts: p \\
        
        if (hasUpgrade("p", 31))
            mult = mult.times(1.1)

        // boosts: f \\

        if (hasUpgrade("f", 21))
            mult = mult.times(2)

        if (hasChallenge("f", 12))
            mult = mult.times(2)

        if (player.f.fireSB.gt(0)) {
            mult = mult.times(player.f.fireSB)
        }

        if (player.f.ash.gt(0)) {
            mult = mult.times(player.f.ash.add(1).log10().pow(0.2))
        }

        // boosts: w \\

        if (hasUpgrade("w", 12))
            mult = mult.times(2)

        
    return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    upgrades: {
    11: {
        title: "One of four bases",
        description: "Fire is a basic 'Element' (x2 Power)",
        cost: new Decimal(1),
    },

    12: {
        title: "I hope you die in fire",
        description: "This is just a music...(x2 Super Power & Power)",
        cost: new Decimal(2),

        unlocked() { return hasUpgrade("f", 11) }
    },

    13: {
        title: "AI titles are so bad",
        description: "I am not a AI (Unlock Super Power u25 and u31)",
        cost: new Decimal(5),

        unlocked() { return hasUpgrade("f", 12) }
    },

    14: {
        title: "I believe in you",
        description: "Fire Challenges for fire powers (Unlock Fire Challenges)",
        cost: new Decimal(30),

        unlocked() { return hasUpgrade("f", 13) }
    },

    15: {
        title: "Wait, what are you doing",
        description: "You improving your fire without someone say to you make it? (Unlock Ash, in fire)",
        cost: new Decimal(100),

        unlocked() { return hasUpgrade("f", 14) }
    },

    21: {
        title: "Not bad",
        description: "After the ending of the flames, there is always a Ash (x2 Fire, x2 Ash)",
        cost: new Decimal(350),

        unlocked() { return hasUpgrade("f", 15) }
    },

    22: {
        title: "Think different and automagically",
        description: "(Automagically gain Super Power per second)",
        cost: new Decimal(550),

        unlocked() { return hasUpgrade("f", 21) }
    },

    23: {
        title: "Is this a real eggxplosion?",
        description: "Deja vu (Power boost Power)",
        cost: new Decimal(2000),

        effect() {
            let eff = player.points.add(10).log10().pow(0.3)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("f", 22)}
    },

    24: {
        title: "Alle",
        description: "(Unlock the Alle)",
        cost: new Decimal(1e7),

        unlocked() { return hasUpgrade("f", 23) }
    },

    25: {
        title: "Ashley loooooook at boost",
        description: "(Power boost Ash and Wind)",
        cost: new Decimal(1e8),

        effect() {
            let eff = player.points.add(1).log10().pow(0.75).add(1)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("f", 24)}
    },
},

    //  FIRE DECAY  \\
    update(diff) {
    if (player.f.ash === undefined)  player.f.ash = new Decimal(0)

    if (player.f.points.gt(0)) {

        let decay = new Decimal(0.05)

         if (hasChallenge("f", 12))
            decay = decay.sub(0.01)


         let loss = player.f.points.times(decay).times(diff)

        player.f.points = player.f.points.sub(loss)

        if (player.f.points.lt(1))
            player.f.points = new Decimal(1)
    }
},

    // FIRE CHALLENGES \\
    challenges: {
        11: {
            name: "Flame Powaaa",
            challengeDescription: "Power gain is divided by 10",
            goal: new Decimal(1e9),
            rewardDescription: "x3 Super Power",

            rewardEffect() {
                return new Decimal(3)
            }, 

            unlocked() {
                return hasUpgrade("f", 14)
            },
        },

        12: {
            name: "Infernal Flames<br> you will see :)",
            challengeDescription: "Power gain is divided by 1000 and super power by 50",
            goal: new Decimal(1.5e5),
            rewardDescription: "x2 Fire, Fire decay is 1% lower, and Fire boosts Ash",

            rewardEffect() {
                let eff = player.f.points.add(1).log10().add(1)

                return eff
            },

            rewardDisplay() { return format(this.rewardEffect())+"x"},

            unlocked() {
                return hasUpgrade("f", 14)
            },
        },

       
    },

    // ASH \\
    buyables: {
    11: {
        title: "Convert Fire to Ash",

        cost(x) {
            return new Decimal(30)
        },

        display() {
            return "Convert Fire into Ash<br>" +
                   "Cost: 30 Fire<br>" +
                   "Ash: " + format(player.f.ash)
        },

        canAfford() {
            return player.f.points.gte(this.cost())
        },


        buy() {

            // BOOSTS \\
            let gain = new Decimal(1)

            if (hasUpgrade("f", 21))
                gain = gain.times(2)

            if (hasUpgrade("w", 12))
                gain = gain.times(3)

            if (hasChallenge("f", 12))
                gain = gain.times(challengeEffect("f", 12))

             if (hasUpgrade("f", 25))
                gain = gain.times(upgradeEffect("f", 25)).div(10).add(1)

             if (hasUpgrade("w", 31))
                gain = gain.times(upgradeEffect("w", 31))

             if (player.f.ashSB.gt(0)) {
                gain = gain.times(player.f.ashSB)

            if (hasUpgrade("w", 33))
                gain = gain.times(8)
        }

            player.f.points = player.f.points.sub(this.cost())

            if (!player.f.ash)
                player.f.ash = new Decimal(0)


            player.f.ash = player.f.ash.add(gain)
        },
    }
},

   // ALLE \\ 
    clickables: {
    11: {
        display() { 
            return "The Power Alle gives you: x" + format(player[this.layer].powerSB || 1) + " Power. Next Alle with 75 Wind"
        },

        canClick() { return true },

        onClick() { 
            let exp = new Decimal(0.6)
            let eff = player.points.add(1).log10().pow(exp)

            if (hasChallenge("w", 12))
                exp = new Decimal(0.7)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            player[this.layer].powerSB = eff
        }
    },

    12: {
        display() { 
            return "The Super Power Alle gives you: x" + format(player[this.layer].spowerSB || 1) + " Super Power. Next Alle with 350 Wind"
        },

        canClick() { return true },

        onClick() { 
            let exp = new Decimal(0.6)
            let eff = player.points.add(1).log10().pow(exp)

            if (hasChallenge("w", 12))
                exp = new Decimal(0.7)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            player[this.layer].spowerSB = eff
        },

        unlocked() { return player.w.points.gte(75) }
    },

    13: {
        display() { 
            return "The Fire Alle gives you: x" + format(player[this.layer].fireSB || 1) + " Fire. Next Alle with 750 Wind"
        },

        canClick() { return true },

        onClick() { 
           let exp = new Decimal(0.6)
            let eff = player.points.add(1).log10().pow(exp)

            if (hasChallenge("w", 12))
                exp = new Decimal(0.7)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            player[this.layer].fireSB = eff
        },

        unlocked() { return player.w.points.gte(350) }
    },

    14: {
        display() { 
            return "The Wind Alle gives you: x" + format(player[this.layer].windSB || 1) + " Wind. Next Alle with x Wind"
        },

        canClick() { return true },

        onClick() { 
            let exp = new Decimal(0.6)
            let eff = player.points.add(1).log10().pow(exp)

            if (hasChallenge("w", 12))
                exp = new Decimal(0.7)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            player[this.layer].windSB = eff
        },

        unlocked() { return player.w.points.gte(750) }
    },

    15: {
        display() { 
            return "The Ash Alle gives you: x" + format(player[this.layer].ashSB || 1) + " Ash. Next Alle with a Wind Upgrade"
        },

        canClick() { return true },

        onClick() { 
            let exp = new Decimal(0.7)
            let eff = player.points.add(1).log10().pow(exp)

            if (hasChallenge("w", 12))
                exp = new Decimal(0.8)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            player[this.layer].ashSB = eff
        },

        unlocked() { return hasUpgrade("w", 32) }
    },
},

    row: 1,

    hotkeys: [
        {
            key: "f",
            description: "F: Reset for fire",
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        }
    ],

    layerShown() {
        return player.points.gte(5e8) || player.f.unlocked
    }
})