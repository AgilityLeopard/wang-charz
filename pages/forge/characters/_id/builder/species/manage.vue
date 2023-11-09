<template>
  <v-row justify="center">
    <v-progress-circular
      v-if="!species"
      indeterminate
      color="success"
      size="128"
      width="12"
    />

    <v-col v-if="species" :xs="12">
      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ species.nameSpecies }}</h3>
          <h4 class="subtitle-1 grey--text">{{ species.hint }}</h4>
          <v-btn small outlined color="primary" @click="doChangeSpeciesMode">
            <v-icon small>settings</v-icon>
            Сменить расу
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar" /></v-avatar>
      </div>

      <v-divider />

      <div class="mt-2 body-2 text-lg-justify">
        <p><strong>Тип:</strong> {{ species.type }}</p>
        <p><strong>Размер:</strong> {{ species.size }}</p>
        <p><strong>Скорость:</strong> {{ species.speed }} футов</p>
      </div>

      <!-- Описание расы в тексте -->

      <!-- <div class="mt-2 body-2 text-lg-justify"> -->
      <div v-if="species.desc" class="mt-2 body-2 text-lg-justify">
        <span class="mt-2 grey--text">Описание</span>
        <p><v-divider /></p>

        <span v-if="species.desc.length <= 0">Эх, тут нет описания</span>
        <!-- class="spoiler feet_show" -->
        <details
          v-for="(tex, key) in species.desc"
          :key="key"
          :open="tex.opened"
        >
          <summary class="h4">
            <span v-if="tex.name"> {{ tex.name }}</span>
            <span v-if="!tex.name"> Общее описание</span>
          </summary>

          <div
            class="mt-2 body-2 text-lg-justify"
            v-html="tex.description"
          ></div>
        </details>
      </div>

      <div v-if="species.speciesFeatures" class="body-2">
        <!-- <span class="subtitle-1 mt-2">Abilities</span>
        <p><v-divider /></p> -->
        <!-- 
        <span v-if="species.speciesFeatures.length <= 0"
          >No Abilities? At least your xp cost are low...</span
        > -->

        <div class="text-lg-justify">
          <div class="mt-2 body-2 text-lg-justify">
            <!-- <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description"></div>
            <p v-else>{{ feature.snippet }}</p>
            <v-alert
              v-if="feature.alerts"
              v-for="(alert, index) in feature.alerts"
              :key="index"
              :type="alert.type"
              dense
              text
              >{{ alert.text }}</v-alert
            > -->
            <span class="mt-2 grey--text">Особенности</span>
            <p><v-divider /></p>

            <!-- <span v-if="species.desc.length <= 0">Эх, тут нет описания</span> -->
            <details
              v-for="(feature, i) in species.speciesFeatures"
              :key="key"
              :open="feature.opened"
            >
              <summary class="h4">
                <span v-if="feature.name"> {{ feature.name }}</span>
                <span v-if="!feature.name"> Общее описание</span>
              </summary>

              <div
                class="mt-2 body-2 text-lg-justify"
                v-html="feature.description"
              ></div>
            </details>
          </div>
          <!-- 
          <div v-if="feature.options && feature.options.length > 0">
            <div v-for="inx in feature.selected.length">
              <v-select
                :items="feature.options"
                v-model="feature.selected[inx - 1]"
                item-value="name"
                item-text="name"
                @change="setSpeciesTraitOption(feature, inx - 1)"
                dense
                solo
              ></v-select>
              <div
                v-if="
                  feature.selected[inx - 1] &&
                  feature.selected[inx - 1].length > 0
                "
                class="ml-4 mr-4"
              >
                <div
                  v-if="
                    feature.options.find(
                      (o) => o.name === feature.selected[inx - 1]
                    ).description
                  "
                  v-html="
                    feature.options.find(
                      (o) => o.name === feature.selected[inx - 1]
                    ).description
                  "
                ></div>
                <p v-else>
                  {{
                    feature.options.find(
                      (o) => o.name === feature.selected[inx - 1]
                    ).snippet
                  }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="feature.psychicPowers">
            <div
              v-for="selections in feature.psychicPowers"
              :key="selections.name"
            >
              <v-select
                v-if="selections.options"
                v-model="selections.selected"
                :readonly="selections.options.length <= 1"
                :items="selections.options"
                item-value="name"
                item-text="name"
                persistent-hint
                dense
                solo
                class="ml-2 mr-2"
                @change="updatePsychicPowers(selections)"
              />
            </div>
          </div>

          <div
            v-if="
              feature.name.indexOf('Honour the Chapter') >= 0 && chapterList
            "
          >
            <v-alert text border-left dense color="primary" class="caption">
              <em
                >Some homebrews contain additional chapters. Click on the (+)
                after the homebrew to enable it's rules for this character: An
                Abundane of Aphocrypha
                <v-icon
                  v-if="settingHomebrews.includes('aaoa')"
                  small
                  color="success"
                  >check_circle</v-icon
                >
                <v-icon
                  v-else
                  @click="enableHomebrew('aaoa')"
                  small
                  color="primary"
                  >add_circle</v-icon
                >
                or
                Let the Galaxy Burn
                <v-icon v-if="settingHomebrews.includes('ltgb')" small color="success">check_circle</v-icon>
                <v-icon v-else @click="enableHomebrew('ltgb')" small color="primary">add_circle</v-icon>
              </em>
            </v-alert>
            <v-select
              v-model="species['chapter']"
              :items="chapterList"
              label="Select your Chapter"
              item-value="key"
              item-text="label"
              class="ml-2 mr-2"
              dense
              solo
              @change="updateAstartesChapter(species['chapter'])"
            />

            <p
              v-for="tradition in getChapterTraditions(species['chapter'])"
              v-if="
                feature.name.indexOf('Honour the Chapter') >= 0 &&
                species['chapter']
              "
              :key="tradition.key"
              class="ml-4 mr-4"
            >
              <strong
                >{{ tradition.name }}
                <span v-if="tradition.origin">({{ tradition.origin }})</span
                >:</strong
              >
              {{ tradition.effect }}
            </p>
          </div>
           -->
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SpeciesPreview from "~/components/forge/SpeciesPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "Manage",
  components: {
    SpeciesPreview,
  },
  mixins: [SluggerMixin, StatRepositoryMixin],
  data() {
    return {
      loading: false,
      species: undefined,
      chapterList: undefined,
      model: [],
    };
  },
  computed: {
    characterSpeciesKey() {
      return this.$store.getters["characters/characterSpeciesKeyById"](
        this.characterId
      );
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters[
        "characters/characterSpeciesAstartesChapterById"
      ](this.characterId);
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
    },
    psychicPowers() {
      return this.$store.getters["characters/characterPsychicPowersById"](
        this.characterId
      );
    },
    sources() {
      return [
        "core",
        "fspg",
        "red1",
        "cos",
        // 'tnh',
        ...this.settingHomebrews,
      ];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    attributes() {
      if (this.species === undefined) return undefined;
      return this.species.prerequisites
        .filter((pre) => pre.group === "attributes")
        .map(
          (pre) => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`
        )
        .join(", ");
    },

    skills() {
      if (
        this.species === undefined ||
        this.species.prerequisites === undefined
      )
        return undefined;
      return this.species.prerequisites
        .filter((pre) => pre.group === "skills")
        .map((pre) => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`)
        .join(", ");
    },
    avatar() {
      if (this.species === undefined) return "";
      return `/img/avatars/species/${this.species.key}.png`;
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.getSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getChapterList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  methods: {
    async getChapterList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/species/chapters/", config);
      this.chapterList = data;
    },
    getSpecies: async function (key) {
      this.loading = true;
      let finalData = {};

      if (key.startsWith("custom-")) {
        const speciesDetails = this.$store.getters["species/getSpecies"](key);
        finalData = speciesDetails;
      } else {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        finalData = data;
      }

      finalData.speciesFeatures
        .filter((feature) => feature.options)
        .forEach((feature) => {
          const enhancements = this.enhancements.filter((modifier) =>
            modifier.source.startsWith(`species.${feature.name}`)
          );
          if (enhancements) {
            enhancements.forEach((e) => {
              let foundInd = /\.(\d)\./.exec(e.source);
              if (foundInd) {
                feature.selected[foundInd[1]] = e.source.split(".").pop();
              }
            });
          } else {
            const enhancement = this.enhancements.find((modifier) =>
              modifier.source.startsWith(`species.${feature.name}`)
            );
            if (enhancement) {
              feature.selected = enhancement.source.split(".").pop();
            }
          }
        });

      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        finalData.chapter = chapter;
      }

      const featuresWithPowers = finalData.speciesFeatures.filter(
        (f) => f.psychicPowers !== undefined
      );
      if (featuresWithPowers) {
        featuresWithPowers.forEach((feature) => {
          feature.psychicPowers.forEach((powerSelections) => {
            this.getPsychicPowerOptions(powerSelections);
            const found = this.psychicPowers.find(
              (p) => p.source && p.source === `species.${powerSelections.name}`
            );
            if (found) {
              console.info(
                `Power ${found.name} found for the species feature ${feature.name} / power ${powerSelections.name}.`
              );
              powerSelections.selected = found.name;
            }
          });
        });
      }

      this.loading = false;
      this.species = finalData;
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit("characters/setCharacterSpecies", {
        id: this.characterId,
        species: { value: undefined, cost: 0 },
      });
    },
    doChangeSpeciesMode() {
      this.$router.push({
        name: "forge-characters-id-builder-species-choose",
        params: { id: this.characterId },
      });
    },
    getChapterTraditions(chapterKey) {
      if (this.chapterList) {
        const chapter =
          this.chapterList.find((a) => a.key === chapterKey) || [];
        if (chapter) {
          return chapter.beliefsAndTraditions;
        }
      }
      return [];
    },
    enableHomebrew(sourceKey) {
      this.$store.commit("characters/enableSettingHomebrews", {
        id: this.characterId,
        content: sourceKey,
      });
    },
    /**
     * clear previous option
     *
     * @param speciesTrait
     */
    setSpeciesTraitOption(speciesTrait, inx) {
      const id = this.characterId;
      const selectedOption = speciesTrait.options.find(
        (o) => o.name === speciesTrait.selected[inx]
      );

      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id,
        source: `species.${speciesTrait.name}.${inx}`,
      });
      // the option has a snippet, that is thus added as a custom ability
      if (selectedOption.snippet) {
        const content = {
          modifications: [
            {
              name: selectedOption.name,
              targetGroup: "abilities",
              targetValue: "",
              effect: selectedOption.snippet,
            },
          ],
          source: `species.${speciesTrait.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit("characters/addCharacterModifications", {
          id,
          content,
        });
      }

      // the selected option has modifications that are saved as such
      if (selectedOption.modifications) {
        const content = {
          modifications: selectedOption.modifications,
          source: `species.${speciesTrait.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit("characters/addCharacterModifications", {
          id,
          content,
        });
      }
    },
    updateAstartesChapter(key) {
      const id = this.characterId;
      const chapter = this.chapterList.find((chapter) => chapter.key === key);

      const content = {
        speciesAstartesChapter: chapter.key,
      };
      this.$store.commit("characters/setCharacterSpeciesAstartesChapter", {
        id,
        ...content,
      });

      this.$store.commit("characters/clearCharacterTalentsBySource", {
        id,
        source: `species.chapter.`,
        cascade: true,
      });
      chapter.beliefsAndTraditions.forEach((bf) => {
        if (bf.modifications) {
          bf.modifications
            .filter((m) => m.targetGroup === "talents")
            .forEach((t) => {
              const talent = {
                name: t.meta.name,
                key: t.targetValue,
                cost: 0,
                placeholder: undefined,
                selected: undefined,
                source: `species.chapter.${chapter.key}`,
              };
              this.$store.commit("characters/addCharacterTalent", {
                id,
                talent,
              });
            });
        }
      });
    },
  },
};
</script>
<style lang="scss">
/********* Сворачивание текста / details  *********/
details {
  margin-left: -8px;
  margin-right: -8px;
  margin-top: 28px;

  summary {
    padding: 8px 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--text-color-title);
    position: relative;
    cursor: pointer;
    background: var(--bg-details-title);
    border-radius: 8px;
    width: auto;
    margin: 0;
    gap: 8px;

    &.h4 {
      font-size: var(--h4-font-size);
      font-weight: 400;
    }
  }

  .content {
    padding: 0 8px;
  }
}

