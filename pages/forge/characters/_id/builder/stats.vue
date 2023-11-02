<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">
        Распределите характеристики и Навыки
        <span>
          <v-icon v-if="alerts && alerts.length <= 0">error_outline</v-icon>
          <v-btn
            color="warning"
            v-else-if="showAlerts"
            @click="showAlerts = !showAlerts"
            small
            ><v-icon small left>error</v-icon> Hide warnings</v-btn
          >
          <v-btn
            color="warning"
            v-else
            @click="showAlerts = !showAlerts"
            outlined
            small
          >
            <v-icon small left>error_outline</v-icon>show
            {{ alerts.length }} warning{{ alerts.length > 1 ? "s" : "" }}
          </v-btn>
          <v-btn color="primary" @click="resetStats" outlined small
            >Сбросить характеристики</v-btn
          >
        </span>
      </h1>
    </v-col>

    <!-- <v-progress-circular
      v-if="!archetype"
      indeterminate
      color="success"
      size="128"
      width="12"
    /> -->

    <!-- <v-col :cols="12" v-if="showAlerts">
      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :type="alert.type"
        :value="true"
        text
        dense
        border="left"
      >
        {{ alert.text }}
        <v-btn
          v-if="alert.key === 'prerequisites'"
          color="primary"
          @click="ensurePrerequisites"
          small
        >
          Increase stats to fit the archetype.
          <v-icon right small> library_add </v-icon>
        </v-btn>
      </v-alert>
    </v-col> -->

    <!-- <v-col :cols="12" :md="6" v-if="species">
      <v-select
        dense
        outlined
        label="Выберите Вариант распределения"
        v-model="advancedBoost"
        :items="advancedBoostOptions"
      />
    </v-col> -->
    <v-col :cols="12" :md="6">
      <v-card>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="attribute in attributeRepository" :key="attribute.key">
                <td>{{ attribute.name }}</td>
                <td>
                  <v-btn
                    icon
                    :disabled="characterAttributes[attribute.key] <= 10"
                    @click="decrementAttribute(attribute.key)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="characterAttributes[attribute.key] >= 18"
                    @click="incrementAttribute(attribute.key)"
                  >
                    <v-icon
                      :color="
                        affordableAttributeColor(
                          characterAttributes[attribute.key]
                        )
                      "
                    >
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{ characterAttributesEnhanced[attribute.key] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>

    <v-col :cols="12" :md="6">
      <v-card>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="skill in finalSkillRepository" :key="skill.key">
                <td>{{ skill.name }}</td>
                <td>
                  <v-switch
                    v-model="isProfiency[skill.key]"
                    hide-details
                    :value="computeProfiencyPool(skill)"
                    inset
                    icon
                    @change="
                      if (isProfiency[skill.key]) {
                        incrementProfiencySkill(skill);
                      } else {
                        decrementProfiencySkill(skill);
                      }
                    "
                  >
                    <!-- <v-icon color="red"> remove_circle </v-icon> -->
                  </v-switch>
                  <!-- {{ characterSkills[skill.key] }} -->
                  <!-- <v-btn
                    icon
                    :disabled="characterSkills[skill.key] >= skillMaximum"
                    @click="incrementSkill(skill.key)"
                    @click="(if(isProfiency) incrementProfiencySkill(skill.key); else decrementProfiencySkill(skill.key);)"
                  > -->
                  <!-- <v-icon
                      :color="affordableSkillColor(characterSkills[skill.key])"
                    >
                      add_circle
                    </v-icon>
                  </v-btn> -->
                </td>
                <td>{{ computeSkillPool(skill) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>

    <v-col :cols="12" :md="6" v-if="archetype">
      <v-card>
        <v-select
          dense
          outlined
          label="Выберите Вариант распределения Хитов"
          v-model="hpMethod"
          :items="selectHpMethod"
        />

        <v-btn
          small
          outlined
          color="primary"
          :disabled="hpMethod == 1"
          @click="generateHp()"
        >
          Ролл!
        </v-btn>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="levelHitPoints in hpRepository"
                :key="levelHitPoints.key"
              >
                <td>Уровень: {{ levelHitPoints.level }}:</td>
                <td>
                  Количество хитов: {{ computeHitPoints(levelHitPoints) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Stats',
  layout: 'forge',
  mixins: [
    StatRepositoryMixin,
  ],
  props: [],
  async asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      selectedAttribute: undefined,
      showAlerts: false,
      archetype: undefined,
      species: undefined,
      loading: false,
      advancedBoost: 1,
      hpMethod: {},
      isProfiency:  {
        athletics: false,
        history: false ,
        arcana:  false,
        nature: false ,
        deception :false ,
        insight  :false,
        intimidation  :false,
        investigation  :false,
        religion:  false ,
        perfomance: false ,
        persuasion: false,
        medicine: false,
        perception:  false ,
        animalHandling: false,
        stealth:  false ,
        survival:  false ,
        acrobatic: false ,
        sleightOfHand:  false,
        levelHit: [],
        // initiative: 1,
      },
      advancedBoostOptions: [
        { text: '+2 к одной характеристике и +1 к другой', value: 1, naming: 'Первый вариант' },
        { text: '+1 к трем характеристикам', value: 2, naming: 'Второй вариант' },
        // { text: '3 - Elite Guardians', value: 3, naming: 'Veteran' },
        // { text: '4 - Heroic Operatives', value: 4, naming: 'Heroic' },
        // { text: '5 - Agents of Fate', value: 5 },
      ],
      selectHpMethod: [
        { text: 'Среднее значение', value: 1, naming: 'Первый вариант' },
        { text: 'Сгенерировать случайные', value: 2, naming: 'Второй вариант' },
      ],
    };
  },
  head() {
    return {
      title: 'Select Attributes & Skills',
    };
  },
  computed: {
    alerts() {
      const alerts = [];

      // archetype prerequisites matched?
      // if (!this.archetypePrerequisitesValid) {
      //   alerts.push({
      //     key: 'prerequisites',
      //     type: 'warning',
      //     text: 'Your attributes are lower than the picked archetype `demands`.',
      //   });
      // }

      // tree of learning valid?
      if (!this.treeOfLearningValid) {
        alerts.push({
          key: 'tree',
          type: 'warning',
          text: 'Tree of Learning violated. You must have at least as many skills learned as your highest skill value.',
        });
      }

      return alerts;
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetype;

      let fulfilled = true;
      // if (archetype && archetype.prerequisites.length > 0) {
      //   archetype.prerequisites.forEach((prerequisite) => {
      //     // { group: 'attributes', value: 'willpower', threshold: 3, }
      //     switch (prerequisite.group) {
      //       case 'attributes':
      //         const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
      //         // if (attributeValue < prerequisite.threshold) {
      //         //   fulfilled = false;
      //         // }
      //         break;
      //       case 'skills':
      //         const skillValue = this.characterSkills[prerequisite.value];
      //         // if (skillValue < prerequisite.threshold) {
      //         //   fulfilled = false;
      //         // }
      //         break;
      //     }
      //   });
      // }

      if (this.ascensionPackages) {
        // this.ascensionPackages.
      }
      // const ascensions = this.

      return fulfilled;
    },
    treeOfLearningValid() {
      let valueOfHighestSkill = 0;
      let numberOfLearnedSkills = 0;
      for (const key in this.characterSkills) {
        if (this.characterSkills[key] > valueOfHighestSkill) {
          valueOfHighestSkill = this.characterSkills[key];
        }
        if (this.characterSkills[key] > 0) {
          numberOfLearnedSkills++;
        }
      }
      return numberOfLearnedSkills >= valueOfHighestSkill;
    },
    skillMaximum() {
      return 8;
    },
    // Character Data
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterAttributeCosts() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      //console.log(this.$store.getters['characters/characterSkillsById'](this.characterId));
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTraits() {
      return this.$store.getters['characters/characterTraitsById'](this.characterId);
    },
    characterTraitsEnhanced() {
      return this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
    },
    characterCustomSkills() {
      return this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
    },
  characterLevelHitPoint() {
      return this.$store.getters['characters/characterLevelHitPointById'](this.characterId);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
        ...this.characterCustomSkills,
      ];
    },
    hpRepository() {
      return this.characterLevelHitPoint;
    },
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true,
    },
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadArchetype(key) {
      this.loading = true;

      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.archetype = data;

      this.levelHit = this.characterLevelHitPoint;
      // this.computedHitPoint(this.levelHit, data, data.hitLevelOne);
      this.loading = false;
    },
    async loadSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
      this.loading = false;
      this.species = data;
    },
    resetStats() {

      this.$store.commit('characters/resetCharacterStats', { id: this.characterId });
    },
    incrementSkill(skill) {
      const newValue = this.characterSkills[skill] + 1;
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    decrementSkill(skill) {
      const newValue = this.characterSkills[skill] - 1;
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    characterLevel(id) {
      return this.$store.getters["characters/characterLevelById"](id);
    },
    setHpCharacter(hp) {
      this.$store.commit("characters/setHpCharacter", {
        id: this.characterId,
        hp,
      });
    },
    setOneLevelHpCharacter(hp) {
      this.$store.commit("characters/setOneLevelHpCharacter", {
        id: this.characterId,
        hp,
      });
    },
    generateHpCharacter(hd) {
      this.$store.commit("characters/generateHp", {
        id: this.characterId,
        hd
      });
    },
    generateHp(){
      const hd = this.archetype.hitDice;
     this.generateHpCharacter(hd);
    },
    //Бонус Мастерства к навыку
    characterIsProfiency(skill) {
      const newValue = this.characterSkills.find((skill) => this.characterSkills.name == skill.key);
      return newValue.isProfiency;
    },
    incrementProfiencySkill(skill) {
       const newValue = this.characterSkills[this.characterSkills.map((skill) => skill.name).indexOf(skill.key)];
       const val = newValue.value + 3;
       this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill.key, val: val, value: newValue } });
       this.$store.commit('characters/setCharacterProfiencySkill', { id: this.characterId, payload: { key: skill, val: true, value: newValue } });
    },
    decrementProfiencySkill(skill) {
      const newValue = this.characterSkills[this.characterSkills.map((skill) => skill.name).indexOf(skill.key)];
      const val = newValue.value - 3;
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, val: val, value: newValue } });
      this.$store.commit('characters/setCharacterProfiencySkill', { id: this.characterId, payload: { key: skill, val: false, value: newValue } });
    },
    incrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] + 1;
      if(attribute  == 'constitution')
      {
        const hp = {
          level: 1,
          hp:  this.archetype.hitLevelOne + Math.floor((newValue - 10) / 2)
        };
        this.setOneLevelHpCharacter(hp);
      }

      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
      // if()
    },
    trackingProfiencySkill(skill) {
        if(skill.isProfiency) {
          this.incrementProfiencySkill(skill);
        }
        else {
           this.decrementProfiencySkill(skill);
        }
    },
    decrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] - 1;
       if(attribute  == 'constitution')
      {
        const hp = {
          level: 1,
          hp:  this.archetype.hitLevelOne + Math.floor((newValue - 10) / 2)
        };
        this.setOneLevelHpCharacter(hp);
      }
      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },
    skillsByAttribute(attribute) {
      if (this.finalSkillRepository !== undefined) {
        return this.finalSkillRepository.filter((s) => s.attribute === attribute);
      }
      return [];
    },
    traitsByAttribute(attribute) {
      if (this.traitRepository !== undefined) {
        return this.traitRepository.filter((t) => t.attribute === attribute);
      }
      return [];
    },
    affordableAttributeColor(currentValue) {
      const attributeNewValueCost = {
        //   [0, 1, 2, 3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
        v10: [0, 0, 4, 6,  8, 15, 18, 21, 32, 36, 40, 55, 72],
        v15: [0, 0, 4, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = attributeNewValueCost[costKey][currentValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = {
        //   [0, 1, 2, 3, 4,  5,  6,  7,  8],
        v10: [0, 1, 2, 3, 4, 10, 12, 14, 24],
        v15: [0, 2, 4, 6, 8, 10, 12, 14, 16],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = skillNewValueCost[costKey][currentSkillValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    attributeMaximumFor(name) {
      if (this.species && this.species.attributeMaximums) {
        return this.species.attributeMaximums.find((attribute) => attribute.name === name).value;
      }
      return 8;
    },
    computeProfiencyPool(skill){
      const index = this.characterSkills.map((skill) => skill.name).indexOf(skill.key);
        // console.log(skill.name, this.characterSkills[skill.key], Math.floor((attribute - 10) / 2), skill);
        const newValue = this.characterSkills[index];
        this.isProfiency[newValue.name] = newValue.isProfiency;
        return newValue.isProfiency;
    },
    computeSkillPool(skill) {
      const attribute = this.characterAttributesEnhanced[skill.attribute.toLowerCase()];
      if (attribute) {
        const index = this.characterSkills.map((skill) => skill.name).indexOf(skill.key);
        const newValue = this.characterSkills[index];
        return Math.floor((attribute - 10) / 2) + newValue.value;
      }
      // return this.characterSkills[skill.key];
    },
    computeHitPoints(levelHitPoints){
      const hp = this.characterLevelHitPoint;
      if(hp !== undefined)
      {
        return hp.find(k => k.level === levelHitPoints.level).hp;
      }
      return 0;
    },
    ensurePrerequisites() {
      const archetype = this.archetype;

      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="css"></style>
