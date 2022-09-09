export const summonerSpells = [
    {
        "id": 21,
        "name": "Barrier",
        "description": "Shields your champion from 115-455 damage (depending on champion level) for 2 seconds.",
        "tooltip": "Temporarily shields {{ f1 }} damage from your champion for 2 seconds.",
        "cooldown": 180,
        "datavalues": {},
        "summonerLevel": 4,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerBarrier.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 0,
            "y": 0
        }
    },
    {
        "id": 1,
        "name": "Cleanse",
        "description": "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
        "tooltip": "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds.",
        "cooldown": 210,
        "datavalues": {},
        "summonerLevel": 9,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerBoost.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 48,
            "y": 0
        }
    },
    {
        "id": 35,
        "name": "Disabled Summoner Spells",
        "description": "Summoner spells are disabled in this mode.",
        "tooltip": "",
        "cooldown": 0,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerDarkStarChampSelect1.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 96,
            "y": 0
        }
    },
    {
        "id": 54,
        "name": "Disabled Summoner Spells",
        "description": "Summoner spells are disabled in this mode.",
        "tooltip": "",
        "cooldown": 0,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerDarkStarChampSelect2.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 144,
            "y": 0
        }
    },
    {
        "id": 14,
        "name": "Ignite",
        "description": "Ignites target enemy champion, dealing 80-505 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
        "tooltip": "Ignite deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration.<br /><br /><rules>(Grievous Wounds reduces healing effects by 40%. This vision does not reveal stealthed enemies.)</rules>",
        "cooldown": 210,
        "datavalues": {},
        "summonerLevel": 9,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerDot.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 192,
            "y": 0
        }
    },
    {
        "id": 3,
        "name": "Exhaust",
        "description": "Exhausts target enemy champion, reducing their Movement Speed by 30%, and their damage dealt by 40% for 2.5 seconds.",
        "tooltip": "Exhausts target enemy champion, reducing their Movement Speed by {{ f3 }}%, and their damage dealt by {{ f2 }}% for 2.5 seconds.",
        "cooldown": 210,
        "datavalues": {},
        "summonerLevel": 4,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerExhaust.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 240,
            "y": 0
        }
    },
    {
        "id": 4,
        "name": "Flash",
        "description": "Teleports your champion a short distance toward your cursor's location.",
        "tooltip": "Teleports your champion a short distance toward your cursor's location.",
        "cooldown": 300,
        "datavalues": {},
        "summonerLevel": 7,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerFlash.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 288,
            "y": 0
        }
    },
    {
        "id": 6,
        "name": "Ghost",
        "description": "Your champion gains increased Movement Speed and can move through units for 10 seconds. Grants a maximum of 28-45% (depending on champion level) Movement Speed after accelerating for 2 seconds.",
        "tooltip": "Your champion gains increased Movement Speed and can move through units for 10 seconds. Grants a maximum of {{ f1 }}% Movement Speed after accelerating for 2 seconds.",
        "cooldown": 180,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerHaste.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 336,
            "y": 0
        }
    },
    {
        "id": 7,
        "name": "Heal",
        "description": "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
        "tooltip": "Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br /><br /><span class=\"colorFFFF00\">If this spell cannot find a target, it will cast on the most wounded allied champion in range.</span>",
        "cooldown": 270,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerHeal.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 384,
            "y": 0
        }
    },
    {
        "id": 13,
        "name": "Clarity",
        "description": "Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.",
        "tooltip": "Restores {{ f1 }}% maximum Mana to your Champion and {{ f2 }}% to nearby allies.",
        "cooldown": 240,
        "datavalues": {},
        "summonerLevel": 6,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerMana.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 432,
            "y": 0
        }
    },
    {
        "id": 30,
        "name": "To the King!",
        "description": "Quickly travel to the Poro King's side.",
        "tooltip": "<span class=\"colorFFE076\">Passive:</span> Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team.<br /><br /><span class=\"colorFFE076\">Active:</span> Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. <br /><br /><i><span class=\"colorFDD017\">''Poros tug the heartstrings. The rest of you just comes along for the ride.''</span></i>",
        "cooldown": 10,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerPoroRecall.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 0,
            "y": 48
        }
    },
    {
        "id": 31,
        "name": "Poro Toss",
        "description": "Toss a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
        "tooltip": "Toss a Poro a long distance, dealing {{ f2 }} true damage to the first enemy unit hit, granting <span class=\"coloree91d7\">True Sight</span> of the target.<br /><br />This ability can be recast for 3 seconds if it hits an enemy to dash to the target hit, dealing {{ f2 }} more true damage and reducing the cooldown of the next Poro Toss by {{ e4 }} seconds.<br /><br />Poros are not blocked by spell shields or wind walls because they are animals, not spells!<br /><br /><i><span class=\"colorFDD017\">''Poros are a model for Runeterran aerodynamics.''</span></i>",
        "cooldown": 20,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerPoroThrow.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 48,
            "y": 48
        }
    },
    {
        "id": 33,
        "name": "Nexus Siege: Siege Weapon Slot",
        "description": "In Nexus Siege, Summoner Spells are replaced with Siege Weapon Slots. Spend Crystal Shards to buy single-use Siege Weapons from the item shop, then use your Summoner Spell keys to activate them!",
        "tooltip": "",
        "cooldown": 0,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSiegeChampSelect1.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 96,
            "y": 48
        }
    },
    {
        "id": 34,
        "name": "Nexus Siege: Siege Weapon Slot",
        "description": "In Nexus Siege, Summoner Spells are replaced with Siege Weapon Slots. Spend Crystal Shards to buy single-use Siege Weapons from the item shop, then use your Summoner Spell keys to activate them!",
        "tooltip": "",
        "cooldown": 0,
        "datavalues": {},
        "summonerLevel": 1,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSiegeChampSelect2.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 144,
            "y": 48
        }
    },
    {
        "id": 11,
        "name": "Smite",
        "description": "Deals 390-1000 true damage (depending on champion level) to target epic, large, or medium monster or enemy minion. Restores Health based on your maximum life when used against monsters.",
        "tooltip": "Deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target epic, large, or medium monster or enemy minion.  Against monsters, additionally restores <span class=\"colorFFFFFF\">{{ f6 }}</span> <span class=\"colorFF6666\">(+{{ f7 }})</span> Health.<br /><br />Smite regains a charge every {{ ammorechargetime }} seconds, up to a maximum of 2 charges.",
        "cooldown": 15,
        "datavalues": {},
        "summonerLevel": 9,
        "maxammo": "2",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSmite.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 192,
            "y": 48
        }
    },
    {
        "id": 39,
        "name": "Ultra (Rapidly Flung) Mark",
        "description": "It's a snowball! It's a Poro! It's...uh...one of those.",
        "tooltip": "Throw a snowball approximately 1 Really Far units away, dealing {{ f1 }} true damage to the first enemy unit hit and granting <span class=\"coloree91d7\">True Sight</span> of the target.<br /><br />If your Ultra Mark hits an enemy, this ability can be recast for {{ e3 }} seconds to Dash to the tagged unit, dealing an additional {{ f1 }} true damage and increasing your swagger by like a million percent.<br /><br />If you have Poros following you, you throw a Poro instead of a Snowball, because we're terrible people.",
        "cooldown": 80,
        "datavalues": {},
        "summonerLevel": 6,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSnowURFSnowball_Mark.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 240,
            "y": 48
        }
    },
    {
        "id": 32,
        "name": "Mark",
        "description": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked, granting True Sight, and your champion can quickly travel to the marked target as a follow up.",
        "tooltip": "Throw a snowball a long distance, dealing {{ f1 }} true damage to the first enemy unit hit and granting <span class=\"coloree91d7\">True Sight</span> of the target. If it hits an enemy, this ability can be recast for {{ e3 }} seconds to Dash to the tagged unit, dealing an additional {{ f1 }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ e4 }}%.<br /><br /><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.</span>",
        "cooldown": 80,
        "datavalues": {},
        "summonerLevel": 6,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSnowball.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 288,
            "y": 48
        }
    },
    {
        "id": 12,
        "name": "Teleport",
        "description": "After channeling for 4.5 seconds, teleports your champion to target allied structure, minion, or ward.",
        "tooltip": "After channeling for {{ f1 }} seconds, your champion teleports to target allied structure, minion, or ward.<br /><br />You may reactivate Teleport to cancel it, placing it on a {{ f3 }} second cooldown.",
        "cooldown": 300,
        "datavalues": {},
        "summonerLevel": 7,
        "maxammo": "-1",
        "icon": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerTeleport.png",
        "sprite": {
            "url": "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/spell0.png",
            "x": 336,
            "y": 48
        }
    }
]