details[open] {
  summary {
    background: none;
    border-radius: 0;
    border-bottom: 1px solid;
    border-color: var(--border);
    margin: 0 0 8px 8px;
    padding: 8px 0;

    .source-data {
      margin-right: 48px;
    }
  }
}

details {
  &.inside {
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 8px;
    background-color: var(--bg-details-title);

    summary {
      border-bottom: 0;
      margin-bottom: 0;
    }
  }
}

details[open] {
  &.inside {
    summary {
      border-bottom: 1px solid;
      border-color: var(--border);
      margin-bottom: 8px;
    }

    padding-bottom: 4px;
  }
}

details[open] {
  &.lvl {
    background-color: var(--bg-details-title);

    .content {
      padding: 4px 8px;
    }
  }
}

summary::marker {
  content: "";
}

summary:before {
  right: 32px;
  position: absolute;
  content: "➕";
  width: 0;
  height: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  opacity: 0.7;
}

details[open] > summary::before {
  content: "➖";
}

@media (max-width: 800px) {
  summary::before {
    right: 28px;
  }
}

summary.h5 {
  font-size: var(--h5-font-size);
  font-weight: 400;
  line-height: 18px;
  margin: 0 0 8px 0;
  color: var(--text-color);
  cursor: pointer;
}

summary.h4:hover,
summary.h5:hover {
  color: var(--text-color);
}

