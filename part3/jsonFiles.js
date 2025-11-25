export {spellData}

export const spellData = {
    "spellcasting": {
        "dc": 16,
        "atk": 8
    },
    "metaMagic": {
        "spells": [
            {
                "name": "Heightened",
                "description": "When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.",
                "cost": 3
            },
            {
                "name": "Quickened",
                "description": "When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.",
                "cost": 2
            }
        ],
        "name:": "Meta Magic",
        "spellSlots": 7
    },
    "spells": {
        "level_0": {
            "name": "Cantrips",
            "spells": [
                {
                    "name": "Mage Hand",
                    "school": "Conjuration",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "A point you choose within range",
                    "components": ["V", "S"],
                    "duration": "1 minute",
                    "description": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it. The hand can't attack, activate magic items, or carry more than 10 pounds.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Fire Bolt",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "120 feet",
                    "target": "A creature or object within range",
                    "components": ["V", "S"],
                    "duration": "Instantaneous",
                    "description": "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried. This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
                    "atHigherLevels": "",
                    "damagingDice": ["d10", "d10"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Shape Water",
                    "school": "Transmutation",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "An area of water fitting within a 5-foot cube",
                    "components": ["S"],
                    "duration": "Instantaneous or 1 hour",
                    "description": "You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:\n\n• You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn't have enough force to cause damage.\n• You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.\n• You change the water's color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.\n• You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.\n\nIf you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Thunderclap",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "Self (5-foot radius)",
                    "target": "All creatures other than you within 5 feet",
                    "components": ["S"],
                    "duration": "Instantaneous",
                    "description": "You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.\n\nAt Higher Levels. The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
                    "atHigherLevels": "",
                    "damagingDice": ["d06", "d06"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Mind Sliver",
                    "school": "Enchantment",
                    "castingTime": "1 action",
                    "range": "60 feet",
                    "target": "One creature you can see within range",
                    "components": ["V"],
                    "duration": "1 round",
                    "description": "You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn.",
                    "atHigherLevels": "This spell's damage increases by 1d6 when you reach certain levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
                    "damagingDice": ["d06", "d06"],
                    "otherDice": ["d04"],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": -1
        },
        "level_1": {
            "name": "Level 1",
            "spells": [
                {
                    "name": "Magic Missile",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "120 feet",
                    "target": "A creature of your choice that you can see within range",
                    "components": ["V", "S"],
                    "duration": "Instantaneous",
                    "description": "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot above 1st.",
                    "damagingDice": ["d04", "d04", "d04"],
                    "otherDice": [],
                    "nonDiceDamage": [1, 1, 1]
                },
                {
                    "name": "Shield",
                    "school": "Abjuration",
                    "castingTime": "1 reaction (when you are hit by an attack or targeted by the magic missile spell)",
                    "range": "Self",
                    "target": "Self",
                    "components": ["V", "S"],
                    "duration": "1 round",
                    "description": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Magnify Gravity",
                    "school": "Transmutation (Dunamancy: Graviturgy)",
                    "castingTime": "1 action",
                    "range": "60 feet",
                    "target": "",
                    "components": ["V", "S"],
                    "duration": "1 round",
                    "description": "The gravity in a 10-foot-radius sphere centered on a point you can see within range increases for a moment. Each creature in the sphere on the turn when you cast the spell must make a Constitution saving throw. On a failed save, a creature takes 2d8 force damage, and its speed is halved until the end of its next turn. On a successful save, a creature takes half as much damage and suffers no reduction to its speed.\n\nUntil the start of your next turn, any object that isn't being worn or carried in the sphere requires a successful Strength check against your spell save DC to pick up or move.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
                    "damagingDice": ["d08", "d08"],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 4
        },
        "level_2": {
            "name": "Level 2",
            "spells": [
                {
                    "name": "Enhance Ability",
                    "school": "Transmutation",
                    "castingTime": "1 action",
                    "range": "Touch",
                    "target": "A creature",
                    "components": ["V", "S", "M (Fur or a feather from a beast)"],
                    "duration": "Up to 1 hour",
                    "description": "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains that effect until the spell ends.\n- Bear's Endurance: The target has advantage on Constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends.\n- Bull's Strength: The target has advantage on Strength checks, and their carrying capacity doubles.\n- Cat's Grace: The target has advantage on Dexterity checks. It also doesn't take damage from falling 20 feet or less if it isn't incapacitated.\n- Eagle's Splendor: The target has advantage on Charisma checks.\n- Fox's Cunning: The target has advantage on Intelligence checks.\n- Owl's Wisdom: The target has advantage on Wisdom checks.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
                    "damagingDice": [],
                    "otherDice": ["d06", "d06"],
                    "nonDiceDamage": []
                },
                {
                    "name": "Misty Step",
                    "school": "Conjuration",
                    "castingTime": "1 bonus action",
                    "range": "Self",
                    "target": "Self",
                    "components": ["V"],
                    "duration": "Instantaneous",
                    "description": "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Suggestion",
                    "school": "Enchantment",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "A creature you can see within range that can hear and understand you",
                    "components": ["V", "M (A snake's tongue and either a bit of honeycomb or a drop of sweet oil)"],
                    "duration": "Up to 8 hours",
                    "description": "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.\n\nThe target must make a Wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.\n\nYou can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn't met before the spell expires, the activity isn't performed.\n\nIf you or any of your companions damage the target, the spell ends.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 3
        },
        "level_3": {
            "name": "Level 3",
            "spells": [
                {
                    "name": "Fireball",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "150 feet",
                    "target": "A point you choose within range",
                    "components": ["V", "S", "M (A tiny ball of bat guano and sulfur)"],
                    "duration": "Instantaneous",
                    "description": "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
                    "damagingDice": ["d06","d06","d06","d06","d06","d06","d06","d06"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Counterspell",
                    "school": "Abjuration",
                    "castingTime": "1 reaction (which you take when you see a creature within 60 feet of you casting a spell)",
                    "range": "60 feet",
                    "target": "A creature in the process of casting a spell",
                    "components": ["S"],
                    "duration": "Instantaneous",
                    "description": "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 3
        }
    }
}