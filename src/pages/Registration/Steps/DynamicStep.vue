<script>

import BaseSelect from "@/views/Base/BaseSelect.vue";
import BaseTextArea from "@/views/Base/BaseTextArea.vue";
import BaseTextField from "@/views/Base/BaseTextField.vue";

export default {
  name: "DynamicStep",
  components: {BaseSelect, BaseTextArea, BaseTextField},
  props: {
    formItems: Array,
    modelValue: Object,
  },
  created() {

    this.formItems.map(f => {
      this.model[f.key] = null
      if (!f.visibilityCondition) {
        this.finalFormItems.push(f)
      }
    })
  },
  data() {
    return {
      model: {},
      finalFormItems: [],
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
  methods: {
    async validate() {
      const isValid = await this.$refs.form.validate();
      return Promise.resolve(isValid.valid == true)
    },
    rulesGenerator(item) {
      const rules = [];

      if (item.isRequired) {
        rules.push(v => !!v || 'تکمیل این فیلد اجباری است.')
      }

      if ([1, 2, 11].includes(item.type)) {
        if (item.minimum != null) {
          rules.push(v => v.toString().length > item.minimum || `حدأقل تعداد کاراکتر برای این فیلد باید ${item.minimum} رقم باشد.`)
        }
        if (item.maximum != null) {
          rules.push(v => v.toString().length < item.maximum || `تعداد کاراکترهای مجاز نمی‌تواند بیشتر از ${item.maximum} رقم باشد.`)
        }
      }

      return rules;
    },
    changeItem(item, event) {
      const final = [];
      this.finalFormItems = []
      const hasKey = Object.keys(this.model).includes(item.key)
      this.formItems.map(formItem => {
        if (!formItem.visibilityCondition) {
          final.push(formItem)
        } else if (hasKey && formItem.visibilityCondition.value === event) {
          final.push(formItem)
        } else {
          this.model[formItem.key] = null;
        }
      })
      this.finalFormItems = final;
    }
  },
}
</script>

<template>

  <v-form
      ref="form"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <template v-for="item in finalFormItems">
          <base-text-field
              v-if="[1, 11].includes(item.type)"
              :label="item.label"
              :class="item.size"
              v-model="model[item.key]"
              :type="item.type === 11 ? 'number': ''"
              :required-symbol="item.isRequired"
              :rules="rulesGenerator(item)"
          />
          <base-text-area
              v-if="item.type === 2"
              :label="item.label"
              :class="item.size"
              v-model="model[item.key]"
              :required-symbol="item.isRequired"
              :rules="rulesGenerator(item)"
          />


          <div
              :class="item.size"
              v-if="item.type === 5">
            <div>
              <label>{{ item.label }}</label>
            </div>
            <v-radio-group
                inline
                v-model="model[item.key]"
                :rules="rulesGenerator(item)">
              <v-radio
                  v-for="childItem in item.children"
                  :label="childItem.text"
                  :value="childItem.value"
                  :key="childItem.value"
              />
            </v-radio-group>
          </div>


          <template v-if="[4, 6, 7].includes(item.type)">
            <base-select
                :label="item.label"
                :class="item.size"
                :items="item.children"
                v-model="model[item.key]"
                @update:modelValue="changeItem(item, $event)"
                item-title="text"
                item-value="value"
                :multiple="item.type === 7"
                :required-symbol="item.isRequired"
                :rules="rulesGenerator(item)"
            />
          </template>


          <template v-if="item.type === 8">

            <div
                :class="item.size">
              <v-text-field
                  :id="item.key"
                  :model-value="model[item.key]? getPersianTime(model[item.key], 'jYYYY/jMM/jDD'):null"
                  :label="item.label"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  dense
                  clearable
                  @click:clear="model.birthDate = null">
              </v-text-field>
              <datePicker
                  v-model="model[item.key]"
                  simple
                  :element="item.key"
                  format="YYYY-MM-DD"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)">
              </datePicker>
            </div>
          </template>


          <template v-if="item.type === 10">

            <div :class="item.size">

              <div class="d-inline-flex align-center">
                <label>{{ item.label }}</label>
                <v-checkbox
                    hide-details
                    v-for="childItem in item.children"
                    class="mx-2"
                    :label="childItem.text"
                >

                </v-checkbox>
              </div>
            </div>
          </template>


        </template>
      </div>
    </v-container>
  </v-form>

</template>

<style scoped>

</style>
