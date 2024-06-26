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
          <base-text-field
              label="وضعیت تک فرزندی"
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
  components: {BaseSelect, BaseTextField},
  computed: {
    ...mapGetters(['lifeSituationItems'])
  },
  data() {
    return {
      isValid: false,
      model: {
        singleChild: 0,
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
  }
}
</script>


<style scoped>

</style>