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
      </div>
    </v-container>
  </v-form>
</template>
<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: 'EducationalStatus',
  components: {BaseSelect},
  data() {
    return {
      isValid: false,
      items: {
        educationGrade: [],
      },
      model: {
        educationGrade: null,
      }
    }
  }
}
</script>

<style scoped>

</style>