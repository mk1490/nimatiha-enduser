<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div
            v-if="formShowing('name')"
            class="v-col-md-4 v-col-sm-12">
          <base-text-field
              label="نام"
              :rules="rules.name"
              v-model="model.name"
          />
        </div>
        <div
            v-if="formShowing('family')"
            class="v-col-md-4 v-col-sm-12">
          <base-text-field
              label="نام خانوادگی"
              :rules="rules.family"
              v-model="model.family"
          />
        </div>
        <div
            v-if="formShowing('fatherName')"
            class="v-col-md-4 v-col-sm-12">
          <base-text-field
              label="نام پدر"
              :rules="rules.fatherName"
              v-model="model.fatherName"
          />
        </div>
        <div
            v-if="formShowing('nationalCode')"
            class="v-col-md-4 v-col-sm-12">
          <base-text-field
              label="کد ملّی"
              dir="ltr"
              type="tel"
              :rules="rules.nationalCode"
              v-model="model.nationalCode"
          />
        </div>
        <div
            v-if="formShowing('birthDate')"
            class="v-col-md-4 v-col-sm-12">
          <v-text-field
              id="date-picker"
              :model-value="model.birthDate? getPersianTime(model.birthDate, 'jYYYY/jMM/jDD'):null"
              label="تاریخ تولّد"
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
              density="compact"
              readonly
              hide-details
              dense
              clearable
              @click:clear="model.birthDate = null"
              v-bind="props">
          </v-text-field>
          <datePicker
              v-model="model.birthDate"
              simple
              element="date-picker"
              format="YYYY-MM-DD"
              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)">

          </datePicker>
        </div>
        <div
            v-if="formShowing('disabilityStatus')"
            class="v-col-md-4 v-col-sm-12">
          <base-select
              label="وضعیت معلولیت"
              :items="disabilityStatus"
              v-model="model.disabilityStatus"
              :rules="rules.disabilityStatus"
          />
        </div>

        <div
            v-if="model.disabilityStatus === 2"
            class="v-col-sm-12 v-col-md-12 v-col-lg-12">
          <base-text-area
              label="توضیحات معلولیت"
              v-model="model.disabilityDescription"
              :rules="rules.disabilityDescription"
          />
        </div>


        <div class="v-col-12">
          <div class="v-row">
            <div
                v-if="formShowing('religion')"
                class="v-col-sm-4 v-col-sm-12">
              <base-select
                  label="مذهب"
                  :items="religionItems"
                  v-model="model.religion"
                  :rules="rules.religion"
              />
            </div>

            <div
                v-if="formShowing('illnessHistory')"
                class="v-col-sm-4 v-col-sm-12">
              <base-select
                  label="سابقه بیماری"
                  :items="diseaseBackgroundItems"
                  v-model="model.diseaseBackground"
                  :rules="rules.diseaseBackground"
              />
            </div>
            <div
                v-if="model.diseaseBackground === 1 && formShowing('illnessHistory')"
                class="v-col-12">
              <base-text-area
                  label="شرح سابقه بیماری"
                  v-model="model.diseaseBackgroundDescription"
                  :rules="rules.diseaseBackgroundDescription"
              />
            </div>
          </div>
        </div>


        <div
            v-if="formShowing('city')"
            class="v-col-sm-12 v-col-md-12 v-col-lg-12">
          <base-auto-complete
              label="شهرستان محل سکونت"
              :items="cityItems"
              v-model="model.city"
              :rules="rules.city"
              hide-details="auto"
          />
        </div>
        <div
            v-if="formShowing('address')"
            class="v-col-sm-12 v-col-md-12 v-col-lg-12">
          <base-text-area
              label="نشانی محل سکونت"
              v-model="model.address"
              :rules="rules.address"
              hide-details="auto"
          />
        </div>


      </div>
    </v-container>
  </v-form>
</template>
<script>

import {mapGetters} from "vuex";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";
import BaseAutoComplete from "@/view/widget/Base/BaseAutoComplete.vue";

export default {
  name: 'StepOneGeneralInformation',
  components: {BaseAutoComplete, BaseTextArea, BaseSelect},
  props: {
    modelValue: String,
  },
  created() {
    this.httpGet(`/member-request/initialize/general-information?questionnaireId=${localStorage.getItem('testId')}`, result => {
      this.$store.commit('SET_DISABILITY_ITEMS', result.initialize.disabilityStatus);
      this.$store.commit('SET_DISEASE_BACKGROUND_ITEMS', result.initialize.diseaseBackgroundItems);
      this.$store.commit('SET_RELIGION_ITEMS', result.initialize.religionItems);
      this.$store.commit('SET_CITY_ITEMS', result.initialize.cityItems);
      this.disabledForms = result.disabledForms;
      Object.keys(result.model).map(f => {
        this.model[f] = result.model[f];
      })
    })
  },
  emits: ['update:modelValue'],
  data() {
    return {
      disabledForms: [],
      model: {
        name: null,
        family: null,
        fatherName: null,
        educationLevel: null,
        disabilityStatus: null,
        maritalStatus: null,
        nationalCode: null,
        birthDate: null,
        address: null,
        mobileNumber: null,
        diseaseBackground: null,
        diseaseBackgroundDescription: null,
        disabilityDescription: null,
        city: null,
      },
      rules: {
        projectId: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        diseaseBackground: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        diseaseBackgroundDescription: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        name: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        partnerJob: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        family: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        fatherName: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        religion: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        city: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        birthCertificateNumber: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
          v => v && v.length <= 11 || 'شماره شناسنامه نمی‌تواند بیشتر از 11 رقم باشد.',
        ],
        maritalStatus: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
        ],
        nationalCode: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
          v => v && v.length <= 11 || 'کد ملّی نمی‌تواند بیشتر از 11 رقم باشد.',
          v => v && v.length >= 10 || 'کد ملّی نمی‌تواند کمتر از 11 رقم باشد.',
        ],
        birthDate: [],
        birthPlace: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        job: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        address: [v => !!v || 'تکمیل این فیلد اجباری است.'],

      },
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
  computed: {
    ...mapGetters([
      'educationLevels',
      'maritalStatus',
      'disabilityStatus',
      'religionItems',
      'diseaseBackgroundItems',
      'cityItems'
    ])
  },
  methods: {
    async validate() {
      return await this.$refs.form.validate();
    },
    formShowing(valueName) {
      if (!this.disabledForms.includes(valueName))
        return true;
      return false;
    }
  }
}
</script>

<style scoped>

</style>
