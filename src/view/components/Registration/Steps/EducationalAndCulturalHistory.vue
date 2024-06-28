<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="(categoryItem, categoryIndex) in Object.keys(categorizedItems())">
            <v-expansion-panel-title>
              {{ categorizedItems()[categoryItem][0].categoryTitle }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                  class="v-col-12"
                  v-for="(item, index) in (categorizedItems()[categoryItem])">
                <div class="v-row">
                  <div class="v-col-12">
                    <v-checkbox
                        :model-value="item.selected"
                        density="compact"
                        hide-details
                        :label="item.title"
                        @update:model-value="onSelection(item.title, categoryItem, $event)"
                    />
                  </div>
                  <div
                      v-if="item.selected"
                      class="v-col-12">
                    <div class="v-row">
                      <div class="v-col-6">
                        <base-text-field
                            v-model="item.fieldTitle"
                            label="عنوان رشته"
                        />
                      </div>
                      <div class="v-col-6">
                        <base-text-field
                            v-model="item.rank"
                            label="رتبه استانی یا کشوری"
                        />
                      </div>
                      <div class="v-col-12">
                        <base-select
                            v-model="item.level"
                            label="سطح"
                            :items="['مبتدی','نیمه حرفه‌ای', 'حرفه‌ای']"
                        />
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: 'EducationalAndCulturalHistory',
  emits: ['update:modelValue'],
  components: {BaseSelect, BaseTextField},
  created() {
    ['تجوید', 'مفاهیم', 'حفظ', 'احکام', 'قرائت', 'نهج البلاغه', 'مکبری', 'صحیفه سجادیه', 'سایر'].map(f => {
      this.items.push({
        title: f,
        category: 'qurani',
        categoryTitle: 'رشته‌های قرآنی'
      })
    });

    ['سرود', 'نمایش', 'نقاشی', 'سفال‌گری', 'خوش‌نویسی', 'عکاسی', 'فتوشاپ', 'تدوین', 'نشریه', 'مدّاحی', 'سایر'].map(f => {
      this.items.push({
        title: f,
        category: 'artistic',
        categoryTitle: 'رشته‌های هنری'
      })
    });

    ['والیبال', 'بسکتبال', 'هندبال', 'تنیس', 'فوتبال', 'کاراته', 'جودو', 'اسکیت', 'شنا', 'دوچرخه‌سواری', 'کشتی', 'زورخانه', 'کبدی', 'فوتسال', 'تیراندازی', 'سایر'].map(f => {
      this.items.push({
        title: f,
        category: 'sport',
        categoryTitle: 'رشته‌های ورزشی'
      })
    })


    this.httpGet(`/member-request/initialize/educational-historical`, result => {
      this.items.map((item) => {
        const index = this.items.findIndex(x => x.category === item.category && x.categoryTitle === item.categoryTitle)
        console.log(item.category, item.categoryTitle)
        console.log(index);
      })
    })
  },
  data() {
    return {
      isValid: false,
      items: [],
    }
  },
  methods: {
    onSelection(categoryTitle, category, event) {
      const index = this.items.findIndex(x => x.title === categoryTitle && x.category === category)
      this.items[index].selected = event;
    },
    categorizedItems() {
      return Object.groupBy(this.items, ({category}) => category)
    }
  },
  watch: {
    'items': {
      handler() {
        this.$emit('update:modelValue', this.items.filter(x => x.selected === true))
      },
      deep: true,
    }
  },

}
</script>

<style scoped>

</style>