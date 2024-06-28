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
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="رشته تحصیلی"
                      v-model="model.educationField"
                  />
                </div>
              </div>
            </div>
            <div class="v-col-12">
              <v-radio-group
                  hide-details
                  v-model="model.educationLocation"
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
                  v-model="model.educationField"
              />
            </div>


            <div
                v-if="model.educationLocation === 2"
                class="v-col-12">
              <base-select
                  label="شهرستان"
              />
            </div>


            <div class="v-col-12">
              <div class="v-row">
                <div class="v-col-12">
                  <base-text-field
                      label="معدل"
                      v-model="model.average"
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام مدرسه"
                      v-model="model.schoolName"
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام مدیر"
                      v-model="model.managerName"
                  />
                </div>
                <div class="v-col-12">
                  <base-text-field
                      label="نام معاون پرورشی"
                      v-model="model.breedingAssistantName"
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
  data() {
    return {
      isValid: false,
      items: {
        educationGrade: [
          {title: 'متوسطه اوّل', value: 1},
          {title: 'متوسطه دوّم', value: 2},
        ],
        juniorSchoolItems: [
          {title: 'دهم', value: 1},
          {title: 'یازدهم', value: 2},
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
        educationLocation: null,
        average: null,
        schoolName: null,
        managerName: null,
        breedingAssistantName: null,
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