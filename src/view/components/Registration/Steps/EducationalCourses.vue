<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-12">
          <base-select
              v-model="model.tarheVelayat"
              label="طرح ولایت"
              :items="items.tarheVelayat"
          />
        </div>
        <div class="v-col-12">
          <base-select
              label="آستان قدس"
              v-model="model.astaneQods"
              multiple
              :items="items.astaneQods"
          />
        </div>
        <div class="v-col-12">
          <base-select
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
  data() {
    return {
      isValid: false,
      items: {
        tarheVelayat: [
          {title: 'شرکت نکرده‌ام', value: -1},
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