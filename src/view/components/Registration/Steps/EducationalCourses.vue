<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-12">
          <v-radio-group
              v-model="model.tarheVelayatStatus"
              label="طرح ولایت"
              hide-details
              density="comfortable"
              inline>
            <v-radio
                :value="1"
                label="شرکت‌ ننموده‌ام"/>
            <v-radio
                :value="2"
                label="شرکت‌ نموده‌ام"/>
          </v-radio-group>


          <base-select
              v-if="model.tarheVelayatStatus == 2"
              v-model="model.tarheVelayat"
              label="طرح ولایت"
              :items="items.tarheVelayat"
          />
        </div>
        <div class="v-col-12">
          <v-radio-group
              v-model="model.astaneQodsStatus"
              hide-details
              density="comfortable"
              label="آستان قدس"
              inline>
            <v-radio
                :value="1"
                label="شرکت‌ ننموده‌ام"/>
            <v-radio
                :value="2"
                label="شرکت‌ نموده‌ام"/>
          </v-radio-group>

          <base-select
              v-if="model.astaneQodsStatus === 2"
              label="آستان قدس"
              v-model="model.astaneQods"
              multiple
              :items="items.astaneQods"
          />
        </div>
        <div class="v-col-12">

          <v-radio-group
              v-model="model.oqafStatus"
              hide-details
              density="comfortable"
              label="آستان قدس"
              inline>
            <v-radio
                :value="1"
                label="شرکت‌ ننموده‌ام"/>
            <v-radio
                :value="2"
                label="شرکت‌ نموده‌ام"/>
          </v-radio-group>

          <base-select
              v-if="model.oqafStatus === 2"
              v-model="model.oqaf"
              label="اوقاف"
              multiple
              :items="items.oqaf"
          />
        </div>
      </div>

    </v-container>
  </v-form>
</template>

<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "EducationalCourses",
  components: {BaseSelect},
  emits: ['update:modelValue'],
  created() {
    this.httpGet(`/member-request/initialize/educational-courses`, result => {
      this.model = {...result}
    })
  },
  data() {
    return {
      isValid: false,
      items: {
        tarheVelayat: [
          {title: 'استانی', value: 1},
          {title: 'حوزه‌ای', value: 2},
        ],
        astaneQods: [
          {title: 'بی‌نهایت شو', value: 1},
          {title: 'برهان', value: 2},
        ],
        oqaf: [
          {title: 'ترتیل', value: 1},
          {title: 'قرائت', value: 2},
          {title: 'حفظ', value: 3}
        ]
      },
      model: {
        tarheVelayatStatus: null,
        astaneQodsStatus: null,
        oqafStatus: null,
        tarheVelayat: null,
        astaneQods: [],
        oqaf: [],
      }
    }
  },
  watch: {
    'model': {
      handler() {
        this.$emit('update:modelValue', this.items)
      },
      deep: true,
    }
  },
}
</script>


<style scoped>

</style>