/*
EFFECTS
adolescent
adult
convicted
craft
criminalOrganization
cursed
fame
fatherClose
fatherDead
fatherIsGone
fortune
hasBrother
hasSister
inheritance
injured
job
lifeOfCrime
love
mage
motherIsClose
motherDead
motherIsGone
noMoreApprentices
powers
priest
quest
questFailed
questSucceeded
reformed
soldier
squire
trade
travel
vendetta
wanted
*/

// hunt
// saw a rare creature
// guild leader
// went on a pilgrimage
// traveled in a trade caravan
// opened a shop
// worked in an inn/tavern
// opened their own inn/tavern
// took over for their mentor
// wandered
// found a magic item
// rivalry
// made a friend
// divine inspiration
// join a church
// join a cult
// met a talking creature
// had your fortune told
// saw a medium conjure the spirit of a dead loved one
// saved a life, and now have a companion who owes you a life debt
// gained the favor of a temple/noble/wizard
// found a mysterious letter/map that inspired you to go on a quest
// for a time, they would have dreams of [supernatural weirdness] and wake up in strange places
// met a dreamwalker [who did something]
// were granted a title of nobility
// got drunk one night and...
// ate some poisonous mushrooms/berries / old bread and...
// put on a show

const childhoodOutcomes = [
    {
        value: "They were an orphan.",
        tags: ["fatherIsGone", "motherIsGone"],
    },
    {
        value: "They were an only child.",
    },
    {
        value: "They grew up with {brothers}.",
        tags: ["hasBrother"],
    },
    {
        value: "They grew up with {brothers} and {sisters}.",
        tags: ["hasBrother", "hasSister"],
    },
    {
        value: "They grew up with {sisters}.",
        tags: ["hasSister"],
    },
];

const knighted = {
    value: "After they returned home, they were knighted.",
    tags: ["knight"],
    requiredTags: ["squire"],
};

const combatOutcomes = [
    {
        value: "Afterward, they continued to serve in the military.",
        tags: ["job"],
        next: [knighted],
    },
    {
        value: "Afterward, they took a job with the local guard.",
        tags: ["job"],
        next: [knighted],
    },
    {
        value: "They were wounded in combat and {injury}.",
        tags: ["injured"],
        next: [knighted],
    },
    {
        value: "They lost a friend in battle.",
        next: [knighted],
    },
    {
        value: "They were captured and spent time imprisoned by the enemy.",
        next: [knighted],
    },
    {
        value: "They came home a hero due to their brave deeds and skilled fighting.",
        tags: ["fame"],
        next: [knighted],
    },
];

const victimCrimes = [
    "arson",
    "assault",
    "attempted murder",
    "blackmail",
    "burglary",
    "defamation",
    "extortion",
    "fraud",
    "harassment",
    "kidnapping",
    "mayhem",
    "robbery",
    "stalking",
    "vandalism",
];

const crime = [
    ...victimCrimes,
    //"apostasy",
    "begging",
    //"blasphemy",
    "bribery",
    "conspiracy to commit {crime}",
    "embezzlement",
    "espionage",
    "forgery",
    // "illegal gambling",
    "murder",
    "perjury",
    "poaching",
    "prostitution",
    "public indecency",
    "sedition",
    "smuggling",
    "trafficking",
    "treason",
];

const crimeLifestyleOutcomes = [
    {
        value: "Despite their punishment, they discovered a taste for crime.",
        tags: ["lifeOfCrime"],
    },
    {
        value: "While imprisoned, they befriended another prisoner. When they got out, they joined their {criminalOrganization}.",
        tags: ["lifeOfCrime"],
    },
    {
        value: "They found imprisonment so terrible that they vowed never to go back.",
        tags: ["reformed"],
    },
    {
        value: "While imprisoned, they rethought their life and changed their ways.",
        tags: ["reformed"],
    },
];

const warOutcomes = [
    {
        value: "They enlisted in the military and fought in the war.",
        tags: ["adult", "soldier"],
        next: [...combatOutcomes],
        requiredTags: ["adolescent"],
        restrictedTags: ["injured", "mage", "priest"],
    },
    {
        value: "They joined the fight as a war mage.",
        tags: ["adult", "soldier"],
        next: [...combatOutcomes],
        requiredTags: ["injured", "adolescent", "mage"],
    },
    {
        value: "They joined the fight as a healer.",
        tags: ["adult", "soldier"],
        next: [...combatOutcomes],
        requiredTags: ["injured", "adolescent", "priest"],
    },
    {
        value: "They lost most of what they had during the war.",
        tags: ["adolescent"],
    },
    {
        value: "They fled their homeland to escape the conflict.",
        tags: ["adolescent"],
    },
];

