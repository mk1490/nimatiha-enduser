<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div class="v-col-6">
          <v-checkbox
              hide-details
              label="تجوید"
          />
        </div>
        <div class="v-col-6">
          <v-checkbox
              hide-details
              label="مفاهیم"
          />
        </div>
        <div class="v-col-12">
          <div class="v-row">
            <div class="v-col">
              <v-checkbox
                  hide-details
                  label="حفظ"
              />
            </div>
            <div class="v-col">
              <base-text-field
                  label="تعداد جزء"
              />
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
  name: 'EducationalAndCulturalHistory',
  components: {BaseTextField},
  data() {
    return {
      isValid: false,
    }
  }
}
</script>

<style scoped>

</style>