const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
  goen: { book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
  tog: { book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
  pax: { book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
  sotah: { book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
  amb: { book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
};

const rarity = {
  'U': 'Uncommon',
  'C': 'Common',
  'R': 'Rare',
  'V': 'Very Rare',
  'L': 'Unique',
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleStub = function (id, sourceKey, sourcePage, name, value, keywords, hint, stub = true) {
  const valueParts = value.split('');
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id: id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    type: 'Misc',
    subtype: '',
    value: valueParts[0],
    rarity: rarity[valueParts[1]],
    keywords: keywords.split(',').map((k)=>k.trim()),
    stub: stub,
    meta: [],
  };
};

const armour = function (subtype, armourRating, traits) {
  return {
    type: 'Armour',
    subtype: subtype,
    meta: [
      {
        type: 'armour',
        armourRating: armourRating,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};

/**
 * Damage 2+1ED; AP 0; Range M; Steadfast
 * [Damage 2+1ED][AP 0][Range M]; Steadfast
 * Damage 4+1ED; AP 0; Range 2m; Steadfast, Two-Handed, Unwieldy (2)s
 *
 * @param paxString
 * @param subtype
 * @returns {{subtype: string, meta: [{traits: (*|[]), armourRating: *}], type: string}}
 */
const meleePax = function (paxString, subtype = '') {
  const parts = paxString.split('; ');

  const damageString = parts[0].split(' ')[1]; // Damage: 4+1ED
  const ap = parts[1].split(' ')[1];
  const rangeString = parts[2].split(' ')[1];
  const traits = parts[3];

  const damageParts = damageString.split('+');
  const damageStatic = damageParts[0];
  const damageEd = damageParts[1].split('ED')[0];

  return {
    type: 'Melee Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'melee-weapon',
        range: rangeString === 'M' ? 1 : rangeString.split('m')[0],
        damage: {
          static: damageStatic,
          ed: damageEd,
        },
        ap: ap,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};


const core = [];

const pax = [
  {
    ...simpleStub(13550, 'pax',355,'Charm', '1U', 'Apparel, Imperium, Adeptus Ministorum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>A charm is a keepsake, holy relic or good luck token that is intended to draw the benevolent eye of the Emperor to the wearer. They take a myriad of forms including such things as saintly finger bones, fragments of blessed bolter casings, water from holy rivers and even corpse hair woven into significant patterns. Throughout the Imperium, there is no shortage of folk that will sell such items to Acolytes, though discerning the true relics from the false is an almost impossible task (thus the cost of a charm is entirely up to the GM and how well the Acolyte can haggle with the seller).</p>' +
      '<p>Charms have no tangible benefits. However, when the adventure calls for something bad to happen to a random character, at the GMs discretion a character with a charm will be exempt. If all the characters carry charms (as all Emperor-fearing citizens should) then it is up to the GM to choose which charms are the most potent.</p>',
    snippet: 'Charms have no tangible benefits. However, when the adventure calls for something bad to happen to a random character, at the GMs discretion a character with a charm will be exempt. If all the characters carry charms (as all Emperor-fearing citizens should) then it is up to the GM to choose which charms are the most potent.',
  },{
    ...simpleStub(13571, 'pax',357,'Hive Leathers', '2U', 'Apparel, Imperium, Outcast, Scum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>Hive scum, gangers, and other outcasts of the underhive often sport leather vestments made from whatever sources are available. These leathers can be made from grox hide, human or mutant skin, or worse, but all are tailored to create a tough and threatening appearance.</p>' +
      '<p>At the GM’s discretion, Hive Leathers may allow, once per encounter, a re-roll of a failed Intimidate skill test.</p>',
    snippet: 'At the GM’s discretion, Hive Leathers may allow, once per encounter, a re-roll of a failed Intimidate skill test.',
  },
  {
    ...simpleStub(13610, 'pax',360,'Nobilite Robes', '8V', 'Apparel, Imperium, Navis Nobilite, Navigator', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>The majestic and regal robes of the Navis Nobilite blend function and form. Each is woven with the finest materials available throughout the Imperium that are exquisite and expensive far beyond even lesser nobles.</p>' +
      '<p>At the GM’s discretion, Nobilite Robes may grant a situational +1d bonus to a skill test (such as Cunning, Persuasion, Intimidation) or Influence tests when dealing with members of a Navis Nobilite house. Additionally, a character attempting to deceive another as belonging to the house may gain +2d to their Deception skill tests.</p>',
    snippet: 'At the GM’s discretion, Nobilite Robes may grant a situational +1d bonus to a skill test (such as Cunning, Persuasion, Intimidation) or Influence tests when dealing with members of a Navis Nobilite house. Additionally, a character attempting to deceive another as belonging to the house may gain +2d to their Deception skill tests.',
  },
  {
    ...simpleStub(13610, 'pax',361,'Outlandish Attire', '1U', 'Apparel, Imperium, Outcast, Scum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>Weird, outlandish and striking even against the widely diverse attires worn by the Imperial citizenry, these outfits are designed intentionally to stand apart and draw the eye. Favored by performancers, entertainers, and ostentatious socialites alike, these clothes trade comfort and function for aesthetic appeal and bizarre motifs.</p>' +
      '<p>At the GM’s discretion, Outlandish Attire may grant a situational +1d bonus to a skill test (such as Deception, Persuasion, Intimidation). This bonus should only apply in the appropriate circumstances for the clothing’s intended purpose.</p>',
    snippet: 'At the GM’s discretion, Outlandish Attire may grant a situational +1d bonus to a skill test (such as Deception, Persuasion, Intimidation). This bonus should only apply in the appropriate circumstances for the clothing’s intended purpose.',
  },
  {
    ...simpleStub(13640, 'pax',364,'Trappings', '6C', 'Apparel, Imperium, <Any>', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>The citizens of the Imperium wear a staggering range of clothing adorned with jewelry, iconography and other forms of adornment. All manner of styles imaginable exist to illustrate the role or importance of the individual. Individuals might wear bodygloves bedecked in a multitude of rings, the best in noble finery, wigs, tattoos, or religious sigils from any one of a thousand temples, depending on taste, profession, and background. All of the additional adornments that compromise a character’s appearance are collectively known as ‘trappings’.</p>' +
      '<p>Trappings of a certain faction grant a reroll of a single 1d6 in an Interaction skill test with a member of the faction possessing a similar Keyword. For instance, ecclesiarchy trappings would allow the reroll when attempting an Interaction Skill test against characters with the Adeptus Ministorum keyword.</p>',
    snippet: 'Trappings of a certain faction grant a reroll of a single 1d6 in an Interaction skill test with a member of the faction possessing a similar Keyword.',
  },
  {
    ...simpleStub(13770,'pax',377,'Adeptus Arbites Carapace Armour', '3V', 'Carapace, Imperium, Adeptus Arbites', ''),
    ...armour('Carapace',4,'Bulk (1)'),
  },
  {
    ...simpleStub(13780,'pax',378,'Judge Carapace Armour', '5R', 'Carapace, Imperium, Adeptus Arbites', ''),
    ...armour('Carapace',4,'Bulk (1)'),
  },
  {
    ...simpleStub(14280,'pax',428,'Lho-sticks', '2C', 'Narcotic, Imperium, Addictive, Astra Militarum, Lower Class', ''),
    type: 'Drugs',
    subtype: 'Stimulants',
    snippet: 'Consume to enter a relaxed state for 1d6 minutes.',
  },
  {
    ...simpleStub(15810,'pax',581,'Improvised Weapon', '1C', 'Low-Tech, Impact or Blade, Imperium, <Any>', ''),
    ...meleePax('Damage 2+1ED; AP 0; Range M; Steadfast'),
  },
  {
    ...simpleStub(15700,'pax',570,'Egerian Shard Glaive', '7V', 'Xenos, Blade, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage 4+1ED; AP -1; Range M; Agonizing, Crippling (1)', 'Alien Weapon'),
  },
  {
    ...simpleStub(15701,'pax',570,'Fractal Blade', '6V', 'Xenos, Blade, Power Field, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage 3+2ED; AP 0; Range M; Parry', 'Alien Weapon'),
    // Each time a Fractal Blade hits a target, even if it does not cause damage, it gains an armor penetration of -1. This can increase up to -3 in a single encounter, as the blade is sharpened through use.
  },
  {
    ...simpleStub(15702,'pax',570,'Galthite Lacerator', '5V', 'Xenos, Blade, Galthite, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage: 2+1ED; AP -1; Range M; Crippling (2), Penetrating (1)', 'Alien Weapon'),
  },
  {
    ...simpleStub(15840,'pax',584,'Staff', '2C', 'Low-Tech, Impact, Imperium, <Any>', ''),
    ...meleePax('Damage 3+1ED; AP 0; Range 2m; Steadfast, Two-Handed', 'Low-Tech Weapon'),
  },
];

module.exports = [
  ...core,
  ...pax,
];