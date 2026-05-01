addLayer("p", {
    name: "Super Powers",
    symbol: "P",
    position: 0,

    tabFormat: {
    "Upgrades": { 
        content: ["main-display", "prestige-button", "blank", "upgrades"] 
    },

    "Challenges": { 
        unlocked() { return hasUpgrade("w", 43) }, 
        content: ["main-display", "blank", "challenges"] 
    },
},

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },

    color: "#48ff00",
    requires: new Decimal(10),
    resource: "super powers",
    baseResource: "power",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.5,

    gainMult() {
       let mult = new Decimal(1)

       if (inChallenge("f", 12))
            mult = mult.div(40)

       // boosts: p \\

        if (hasUpgrade("p", 22))
            mult = mult.times(2)

        if (hasUpgrade("p", 23) && upgradeEffect("p", 23)) {
            let eff = upgradeEffect("p", 23)
            if (eff && eff.gt(0))
                mult = mult.times(eff)
        }

        if (hasUpgrade("p", 24) && upgradeEffect("p", 24)) {
            let eff = upgradeEffect("p", 24)
            if (eff && eff.gt(0))
                mult = mult.times(eff)
        }

        if (hasUpgrade("p", 25))
            mult = mult.times(2)

        if (hasUpgrade("p", 31))
            mult = mult.times(1.2)

        if (hasUpgrade("p", 41))
            mult = mult.times(3)


        // boosts: f \\
        
        if (hasUpgrade("f", 12))
            mult = mult.times(2)

        if (player.f && player.f.ash && player.f.ash.gt(0)) {
            mult = mult.times(player.f.ash.log10().add(1))
        }

        if (hasChallenge("f", 11))
            mult = mult.times(challengeEffect("f", 11))

        if (player.f && player.f.spowerSB && player.f.spowerSB.gt(0)) {
            mult = mult.times(player.f.spowerSB)
        }


        // boosts: w \\
        if (hasUpgrade("w", 11))
            mult = mult.times(2)

        if (hasUpgrade("w", 14) && upgradeEffect("w", 14)) {
            let eff = upgradeEffect("w", 14)
            if (eff && eff.gt(0))
                mult = mult.times(eff)
        }

        if (hasUpgrade("w", 15) && upgradeEffect("w", 15)) {
            let eff = upgradeEffect("w", 15)
            if (eff && eff.gt(0))
                mult = mult.times(eff)
        }

        if (player.w && player.w.superBoostActive)
            mult = mult.times(player.p.points.add(1).log10().add(1).pow(0.7))

        // boosts: e \\

        if (tmp && tmp.e && tmp.e.effect && tmp.e.effect.superPower && tmp.e.effect.superPower.gt(0)) {
            mult = mult.times(tmp.e.effect.superPower)
        }

        return mult

    },

    gainExp() {
        return new Decimal(1)
    },

    passiveGeneration() {
        if (hasUpgrade("f", 22))
            return (upgradeEffect("f", 22))

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
            description: "You've gained much super powers. To use it, imagine. (Super powers boost Power)",
            cost: new Decimal(3),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.5).add(1)

                if (eff.gte(6e10)) {
                    eff = eff.div(6e10).pow(0.1).mul(6e10)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 12)}
        },

        14: {
            title: "Learn the basics!",
            description: "All existence started with Pona. (Power boost Power)",
            cost: new Decimal(8),
            effect() {
                let eff = player.points.add(1).pow(0.1).add(1)

                if (eff.gte(2100)) {
                    eff = eff.div(2100).pow(0.1).mul(2100)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 13)}
        },

        15: {
            title: "Power Training",
            description: "Try incinerate a paper, if you can't, do it again.(Power boost Power)",
            cost: new Decimal(25),
            effect() {
                let eff = player.points.add(1).log10().add(1)

                if (eff.gte(350)) {
                    eff = eff.div(350).pow(0.5).mul(350)
                }

                return eff
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 14)}
        },

        21: {
            title: "Oh, you are getting stronger",
            description: "... (Power boost Power again)",
            cost: new Decimal(80),
            effect() {
                let eff = player.points.add(1).pow(0.25).div(2).add(1)

                if (eff.gte(1.5e10)) {
                    eff = eff.div(1.5e10).pow(0.1).mul(1.5e10)
                }

                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}, 

            unlocked() { return hasUpgrade("p", 15)}
        },

        22: {
            title: "Are you a god?",
            description: "Ok, are you just getting stronger each second, this make me scary... (x2 Super Power and Power)",
            cost: new Decimal(125),

            unlocked() { return hasUpgrade("p", 21)}
        },

        23: {
            title: "Is this a eggxplosion?",
            description: "Hasta la vista... creation (Power boost Super Power)",
            cost: new Decimal(2000),

            effect() {
                let eff = player.points.add(10).log10().pow(0.3)

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
            title: "Baret is a nice guy",
            description: "He is the Original Celestial of limits (x2 Super Power)",
            cost: new Decimal(1e5),

            unlocked() { return hasUpgrade("f", 13)}
        },

        31: {
            title: "Owtia is a Original Celestials, there are 12 of them",
            description: "(1.3x Power, 1.2x Super Power, 1.1x Fire)",
            cost: new Decimal(1e6),
            unlocked() { return hasUpgrade("f", 13)}
        },

        32: {
            title: "The last upgrade, I promisse",
            description: "(x8 Power)",
            cost: new Decimal(1e33),
            unlocked() { return hasUpgrade("w", 41)}
        },

        33: {
            title: "Early buff",
            description: "(x3 Super Power and x3 Power)",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("e", 12) }
        },



    },

    challenges: {
        11: {
            name: "Flame Super Powers",
            challengeDescription: "Power gain is divided by 10",
            goal: new Decimal(5e50),
            rewardDescription: "x(((log10(superPower)) + 1) ^ 0.5) Fire",

            rewardEffect() {
                let eff = player[this.layer].points.add(1).log10().add(1).pow(0.5)
                return eff
            },

            unlocked() {
                return hasUpgrade("w", 43)
            },
        },

        12: {
            name: "Completely Useless",
            challengeDescription: "Nothing",
            goal: new Decimal(1e52),
            rewardDescription: "Give u some SUGAR HIGH (x5 Earth)",

            unlocked() {
                return hasUpgrade("w", 43)
            },
        },

    },


    row: 0,
})

