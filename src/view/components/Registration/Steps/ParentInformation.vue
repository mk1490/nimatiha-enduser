<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-12">
          <v-label>
            مشخصات پدر
          </v-label>
        </div>
        <div class="v-col-6">
          <base-text-field
              label="نام"
              v-model="model.father.name"
          />
        </div>
        <div class="v-col-6">
          <base-text-field
              label="نام خانوادگی"
              v-model="model.father.family"
          />
        </div>
        <div class="v-col-6">
          <base-select
              label="تحصیلات"
              v-model="model.father.educationLevel"
              :items="educationLevels"
          />
        </div>
        <div class="v-col-6">
          <base-select
              label="وضعیت حیات"
              :items="lifeSituationItems"
              v-model="model.father.lifeSituation"
          />
        </div>
      </div>
      <div class="v-row">
        <div class="v-col-12">
          <v-label>
            مشخصات مادر
          </v-label>
        </div>
        <div class="v-col-6">
          <base-text-field
              label="نام"
              v-model="model.mother.name"
          />
        </div>
        <div class="v-col-6">
          <base-text-field
              label="نام خانوادگی"
              v-model="model.mother.family"
          />
        </div>
        <div class="v-col-6">
          <base-select
              label="تحصیلات"
              v-model="model.mother.educationLevel"
              :items="educationLevels"
          />
        </div>
        <div class="v-col-6">
          <base-select
              label="وضعیت حیات"
              :items="lifeSituationItems"
              v-model="model.mother.lifeSituation"
          />
        </div>
      </div>
      <div class="v-row">
        <div class="v-col-12">
          <v-label>
            وضعیت خانوادگی
          </v-label>
        </div>
        <div class="v-col-6">
          <base-select
              label="وضعیت تک فرزندی"
              :items="items.singleChildItems"
              v-model="model.singleChild"
          />
        </div>
        <div class="v-col-6">
          <base-text-field
              label="تعداد اعضای خانواده"
              v-model="model.familyMembers"
          />
        </div>
      </div>

    </v-container>
  </v-form>
</template>
<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import {mapGetters} from "vuex";

export default {
  name: 'ParentInformation',
  emits: ['update:modelValue'],
  components: {BaseSelect, BaseTextField},
  computed: {
    ...mapGetters(['lifeSituationItems', 'singleChildItems', 'educationLevels'])
  },
  created() {
    this.httpGet(`/member-request/initialize/parent-information`, async (result) => {
      await this.$store.commit('SET_EDUCATION_LEVEL_ITEMS', result.initialize.educationLevels);
      await this.$store.commit('SET_LIFE_SITUATION_ITEMS', result.initialize.lifeSituationItems);
      this.items.singleChildItems = result.initialize.singleChildItems;
      Object.keys(result.model).map(f => {
        this.model[f] = result.model[f];
      })
    })
  },
  data() {
    return {
      isValid: false,
      items: {
        singleChildItems: []
      },
      model: {
        singleChild: null,
        familyMembers: 0,
        father: {
          name: null,
          family: null,
          educationLevel: null,
          lifeSituation: null,
        },
        mother: {
          name: null,
          family: null,
          educationLevel: null,
          lifeSituation: null,
        }

      }
    }
  },
  watch: {
    'model': {
      handler() {
        this.$emit('update:modelValue', this.model)
      },
      deep: true,
    }
  },
}
</script>


<style scoped>

</style>