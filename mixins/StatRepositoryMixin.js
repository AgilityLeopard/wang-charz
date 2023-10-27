export default {
  data() {
    return {
      attributeRepository: [
        {
          key: "strength",
          name: "Сила",
          short: "Str",
          description: "Физическая сила",
          order: 1,
        },
        {
          key: "constitution",
          name: "Телосложение",
          short: "Con",
          description: "Твоя выносливость и хиты",
          order: 3,
        },
        {
          key: "dexterity",
          name: "Ловкость",
          short: "Agi",
          description: "Координация и манипуляции",
          order: 2,
        },
        // {
        //   key: 'initiative',
        //   name: 'Initiative',
        //   short: 'Ini',
        //   description: 'Reflexes and reaction speed.',
        //   order: 7,
        // },
        {
          key: "intellect",
          name: "Интеллект",
          short: "Int",
          description: "Determination and strength of will.",
          order: 5,
        },
        {
          key: "wisdom",
          name: "Мудрость",
          short: "Wis",
          description: "asdas",
          order: 4,
        },
        {
          key: "charisma",
          name: "Харизма",
          short: "Cha",
          description: "fffff.",
          order: 6,
        },
      ],
      // maximumBySpeciesRepository: [
      //   {
      //     name: "Human",
      //     attributeMaximums: [
      //       { name: "Strength", value: 8 },
      //       { name: "Agility", value: 8 },
      //       { name: "Toughness", value: 8 },
      //       { name: "Intellect", value: 8 },
      //       { name: "Willpower", value: 8 },
      //       { name: "Fellowship", value: 8 },
      //       { name: "Initiative", value: 8 },
      //     ],
      //     traitMaximums: [{ name: "Speed", value: 8 }],
      //   },
      //   {
      //     name: "Ork",
      //     attributeMaximums: [
      //       { name: "Strength", value: 12 },
      //       { name: "Agility", value: 7 },
      //       { name: "Toughness", value: 12 },
      //       { name: "Intellect", value: 7 },
      //       { name: "Willpower", value: 8 },
      //       { name: "Fellowship", value: 7 },
      //       { name: "Initiative", value: 7 },
      //     ],
      //     traitMaximums: [{ name: "Speed", value: 7 }],
      //   },
      //   {
      //     name: "Eldar",
      //     attributeMaximums: [
      //       { name: "Strength", value: 7 },
      //       { name: "Agility", value: 12 },
      //       { name: "Toughness", value: 7 },
      //       { name: "Intellect", value: 10 },
      //       { name: "Willpower", value: 12 },
      //       { name: "Fellowship", value: 8 },
      //       { name: "Initiative", value: 12 },
      //     ],
      //     traitMaximums: [{ name: "Speed", value: 10 }],
      //   },
      //   {
      //     name: "Adeptus Astartes",
      //     attributeMaximums: [
      //       { name: "Strength", value: 10 },
      //       { name: "Agility", value: 9 },
      //       { name: "Toughness", value: 10 },
      //       { name: "Intellect", value: 10 },
      //       { name: "Willpower", value: 10 },
      //       { name: "Fellowship", value: 8 },
      //       { name: "Initiative", value: 9 },
      //     ],
      //     traitMaximums: [{ name: "Speed", value: 9 }],
      //   },
      //   {
      //     name: "Primaris Astartes",
      //     attributeMaximums: [
      //       { name: "Strength", value: 12 },
      //       { name: "Agility", value: 9 },
      //       { name: "Toughness", value: 12 },
      //       { name: "Intellect", value: 10 },
      //       { name: "Willpower", value: 10 },
      //       { name: "Fellowship", value: 8 },
      //       { name: "Initiative", value: 9 },
      //     ],
      //     traitMaximums: [{ name: "Speed", value: 9 }],
      //   },
      // ],
      // https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
      skillRepository: [
        //Сила
        {
          key: "athletics",
          name: "Атлетика",
          attribute: "strength",
          isProfiency: false,
          description: "A character’s overall physical prowess",
        },
        //Интеллект
        {
          key: "investigation",
          name: "Анализ",
          attribute: "intellect",
          isProfiency: false,
          description:
            "Notice additional details, or perceive hidden or obscured objects.",
        },
        {
          key: "history",
          name: "История",
          attribute: "intellect",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "arcana",
          name: "Магия",
          attribute: "intellect",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "nature",
          name: "Природа",
          attribute: "intellect",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "religion",
          name: "Религия",
          attribute: "intellect",
          isProfiency: false,
          description: undefined,
        },
        //Харизма
        {
          key: "deception",
          name: "Обман",
          attribute: "charisma",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "persuasion",
          name: "Убеждение",
          attribute: "charisma",
          isProfiency: false,
          description: "convince",
        },
        {
          key: "perfomance",
          name: "Выступление",
          attribute: "charisma",
          isProfiency: false,
          description: "convince",
        },
        {
          key: "intimidation",
          name: "Запугивание",
          attribute: "charisma",
          isProfiency: false,
          description: undefined,
        },
        //Мудрость
        {
          key: "medicine",
          name: "Медицина",
          attribute: "wisdom",
          isProfiency: false,
          description: undefined,
        },

        {
          key: "insight",
          name: "Проницательность",
          attribute: "wisdom",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "perception",
          name: "Внимательность",
          attribute: "wisdom",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "survival",
          name: "Выживание",
          attribute: "wisdom",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "animalHandling",
          name: "Уход за животными",
          attribute: "wisdom",
          isProfiency: false,
          description: undefined,
        },
        //Ловкость
        {
          key: "stealth",
          name: "Скрытность",
          attribute: "dexterity",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "acrobatic",
          name: "Акробатика",
          attribute: "dexterity",
          isProfiency: false,
          description: undefined,
        },
        {
          key: "sleightOfHand",
          name: "Ловкость рук",
          attribute: "dexterity",
          isProfiency: false,
          description: undefined,
        },
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      traitRepository: [
        {
          key: "defence",
          name: "Defence",
          attribute: "Initiative",
          description: undefined,
          type: "Combat",
          compute: { static: -1, multi: 1, tier: 0 },
        },
        {
          key: "resilience",
          name: "Resilience",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 1, multi: 1, tier: 0 },
        },
        {
          key: "determination",
          name: "Determination",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "maxWounds",
          name: "Max Wounds",
          attribute: "Toughness",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 2 },
        },
        {
          key: "maxShock",
          name: "Max Shock",
          attribute: "Willpower",
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 1 },
        },
        {
          key: "conviction",
          name: "Conviction",
          attribute: "Willpower",
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "resolve",
          name: "Resolve",
          attribute: "Willpower",
          description: undefined,
          type: "Mental",
          compute: { static: -1, multi: 1, tier: 0 },
        },
        {
          key: "influence",
          name: "Influence",
          attribute: "Fellowship",
          description: undefined,
          type: "Social",
          compute: { static: -1, multi: 1, tier: 0 },
          calculate: (base) => {
            return base - 1;
          },
        },
        {
          key: "wealth",
          name: "Wealth",
          attribute: undefined,
          description: undefined,
          type: "Social",
          compute: { static: 0, multi: 1, tier: 1 },
        },
        {
          key: "speed",
          name: "Speed",
          attribute: undefined,
          description: undefined,
          type: "Combat",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "corruption",
          name: "Corruption",
          attribute: undefined,
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 1, tier: 0 },
        },
        {
          key: "passiveAwareness",
          name: "Passive Awareness",
          attribute: undefined,
          skill: "Awareness",
          description: undefined,
          type: "Mental",
          compute: { static: 0, multi: 0.5, tier: 0 },
        },
      ],
    };
  },
  methods: {
    getAttributeByKey(key) {
      return this.attributeRepository.find((a) => a.key === key);
    },
    getTraitByKey(key) {
      key = key.replace("wounds", "Max Wounds");
      key = key.replace("shock", "Max Shock");
      key = key.replace("soak", "Determination");
      const trait = this.traitRepository.find((a) => a.key === key);
      if (trait) return trait;
      console.warn(`No trait forund for ${key}`);
      return {
        key: key,
        name: key,
      };
    },
    getSkillByKey(key) {
      return this.skillRepository.find((s) => s.key === key);
    },
    getAttributeMaximumForSpecies(speciesName, attributeName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.attributeMaximums.find(
        (attribute) => attribute.name === attributeName
      );
      return maximum ? maximum.value : undefined;
    },
    getTraitMaximumForSpecies(speciesName, traitName) {
      const species = this.maximumBySpeciesRepository.find(
        (species) => species.name === speciesName
      );
      const maximum = species.traitMaximums.find(
        (trait) => trait.name === traitName
      );
      return maximum ? maximum.value : undefined;
    },
    getCreationAttributeArrayByTier() {
      return [
        [2, 2, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 4, 4, 4],
        [3, 4, 4, 4, 4, 4, 5],
        [4, 4, 4, 4, 5, 5, 6],
        [4, 4, 5, 6, 6, 6, 7],
      ];
    },
    getCreationAttributeArrayByTierExamples() {
      return [
        {
          strength: 2,
          agility: 3,
          toughness: 3,
          intellect: 3,
          fellowship: 3,
          willpower: 2,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 3,
          fellowship: 3,
          willpower: 4,
          initiative: 3,
        },
        {
          strength: 3,
          agility: 4,
          toughness: 4,
          intellect: 4,
          fellowship: 4,
          willpower: 5,
          initiative: 4,
        },
        {
          strength: 4,
          agility: 6,
          toughness: 5,
          intellect: 4,
          fellowship: 4,
          willpower: 4,
          initiative: 5,
        },
        {
          strength: 4,
          agility: 7,
          toughness: 6,
          intellect: 4,
          fellowship: 5,
          willpower: 6,
          initiative: 6,
        },
      ];
    },
    getCreationSkillArrayByTier() {
      return [
        [2, 3, 3, 3, 4],
        [2, 3, 3, 3, 3, 4, 4, 5],
        [2, 3, 3, 3, 4, 4, 4, 4, 5, 5],
        [2, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6],
        [3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 7],
      ];
    },
    getCreationSkillArrayByTierExamples() {
      return [
        {
          athletics: 2,
          awareness: 3,
          ballisticSkill: 4,
          persuasion: 3,
        },
      ];
    },
  },
};
