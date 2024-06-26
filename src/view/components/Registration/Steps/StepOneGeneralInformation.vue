<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-4">
          <base-text-field
              label="نام"
              :rules="rules.name"
              v-model="model.name"
          />
        </div>
        <div class="v-col-4">
          <base-text-field
              label="نام خانوادگی"
              :rules="rules.family"
              v-model="model.family"
          />
        </div>
        <div class="v-col-4">
          <base-text-field
              label="نام پدر"
              :rules="rules.fatherName"
              v-model="model.fatherName"
          />
        </div>
        <div class="v-col-4">
          <base-text-field
              label="کد ملّی"
              dir="ltr"
              type="tel"
              :rules="rules.nationalCode"
              v-model="model.nationalCode"
          />
        </div>
        <div class="v-col-4">
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
        <div class="v-col-4">
          <base-select
              label="مذهب"
              :items="religionItems"
              v-model="model.religion"
              :rules="rules.religion"
          />
        </div>
        <div class="v-col-12">
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
          <base-select
              label="سابقه بیماری"
              :items="diseaseBackgroundItems"
              v-model="model.diseaseBackground"
              :rules="rules.diseaseBackground"
          />
        </div>

        <div
            class="v-col-sm-12 v-col-md-12 v-col-lg-12">
          <base-text-area
              label="نشانی محل سکونت"
              v-model="model.address"
              :rules="rules.address"
          />
        </div>


      </div>
    </v-container>
  </v-form>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  name: 'StepOneGeneralInformation',
  props: {
    modelValue: String,
  },
  created() {
    this.httpGet(`/member-request/initialize/general-information`, result => {
      Object.keys(result.model).map(f => {
        this.model[f] = result.model[f];
      })
      this.$store.commit('SET_DISABILITY_ITEMS', result.initialize.disabilityStatus)
      this.$store.commit('SET_MARITAL_ITEMS', result.initialize.maritalStatus)
      this.$store.commit('SET_EDUCATION_LEVEL_ITEMS', result.initialize.educationLevels)

    })
  },
  emits: ['update:modelValue'],
  data() {
    return {
      model: {
        name: null,
        family: null,
        fatherName: null,
        educationLevel: null,
        childrenCounts: 0,
        disabilityStatus: null,
        partnerJob: null,
        maritalStatus: null,
        nationalCode: null,
        birthDate: null,
        address: null,
        mobileNumber: null,
      },
      rules: {
        projectId: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        name: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        partnerJob: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        family: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        fatherName: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        religion: [v => !!v || 'تکمیل این فیلد اجباری است.'],
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

      },
    }
  },
  watch: {
    'model': {
      handler(value) {
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
      'diseaseBackgroundItems'
    ])
  }
}
</script>

<style scoped>

</style>