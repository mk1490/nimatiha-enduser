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
        <div class="v-col-md-6 v-col-sm-12">
          <base-text-field
              label="نام"
              v-model="model.father.name"
              :rules="rules.father.name"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-text-field
              label="نام خانوادگی"
              v-model="model.father.family"
              :rules="rules.father.family"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-select
              label="تحصیلات"
              v-model="model.father.educationLevel"
              :rules="rules.father.educationLevel"
              :items="educationLevels"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-select
              label="وضعیت حیات"
              :items="lifeSituationItems"
              v-model="model.father.lifeSituation"
              :rules="rules.father.lifeSituation"
              required-symbol
          />
        </div>
      </div>
      <div class="v-row">
        <div class="v-col-12">
          <v-label>
            مشخصات مادر
          </v-label>
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-text-field
              label="نام"
              v-model="model.mother.name"
              :rules="rules.mother.name"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-text-field
              label="نام خانوادگی"
              v-model="model.mother.family"
              :rules="rules.mother.family"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-select
              label="تحصیلات"
              v-model="model.mother.educationLevel"
              :rules="rules.mother.educationLevel"
              :items="educationLevels"
              required-symbol
          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-select
              label="وضعیت حیات"
              :items="lifeSituationItems"
              v-model="model.mother.lifeSituation"
              :rules="rules.mother.lifeSituation"
              required-symbol
          />
        </div>
      </div>
      <div class="v-row">
        <div class="v-col-12">
          <v-label>
            وضعیت خانوادگی
          </v-label>
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-select
              label="وضعیت تک فرزندی"
              :items="items.singleChildItems"
              v-model="model.singleChild"
              required-symbol

          />
        </div>
        <div class="v-col-md-6 v-col-sm-12">
          <base-text-field
              label="تعداد اعضای خانواده"
              v-model="model.familyMembers"
              required-symbol
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
      rules: {
        father: {
          name: [v => !!v || 'تکمیل این فیلد اجباری است.'],
          family: [v => !!v || 'تکمیل این فیلد اجباری است.'],
          educationLevel: [v => !!v || 'انتخاب این فیلد اجباری است.'],
          lifeSituation: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        },
        mother: {
          name: [v => !!v || 'تکمیل این فیلد اجباری است.'],
          family: [v => !!v || 'تکمیل این فیلد اجباری است.'],
          educationLevel: [v => !!v || 'انتخاب این فیلد اجباری است.'],
          lifeSituation: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        },
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
  methods: {
    async validate() {
      return await this.$refs.form.validate()
    }
  }
}
</script>


<style scoped>

</style>