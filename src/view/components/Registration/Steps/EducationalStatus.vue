<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-12">
          <base-select
              label="مقطع"
              :items="items.educationGrade"
              v-model="model.educationGrade"
              required-symbol
          />
        </div>


        <div
            v-if="model.educationGrade"
            class="v-col-12">
          <div
              class="v-row">

            <div
                v-if="model.educationGrade === 1"
                class="v-col-12">
              <base-select
                  label="پایه"
                  :items="items.juniorSchoolItems"
                  v-model="model.schoolGrade"
                  :rules="rules.schoolGrade"
                  required-symbol
              />
            </div>
            <div
                v-if="model.educationGrade === 2"
                class="v-col-12">
              <div class="v-row">
                <div class="v-col-12">
                  <base-select
                      label="پایه"
                      :items="items.highSchoolItems"
                      v-model="model.schoolGrade"
                      :rules="rules.schoolGrade"
                      required-symbol
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="رشته تحصیلی"
                      v-model="model.educationField"
                      :rules="rules.educationField"
                      required-symbol
                  />
                </div>
              </div>
            </div>
            <div class="v-col-12">
              <v-radio-group
                  hide-details
                  v-model="model.educationLocation"
                  :rules="rules.educationLocation"
                  label="محل تحصیل"
                  inline>
                <v-radio
                    label="مشهد"
                    :value="1"/>
                <v-radio
                    label="شهرستان"
                    :value="2"/>
              </v-radio-group>
            </div>


            <div v-if="model.educationLocation === 1"
                 class="v-col-12">
              <base-select
                  label="ناحیه"
                  :items="items.zoneItems"
                  v-model="model.educationZone"
                  :rules="rules.educationZone"
                  required-symbol
              />
            </div>


            <div
                v-if="model.educationLocation === 2"
                class="v-col-12">
              <base-select
                  label="شهرستان"
                  :items="items.cities"
                  v-model="model.educationCity"
                  :rules="rules.educationZone"
                  required-symbol
              />
            </div>


            <div
                v-if="model.educationLocation"
                class="v-col-12">
              <div class="v-row">
                <div class="v-col-12">
                  <base-text-field
                      label="معدل"
                      v-model="model.average"
                      required-symbol
                      :rules="rules.average"
                      type="number"
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام مدرسه"
                      v-model="model.schoolName"
                      :rules="rules.schoolName"
                      required-symbol
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام مدیر"
                      v-model="model.managerName"
                      :rules="rules.managerName"
                      required-symbol
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام معاون پرورشی"
                      v-model="model.breedingAssistantName"
                      :rules="rules.breedingAssistantName"
                      required-symbol
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </v-container>
  </v-form>
</template>
<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";

export default {
  name: 'EducationalStatus',
  components: {BaseTextArea, BaseTextField, BaseSelect},
  emits: ['update:modelValue'],
  created() {
    this.httpGet(`/member-request/initialize/educational-status`, result => {
      this.items.cities = result.items.cities;

      Object.keys(result.model).map(f => {
        this.model[f] = result.model[f];
      })
    })

  },
  data() {
    return {
      isValid: false,
      items: {
        cities: [],
        educationGrade: [
          {title: 'متوسطه اوّل', value: 1},
          {title: 'متوسطه دوّم', value: 2},
        ],
        juniorSchoolItems: [
          {title: 'هفتم', value: 1},
          {title: 'هشتم', value: 2},
          {title: 'نهم', value: 3},
        ],
        highSchoolItems: [
          {title: 'دهم', value: 1},
          {title: 'یازدهم', value: 2},
        ],
        zoneItems: [
          {title: 'یک', value: 1},
          {title: 'دو', value: 2},
          {title: 'سه', value: 3},
          {title: 'چهار', value: 4},
          {title: 'پنج', value: 5},
          {title: 'شش', value: 6},
          {title: 'هفت', value: 7},
          {title: 'تبادکان', value: 8},
        ],
      },
      model: {
        educationGrade: null,
        schoolGrade: null,
        educationField: null,
        educationCity: null,
        educationZone: null,
        educationLocation: null,
        average: null,
        schoolName: null,
        managerName: null,
        breedingAssistantName: null,
      },
      rules: {
        educationGrade: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        schoolGrade: [v => !!v || 'انتخاب این فیلد اجباری است.'],
        educationField: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        educationZone: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        average: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
          v => Number(v) <= 20 || 'مقدار این فیلد نمی‌تواند بیشتر از 20 باشد.'
        ],
        schoolName: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        managerName: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        breedingAssistantName: [v => !!v || 'تکمیل این فیلد اجباری است.'],
      }
    }
  },
  methods: {
    async validate() {
      return await this.$refs.form.validate()
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