.optional-rules {
  margin-right: 8px;
}

.source-data {
  text-align: right;
  margin-left: auto;
  margin-right: 40px;
  text-transform: uppercase;
  color: var(--text-g-color);
  font-size: var(--main-font-size);
}

h4.separator_card {
  width: 100%;
  margin-left: 8px;
}

.archetype_feet {
  color: var(--text-a-color) !important;
}

.align_left {
  text-align: left !important;
}

details.spoiler {
  padding: 0 0 4px 0;
  margin: 24px -8px 16px -8px;
  border-radius: 8px;

  .content {
    padding: 8px 16px;
  }
}

details[open].spoiler {
  background-color: var(--bg-details-title);

  summary {
    .source-data {
      margin-right: 40px;
    }
  }
}

details[open].spoiler > summary.h4 {
  margin: 0 0 4px 0;
  padding: 8px 8px;
  background: var(--hover);
  border-radius: 8px 8px 0 0;
}

details[open].spoiler > summary::after {
  right: 8px !important;
}

details[open].spoiler h4 > span {
  font-size: calc(var(--h4-font-size) - 2px);
}

details[open].spoiler table {
  background-color: var(--bg-sub-menu);
  border-radius: 8px;
}

details[open].spoiler div > details {
  margin-bottom: 0;
}
</style>
