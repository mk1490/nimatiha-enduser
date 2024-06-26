<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div
            v-for="(item, index) in items"
            class="v-col-12">
          <div class="v-row">
            <div class="v-col-12">
              <v-checkbox
                  density="compact"
                  hide-details
                  :label="item.title"
                  @update:model-value="onSelection(index, $event)"
              />
            </div>
            <div
                v-if="item.selected"
                class="v-col-12">
              <div class="v-row">
                <div class="v-col-6">
                  <base-text-field
                      label="عنوان رشته"
                  />
                </div>
                <div class="v-col-6">
                  <base-text-field
                      label="رتبه استانی یا کشوری"
                  />
                </div>
                <div class="v-col-12">
                  <base-select
                      label="سطح"
                      :items="['مبتدی','نیمه حرفه‌ای', 'حرفه‌ای']"
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
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: 'EducationalAndCulturalHistory',
  components: {BaseSelect, BaseTextArea, BaseTextField},
  created() {
    ['تجوید', 'مفاهیم', 'حفظ', 'احکام', 'قرائت', 'نهج البلاغه', 'مکبری', 'صحیفه سجادیه', 'سایر'].map(f => {
      this.items.push({
        title: f,
      })
    })
  },
  data() {
    return {
      isValid: false,
      items: []
    }
  },
  methods: {
    onSelection(index, event) {
      this.items[index].selected = event;
    }
  }
}
</script>

<style scoped>

</style>