//
//
// layer 2
//
//


addLayer("f", {
    name: "Fire",
    symbol: "F",
    position: 1,
    branches: ["p"],

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            ash: new Decimal(0),
            boostActive: false,

            // "snapshot" boosts \\
            powerSB: new Decimal(0),
            spowerSB: new Decimal(0),
            fireSB: new Decimal(0),
            windSB: new Decimal(0),
            ashSB: new Decimal(0),
        }
    },

    effect() {
            let powerCalc = player.f.ash.add(1).pow(0.25).add(2);
            if (hasUpgrade("w", 34))
                powerCalc = player.f.ash.add(1).pow(0.3).add(2);

            if (hasUpgrade("w", 42))
                powerCalc = powerCalc.times(1.3);


            let superPowerCalc = player.f.ash.add(1).log10().add(2);

            return{
                power: powerCalc,
                superPower: superPowerCalc,
            }
        }, 

     tabFormat: {
    "Upgrades": { 
        content: [
            "main-display", 
            "prestige-button", 
            "blank", 
            "upgrades"] 
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
            return "Increasing Power by x" + format(tmp.f.effect.power) + ", and Super Power by x" + format(tmp.f.effect.superPower)
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

    passiveGeneration() {
        if (hasUpgrade("w", 44))
            return (upgradeEffect("w", 44))

        return 0
    },

    color: "#ff3737",
    requires: new Decimal(5e8),

    resource: "flames",
    baseResource: "powers",
    baseAmount() { return player.points },

    type: "normal",
    exponent: 0.5,

    gainMult() {
        let mult = new Decimal(1)
        // boosts: p \\
        
        if (hasUpgrade("p", 31))
            mult = mult.times(1.1)

        if (hasChallenge("p", 11))
            mult = mult.times(challengeEffect("p", 11))

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

        if (hasUpgrade("w", 41))
            mult = mult.times(3)

        if (player.f && player.f.boostActive)
            mult = mult.times(player.f.points.add(1).log10().add(1).pow(0.7))

        if (hasUpgrade("w", 45))
                mult = mult.times(upgradeEffect("w", 45))

        
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
        title: "Quadrilions of years ago",
        description: "Owtia created Fire (x2 Super Power & Power)",
        cost: new Decimal(2),

        unlocked() { return hasUpgrade("f", 11) }
    },

    13: {
        title: "He use Fire to make anyone who use Fire, burn it self",
        description: "(Unlock Super Power u25 and u31)",
        cost: new Decimal(5),

        unlocked() { return hasUpgrade("f", 12) }
    },

    14: {
        title: "I believe you can do it",
        description: "(Unlock Fire Challenges)",
        cost: new Decimal(30),

        unlocked() { return hasUpgrade("f", 13) }
    },

    15: {
        title: "Wait, what are you doing?",
        description: "(Unlock Ash, in Fire)",
        cost: new Decimal(100),

        unlocked() { return hasUpgrade("f", 14) }
    },

    21: {
        title: "Learned to put out the fire, not bad",
        description: "(x2 Fire and Ash)",
        cost: new Decimal(350),

        unlocked() { return hasUpgrade("f", 15) }
    },

    22: {
        title: "Owtia is scared of you",
        description: "(Create Super Power per second)",
        cost: new Decimal(550),
        effect() {
            let eff = new Decimal(0.01)

            if (hasUpgrade("e", 12))
                eff = eff.add(1)

            return eff
        },

        unlocked() { return hasUpgrade("f", 21) }
    },

    23: {
        title: "Is this a real eggxplosion?",
        description: "Deja vu(Power boost Power)",
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
        title: "Alle is near to new powers, be careful",
        description: "(Unlock the Alle)",
        cost: new Decimal(1e7),

        unlocked() { return hasUpgrade("f", 23) }
    },

    25: {
        title: "The Power of the Elements",
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

    31: {
        title: "Cool...",
        description: "(Power boost Power)",
        cost: new Decimal(1),

        effect() {
            let eff = player.points.add(1).log10().pow(0.5).add(1)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return eff
        },

        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},

        unlocked() { return hasUpgrade("e", 11)}
    },
},

    //  FIRE DECAY  \\
    update(diff) {
    if (player.f.ash === undefined)  player.f.ash = new Decimal(0)

    if (player.f.points.gt(0)) {

        let decay = new Decimal(0.05)

        if (hasChallenge("f", 12))
            decay = decay.sub(0.01)

        if (hasUpgrade("w", 35))
            decay = decay.sub(0.04)


         let loss = player.f.points.times(decay).times(diff)

        player.f.points = player.f.points.sub(loss)

        if (player.f.points.lt(1))
            player.f.points = new Decimal(1)
    }
},

    // FIRE CHALLENGES \\
    challenges: {
        11: {
            name: "Flame Powers<br> are too strong",
            challengeDescription: "Power gain is divided by 10",
            goal: new Decimal(1e9),
            rewardDescription: "x3 Super Power",
            style() {
                return {
                    'background': 'linear-gradient(145deg, #ff4f4f, #7f0000)',
                    'color': '#ffe9e9',
                    'border': '4px solid #ff9999',
                    'box-shadow': '0 0 18px rgba(255, 79, 79, 0.35)',
                }
            },

            rewardEffect() {
                return new Decimal(3)
            }, 

            unlocked() {
                return hasUpgrade("f", 14)
            },
        },

        12: {
            name: "INFERNAL Flames",
            challengeDescription: "Power gain is divided by 100 and super power by 40",
            goal: new Decimal(1.5e5),
            rewardDescription: "x2 Fire, Fire decay is 1% lower, and Fire boosts Ash",
            style() {
                return {
                    'background': 'linear-gradient(145deg, #ff7676, #5f0000)',
                    'color': '#fff0f0',
                    'border': '4px solid #ff8a8a',
                    'box-shadow': '0 0 18px rgba(255, 118, 118, 0.35)',
                }
            },

            rewardEffect() {
                let eff = player.f.points.add(1).log10().add(0.7)

                return eff
            },

            rewardDisplay() { return format(this.rewardEffect())+"x"},

            unlocked() {
                return hasUpgrade("f", 14)
            },
        },

        13: {
            name: "Nothing more to do<br>instead of upgrades and challenges?",
            challengeDescription: "Power gain is raised to the power of 0.5",
            goal: new Decimal(5e20),
            rewardDescription: "Unlocks Verkoel",
            style() {
                return {
                    'background': 'linear-gradient(145deg, #ff8a5a, #660000)',
                    'color': '#fff5ec',
                    'border': '4px solid #ffb38a',
                    'box-shadow': '0 0 18px rgba(255, 138, 90, 0.35)',
                }
            },

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
                gain = gain.times(upgradeEffect("f", 25))

             if (hasUpgrade("w", 31))
                gain = gain.times(upgradeEffect("w", 31))

             if (player.f.ashSB.gt(0)) {
                gain = gain.times(player.f.ashSB)
            }

            if (hasUpgrade("w", 33))
                gain = gain.times(8)

            if (hasUpgrade("w", 41))
                gain = gain.times(3)

            if (hasUpgrade("w", 42))
                gain = gain.times(player.f.ash.add(1).log10().add(1))

            if (hasUpgrade("w", 44))
                gain = gain.times(10)

            if (hasUpgrade("w", 45))
                gain = gain.times(player.points.add(1).log10().pow(0.2))
        

            player.f.points = player.f.points.sub(this.cost())

            if (!player.f.ash)
                player.f.ash = new Decimal(0)


            player.f.ash = player.f.ash.add(gain)
        },

        onHold() {
            this.buy()
        },
        holdInterval: 0.1,

        style() {
            return {
                'background-color': '#3d1f0d',
                'color': '#ffe5b4',
                'border': '3px solid #ffab40',
                'border-radius': '16px',
                'box-shadow': '0 0 12px rgba(255, 171, 64, 0.45)',
                'padding': '10px',
                'min-width': '210px',
                'min-height': '100px',
            }
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
            let data = this.effect()
            player[this.layer].powerSB = data.effect
        },

        effect() {
            let exp = new Decimal(0.6)

            if (hasChallenge("w", 12))
                exp = exp.add(0.1)

            let eff = player.points.add(1).log10().pow(exp)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return { effect: eff, exp: exp }
        }
    },

    12: {
        display() { 
            return "The Super Power Alle gives you: x" + format(player[this.layer].spowerSB || 1) + " Super Power. Next Alle with 350 Wind"
        },

        canClick() { return true },

        onClick() { 
            let data = this.effect()
            player[this.layer].spowerSB = data.effect
        },

        effect() {
            let exp = new Decimal(0.6)

            if (hasChallenge("w", 12))
                exp = exp.add(0.1)

            let eff = player.p.points.add(1).log10().pow(exp)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return { effect: eff, exp: exp }
        },

        unlocked() { return player.w.points.gte(75) }
    },

    13: {
        display() { 
            return "The Fire Alle gives you: x" + format(player[this.layer].fireSB || 1) + " Fire. Next Alle with 750 Wind"
        },

        canClick() { return true },

        onClick() { 
            let data = this.effect()
            player[this.layer].fireSB = data.effect
        },

        effect() {
            let exp = new Decimal(0.6)

            if (hasChallenge("w", 12))
                exp = exp.add(0.1)

            let eff = player.f.points.add(1).log10().pow(exp)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return { effect: eff, exp: exp }
        },

        unlocked() { return player.w.points.gte(350) }
    },

    14: {
        display() { 
            return "The Wind Alle gives you: x" + format(player[this.layer].windSB || 1) + " Wind. Next Alle with a Wind Upgrade"
        },

        canClick() { return true },

        onClick() { 
            let data = this.effect()
            player[this.layer].windSB = data.effect
        },

        effect() {
            let exp = new Decimal(0.6)

            if (hasChallenge("w", 12))
                exp = exp.add(0.1)

            let eff = player.w.points.add(1).log10().pow(exp)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return { effect: eff, exp: exp }
        },

        unlocked() { return player.w.points.gte(750) }
    },

    15: {
        display() { 
            return "The Ash Alle gives you: x" + format(player[this.layer].ashSB || 1) + " Ash. Next Alle with a Earth upgrade"
        },

        canClick() { return true },

        onClick() { 
            let data = this.effect()
            player[this.layer].ashSB = data.effect
        },

        effect() {
            let exp = new Decimal(0.7)

            if (hasChallenge("w", 12))
                exp = exp.add(0.1)

            let eff = player.f.ash.add(1).log10().pow(exp)

            if (eff.gt(1e33)) {
                eff = eff.div(1e33).pow(0.5).mul(1e33)
            }

            return { effect: eff, exp: exp }
        },

        unlocked() { return hasUpgrade("w", 32) }
    },
},

    row: 1,
    
    layerShown() {
        return hasUpgrade("p", 24) || player.f.unlocked
    }
}) 

