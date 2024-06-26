<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-12">
          <base-select
              label="طرح ولایت"
              :items="['حوزه‌ای', 'استانی']"
          />
        </div>
        <div class="v-col-12">
          <base-select
              label="آستان قدس"
              multiple
              :items="['بی‌نهایت شو', 'برهان']"
          />
        </div>
        <div class="v-col-12">
          <base-select
              label="اوقاف"
              multiple
              :items="['حفظ', 'قرائت', 'ترتیل']"
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
  data() {
    return {
      isValid: false,
    }
  }
}
</script>


<style scoped>

</style>