// TODO: removeTag option
const data = {
    history:
    {
        tree: [
            { // apprentice
                value: "They took an apprenticeship with {craft}.",
                tags: ["adult"],
                next: [
                    {
                        value: "They completed their apprenticeship and, along the way, fell in love with one of their customers.",
                        tags: ["craft", "job", "love"],
                        restrictedTags: ["love"],
                    },
                    {
                        value: "They excelled at their craft and took over once their mentor retired.",
                        tags: ["craft", "job"],
                    },
                    {
                        value: "They were a natural at their craft, earning a name for themself by the time they completed their apprenticeship.",
                        tags: ["craft", "fame", "job"],
                    },
                    {
                        value: "They fell in love and became too distracted from their apprenticeship and were dismissed. Despite the setback, they still believe it was worth it.",
                        tags: ["love"],
                        restrictedTags: ["love"],
                    },
                    {
                        value: "They never could master their craft, and ultimately they gave up.",
                    },
                    {
                        value: "Although they proved a mediocre apprentice at best, they discovered their true calling as {craft} instead.",
                        tags: ["craft", "job"],
                    },
                ],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult"],
            },
            { // apprentice taken
                value: "They took on an apprentice.",
                next: [
                    {
                        value: "The apprentice proved hard working, skillful, and loyal. They remain a friend and valued colleague to this day.",
                    },
                    {
                        value: "Their apprentice performed well and went on to do good work on their own.",
                    },
                    {
                        value: "The apprentice seemed to be working out until they disappeared in the night with that day's earnings.",
                        next: [
                            false,
                            {
                                value: "They vowed never to take on another apprentice.",
                                tags: ["noMoreApprentices"],
                            }
                        ],
                    },
                    {
                        value: "The apprentice had potential but never seemed to focus on their work.",
                    },
                    {
                        value: "The apprentice was careless and ended up injured on the job.",
                        next: [
                            false,
                            {
                                value: "They vowed never to take on another apprentice.",
                                tags: ["noMoreApprentices"],
                            }
                        ],
                    },
                    {
                        value: "The apprentice proved so difficult to teach and performed so poorly that they vowed never to take on another apprentice.",
                        tags: ["noMoreApprentices"],
                    }
                ],
                requiredTags: ["adult", "craft"],
                restrictedTags: ["noMoreApprentices"],
            },
            { // apprentice taken
                value: "They took on an apprentice.",
                requiredTags: ["adult", "trade"],
            },
            { // arcane advisor
                value: "They were hired as an advisor for a noble.", // vary npc
                tags: ["job"],
                requiredTags: ["adult", "mage"],
                restrictedTags: ["job"],  // artifactQuest
            },
            { // arrested for crime
                value: "They were arrested for {crime}.",
                next: [
                    {
                        value: "They were found guilty and sent to prison.",
                        tags: ["convicted"],
                        next: [
                            {
                                value: "They served their full sentence and were released.",
                                tags: ["adult"],
                                next: [...crimeLifestyleOutcomes],
                            },
                            {
                                value: "They were released early for good behavior.",
                                next: [...crimeLifestyleOutcomes],
                            },
                            {
                                value: "They were released early for cooperating with authorities.",
                                next: [...crimeLifestyleOutcomes],
                            },
                            {
                                value: "They escaped and are still on the lam.",
                                tags: ["lifeOfCrime", "wanted"],
                            },
                        ],
                        restrictedTags: ["reformed"],
                    },
                    {
                        value: "They were discovered to be innocent and released.",
                        restrictedTags: ["wanted"],
                    },
                    {
                        value: "There was not enough to convict them and they were released.",
                        restrictedTags: ["reformed", "wanted"],
                    },
                ],
                requiredTags: ["adolescent"],
            },
            { // child - well-off
                value: "They were well-off as a child.",
                tags: ["adolescent", "fortune"],
                next: [...childhoodOutcomes],
                restrictedTags: ["adolescent"],
            },
            { // child - poverty
                value: "They grew up in poverty.",
                tags: ["adolescent", "poverty"],
                next: [...childhoodOutcomes],
                restrictedTags: ["adolescent"],
            },
            { // child - comfortable
                value: "They had a quiet and comfortable childhood.",
                tags: ["adolescent"],
                next: [...childhoodOutcomes],
                restrictedTags: ["adolescent"],
            },
            { // creature attack
                value: "They were attacked by {predator}",
                next: [
                    {
                        value: "They fought back, and it fled.",
                    },
                    {
                        value: "Through skill or luck, they managed to slay the beast. They were celebrated as a hero in town.",
                        tags: ["fame"], // next?
                    },
                    {
                        value: "They fought back against the creature and managed to defeat it. They spared its life, though, and offered it some food, gaining its trust and friendship.", // defeated it, spared it, became a companion
                        // requiredTags: ["hero"], or adventurer or whatever
                    },
                    {
                        value: "They escaped, but not unscathed: They {injury}", // injury
                        tags: ["injury"],
                    },
                    {
                        value: "They managed to flee from the beast.",
                        // next: lost item, phobia, infamy?
                    },
                ],
                requiredTags: ["adolescent"],
            },
            { // criminal organization
                value: "They joined {criminalOrganization}.",
                tags: ["criminalOrganization"],
                requiredTags: ["lifeOfCrime"],
            },
            { // dungeon
                value: "Their quest sent them into {dungeon}.",
                next: [
                    {
                        value: "They barely made it out alive.",
                    },
                    {
                        value: "They found a treasure!",
                    },
                    {
                        value: "They found what the artifact they were questing for!",
                        tags: ["questSucceeded"],
                    },
                    {
                        value: "They got lost for several days.",
                    },
                    {
                        value: "They rescued {importantNpc}!",
                        tags: ["questSucceeded"],
                    },
                ],
                requiredTags: ["quest", "adult"],
                restrictedTags: ["questFailed", "questSucceeded"]
            },
            {  //  father died
                value: "Their father {death}.",
                tags: ["fatherIsGone", "fatherDead"],
                requiredTags: ["adolescent"],
                restrictedTags: ["fatherIsGone"],
            },
            { // estranged from father
                value: "They became estranged from their father.",
                tags: ["fatherIsGone"],
                requiredTags: ["adolescent"],
                restrictedTags: ["fatherIsClose", "fatherIsGone"],
            },
            { // father remains close
                value: "They remained close with their father well into their adult life.",
                tags: ["fatherIsClose"],
                requiredTags: ["adolescent"],
                restrictedTags: ["fatherIsClose", "fatherIsGone"],
            },
            { // father remarried
                value: "Their father remarried.",
                requiredTags: ["adolescent", "motherDead"],
                restrictedTags: ["fatherIsGone"],
            },
            { // faerie encounter
                value: "They met {supernaturalCreature} in the woods.", // add spooky places
                next: [
                    {
                        value: "The being was pleased with them and granted them {gift}.",
                        tags: ["powers"],
                    },
                    {
                        value: "The being tricked them, leaving them cursed {curse}.",
                        tags: ["cursed"],
                    },
                    {
                        value: "The being tricked them, trapping them in {alternateDimension} for a time.",
                        tags: ["adolescent"],
                        // next?
                    },
                    {
                        value: "They angered the being and, in turn, were cursed {curse}.",
                        tags: ["cursed"],
                    },
                    {
                        value: "The being sent them on a quest.",
                        tags: ["quest"],
                        requiredTags: ["adult"],
                    },
                ],
                requiredTags: ["adolescent"],
            },
            {  // fighting academy
                value: "They opened a fighting academy.",
                // next...
                requiredTags: ["adult", "soldier"],
            },
            { // guard
                value: "They joined the town guard.",
                tags: ["adult", "job", "soldier"],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult", "job"],
            },
            { // healed criminal
                value: "One night, someone stumbled into the temple, wounded, and pursued by the guard.",
                requiredTags: ["adult", "priest"],
                next: [
                    {
                        value: "They healed the criminal, but then turned them over to the guard.",
                    },
                    {
                        value: "They healed the criminal, but they escaped at the earliest opportunity.",
                    },
                    {
                        value: "They healed the criminal and gave them a chance to reform while working for the church.",
                        // next
                    },
                    {
                        value: "They decided to not heal the criminal at the suggestion of one the guards, leaving them to their fate.",
                    },
                    {
                        value: "They tried ot heal the criminal and failed. They still think about that night often and what it meant.",
                    },
                ],
            },
            { // healed important npc
                value: "They found {importantNpc} left for dead on the road, took them home, and restored them to health over several weeks.",
                requiredTags: ["adult", "priest"],
                next: [
                    {
                        value: "They ended up falling in love.",
                        tags: ["love"],
                        restrictedTags: ["love"],
                    },
                    {
                        value: "They were rewarded with a noble title.",
                        tags: ["nobility"],
                    },
                    {
                        value: "They were given a large reward.",
                        tags: ["fortune"],
                    },
                    {
                        value: "They were celebrated for their heroism.",
                        tags: ["fame"],
                    },
                ],
            },
            { // inheritance
                value: "They received an inheritance after their parents passed.",
                tags: ["inheritance"],
                requiredTags: ["adolescent", "fatherDead", "motherDead"],
                restrictedTags: ["inheritance"],
            },
            { // injury
                value: "They were injured {incident}.",
                tags: ["injured"],
                requiredTags: ["adult"],
                // next
            },
            { // invasion
                value: "Their homeland was invaded.", // by...
                next: [...warOutcomes],
                tags: ["war"],
                requiredTags: ["adolescent"],
                restrictedTags: ["war"],
            },
            { // job
                value: "They took a job as a {job}.",
                tags: ["adult", "job"],
                requiredTags: ["adolescent"],
                restrictedTags: ["job"],
            },
            { // job struggle
                value: "Despite their toiling, they barely get by.",
                tags: ["poverty"],
                requiredTags: ["adult", "job"],
                restrictedTags: ["fortune", "poverty"],
            },
            { // job success
                value: "They were successful in their work and lived comfortably.",
                tags: ["fortune"],
                requiredTags: ["adult", "job"],
                restrictedTags: ["fortune", "poverty"],
            },
            { // knighted
                value: "After completing their quest, they were knighted.",
                tags: ["soldier"],
                requiredTags: ["adult", "questSuccess", "squire"],
            },
            { // love
                value: "They met {npc} and fell in love.",
                tags: ["love"],
                restrictedTags: ["love"],
                requiredTags: ["adult"],
            },
            { // mage academy
                value: "They enrolled in a mage academy.",
                tags: ["adult"],
                next: [
                    {
                        value: "They graduated from the mage academy with a specialization in {magicSchool}.",
                        tags: ["mage"],
                    },
                    {
                        value: "Despite their best efforts, they struggled to cast even the simplest spell, and they eventually dropped out.",
                    },
                    {
                        value: "After {magicAccident}, they left the academy. They have a lingering fear of magic even to this day.",
                    },
                    {
                        value: "The fell in love with a classmate and they graduated together.",
                        tags: ["love", "mage"],
                    },
                ],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult", "priest", "soldier"],
            },
            { // mage quest
                value: "They found lost lore about an arcane artifact and set out on a quest to find it.",
                tags: ["quest"],
                requiredTags: ["adult", "mage"],
                restrictedTags: ["quest"],  // artifactQuest
            },
            { // marriage
                value: "They married their sweetheart.",
                tags: ["marriage"],
                requiredTags: ["love"],
                restrictedTags: ["marriage"],
            },
            { // masterwork
                value: "Their masterful creations have earned them fame in their profession.",
                tags: ["fame"],
                requiredTags: ["adult", "craft"],
            },
            { // mercenary work
                value: "They were hired to go on a quest.",
                tags: ["quest"],
                requiredTags: ["adult", "soldier"],
            },
            { // mother died
                value: "Their mother {death}.",
                tags: ["motherIsGone", "motherDead"],
                requiredTags: ["child"],
                restrictedTags: ["motherIsGone"],
            },
            { // estranged from mother
                value: "They became estranged from their mother.",
                tags: ["motherIsGone"],
                requiredTags: ["adolescent"],
                restrictedTags: ["motherIsClose", "motherIsGone"],
            },
            { // mother remains close
                value: "They remained close with their mother well into their adult life.",
                tags: ["motherIsClose"],
                requiredTags: ["adolescent"],
                restrictedTags: ["motherIsClose", "motherIsGone"],
            },
            { // mother remarried
                value: "Their mother remarried.",
                requiredTags: ["adolescent", "fatherDead"],
                restrictedTags: ["motherIsGone"],
            },
            { // pilgrimage
                value: "They went on a religious pilgrimage.",
                tags: ["travel"],
                requiredTags: ["adult", "priest"],
                restrictedTags: ["lifeOfCrime", "travel"],
            },
            { // priesthood
                value: "They joined the priesthood.",
                tags: ["adult", "job", "priest"],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult", "job", "mage"],
            },
            { // squire
                value: "They were accepted as a knight's squire.",
                tags: ["adult", "job", "squire"],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult", "job"],
            },
            { // turned to crime
                value: "Poor and unemployed, they turned to a life of crime.",
                tags: ["lifeOfCrime"],
                requiredTags: ["adult", "poverty"],
                restrictedTags: ["job", "lifeOfCrime", "priest"],
            },
            {  // trade guild
                value: "They joined a trade guild.",
                requiredTags: ["adolescent", "craft"],
            },
            { // trapped animal
                value: "They found {animalWithArticle} caught in a trap.",
                next: [
                    {
                        value: "They freed the animal and watched it run off, realizing that they, too, longed for freedom.",
                    },
                    {
                        value: "They freed the animal, but it stayed by their side. It remains a loyal companion to this day.",
                    },
                    {
                        value: "They freed the animal, which turned out to be a nature spirit in disguise. In return, they were given {gift}.",
                    },
                    {
                        value: "They tried to free the animal, but it was too angry to allow them to get close.",
                    },
                ],
                requiredTags: ["adolescent"],
            },
            { // traveling job
                value: "They joined {travelingJob}.",
                tags: ["adult", "job", "trade", "travel"],
                requiredTags: ["adolescent"],
                restrictedTags: ["adult", "job"],
            },
            { // victim of a crime
                value: "They were the victim of {nonlethalCrime}.",
                next: [
                    {
                        value: "The culprit was never caught.",
                        tags: ["vendetta"],
                    },
                    {
                        value: "The culprit was caught but could not be convicted.",
                        tags: ["vendetta"],
                    },
                    {
                        value: "The culprit was caught and convicted.",
                    },
                ],
                requiredTags: ["adolescent"],
            },
            { // wander
                value: "They grew restless and set out to wander.", // other reasons? "had a vision of a distant land/artifact/something", "wanted to see new places"
                restrictedTags: ["travel"],
                requiredTags: ["adult"],
            },
            { // war
                value: "Their homeland declared war.",
                next: [...warOutcomes],
                tags: ["war"],
                requiredTags: ["adolescent"],
                restrictedTags: ["war"],
            },
        ],
        n: { range: [3, 10] },
    },
    alternateDimension: [
        "the dream realm",
        "the Great Void Beyond",
        "a faerie forest",
        "the mirror realm",
        "the shadow realm",
        "the land of the dead",
    ],
    animal: [
        "badger",
        "bear",
        "cat",
        "crow",
        "dog",
        "elk",
        "fox",
        "goat",
        "hawk",
        "owl",
        "squirrel",
        "wolf",
    ],
    animalWithArticle: [
        "a badger",
        "a bear",
        "a cat",
        "a crow",
        "a dog",
        "an elk",
        "a fox",
        "a goat",
        "a hawk",
        "an owl",
        "a squirrel",
        "a wolf",
    ],
    brothers: [
        "an older brother",
        "a younger brother",
        "two brothers",
        "three brothers",
        "four brothers",
        "five brothers",
    ],
    craft: [
        "an astronomer",
        "a baker",
        "a barber",
        "a bard", // jester, musician, poet, thespian
        "a brewer",
        "a blacksmith",
        "a bookbinder",
        "a butcher",
        "a carpenter",
        "a cook",
        "a cooper",
        "a copyist",
        "a glovemaker",
        "a guide", // forest, mountain, desert
        "a hatmaker",
        "an herbalist",
        "a historian",
        "a hunter", // hunter
        "an illuminator",
        "a jeweler",
        "a locksmith",
        "a mason",
        "a mercenary", // soldier
        "a merchant", // traveler
        "a painter",
        "a pastrychef",
        "a pursemaker",
        "a roofer",
        "a ropemaker",
        "a rugmaker",
        "a saddler",
        "a sailor", // traveler
        "a scribe",
        "a sculptor",
        "a tanner",
        "a trapper",
        "a vintner",
        "a weaver",
        "a woodcarver",
    ],
    crime,
    criminalOrganization: [
        "an assassins' guild",
        "a bandit clan",
        "a smuggling ring",
        "a thieves' guild",
    ],
    criminalTrade: [ // TODO: use this
        "assassin",
        "bandit",
        "con artist",
        "smuggler",
        "thief",
    ],
    curse: [
        "and lost the ability to speak",
        "for their body to be taken over by another being whenever they fall asleep",
        "to be burned by silver",
        "to live as {animalWithArticle} for a year",
        "to turn into {animalWithArticle} under a full moon",
    ],
    death: [
        "died of {disease}",
        "died by falling off a cliff",
        "was eaten by {predator}",
        "was murdered by bandits",
        "was put to death for serious crimes",
        "was frightened to death by a ghost",
    ],
    // disaster: blight, drought, famine, fire, flood, earthquake, lightning, locust swarm, meteor, plague, tornado, someone disappeared
    disease: [
        "black-blood fever",
        "dream-blight",
        "goblin pox",
        "the rattles",
    ],
    dungeon: [
        "an abandoned mine",
        "a cave",
        "the temple of an evil god",
    ],
    gift: [
        "a {preciousMetal} dagger",
        "a {preciousMetal} ring",
        "a candle that produces a flame of many different colors",
        "a concoction that causes anyone who takes a sip to grow a beard for one day",
        "an enchanted hat that always returns when thrown",
        "an hourglass with sand that flows back and forth no matter how it is set",
        "a pendant with the crest of a legendary hero of yore",
        "a valuable gem",
        "one wish",
        "the promise that they would help them in a time of need",
    ],
    importantNpc: [
        "a lost child",
        "a mage",
        "a noble",
        "a prince",
        "a princess",
        "a prophet",
    ],
    incident: [
        "in a fight at the tavern",
        "on the job",
        "while traveling",
    ],
    injury: [
        "are blind in their {side} eye.",
        "are missing a finger.",
        "are missing their {side} foot.",
        "are missing their {side} ear.",
        "are missing several teeth.",
        "are missing {smallNumber} fingers on their {side} hand.",
        "had a broken nose that did not heal straight.",
        "have many visible scars.",
        "have a large scar on their face.",
        "walk with a cane",
    ],
    // item, lost item
    job: [
        // a crier,
        "a dock worker",
        // an explorer,
        "a farmer",
        "a fisher",
        "a herder",
        "an innkeep",
        "a laborer",
        "a lumberjack",
        // a butler or maid
        "a miller",
        "a tavernkeep",
    ],
    magicAccident: [
        "accidentally summoning a demon",
        "an unstable spell exploded, destroying their dormitory",
        "they and a few classmates created an automaton too powerful to control",
        "getting lost for several months in {alternateDimension}",
    ],
    magicCraft: [
        "an alchemist", // mage
        "a conjurer",
        "a diviner",
        "a druid",
        "an enchanter",
        "a healer", // priest
        "a mage", // mage
        "a portal keeper", // gatekeeper
        "a shaman", // mage
    ],
    magicSchool: [
        "dreamwalking",
        "{alternateDimension}",
        "runic inscriptions",
    ],
    nonlethalCrime: victimCrimes,
    npc: [
        "a soldier",
        "a traveler",
    ],
    preciousMetal: [
        "gold",
        "silver",
    ],
    predator: [
        "a dragon",
        "a bear",
        "a giant eagle",
        "a giant snake",
        "a wolf",
    ],
    side: ["left", "right"],
    sisters: [
        "an older sister",
        "a younger sister",
        "two sisters",
        "three sisters",
        "four sisters",
        "five sisters",
    ],
    smallNumber: ["one", "two", "three", "four"],
    supernaturalCreature: [
        "an elemental spirit",
        "a faerie",
        "a ghost",
        "a talking {animal}",
    ],
    supernaturalLocations: [
        "an abandoned house",
        "the deep, dark woods",
        "a desecrated temple",
        "a graveyard",
        "a traveling carnival",
    ],
    travelingJob: [
        "a band of explorers",
        "a trade caravan",
        "a ship's crew",
    ],
};