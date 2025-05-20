<script>

import BaseSelect from "@/views/Base/BaseSelect.vue";
import BaseTextArea from "@/views/Base/BaseTextArea.vue";
import BaseTextField from "@/views/Base/BaseTextField.vue";
import {getPersianTime} from "@/plugins/commonMethods/commonMethods";
import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';

export default {
  name: "DynamicStep",
  components: {
    DatePicker: VuePersianDatetimePicker,
    BaseSelect,
    BaseTextArea,
    BaseTextField
  },
  props: {
    formItems: Array,
    modelValue: Object,
  },
  mounted() {
    this.setModel();
  },
  data() {
    return {
      model: {},
      tempSelection: {},
    }
  },
  watch: {
    'model': {
      handler() {
        this.$emit('update:modelValue', this.model)
      },
      deep: true,
    },
    modelValue: {
      handler(value) {
        this.setModel();
      }
    }
  },
  methods: {
    getPersianTime,
    async validate() {
      const isValid = await this.$refs.form.validate();
      return Promise.resolve(isValid.valid === true)
    },
    rulesGenerator(item) {
      const rules = [];
      if (item.isRequired) {
        rules.push(v => !!v || 'تکمیل این فیلد اجباری است.')
      }
      if ([1, 2, 11].includes(item.type)) {
        if (!!item.minimum) {
          rules.push(v => v && v.toString().length > item.minimum || `حدأقل تعداد کاراکتر برای این فیلد باید ${item.minimum} رقم باشد.`)
        }
        if (!!item.maximum) {
          rules.push(v => v && v.toString().length < item.maximum || `تعداد کاراکترهای مجاز نمی‌تواند بیشتر از ${item.maximum} رقم باشد.`)
        }
      }

      return rules;
    },
    changeItem(item, childItem, event) {
      console.log("EVENT", event)
      if (!this.model[item.key]) {
        this.model[item.key] = [];
      }
      if (!event) {
        this.model[item.key].splice(this.model[item.key].indexOf(childItem.id), 1);
      } else {
        this.model[item.key].push(childItem.id);
      }

      // const hasKey = Object.keys(this.model).includes(item.key)
      // this.formItems.map(formItem => {
      //   if (!formItem.visibilityCondition) {
      //     final.push(formItem)
      //   } else if (hasKey && formItem.visibilityCondition.value === event) {
      //     final.push(formItem)
      //   } else {
      //     this.model[formItem.key] = null;
      //   }
      // })
      // this.finalFormItems = final;
    },
    setModel() {
      this.formItems.map(f => {
        this.model[f.key] = this.modelValue ? this.modelValue[f.key] : null;
        // this.tempSelection ={}
        // if (!f.visibilityCondition) {
        // if (!this.finalFormItems.includes(f)) {
        //   this.finalFormItems.push(f)
        // }

        // }
      })
    },
    getCheckboxIsSelected(item, childItem) {

    }
  },
  computed: {
    finalFormItems() {
      const final = [];
      this.formItems.map(f => {
        if (!f['visibilityCondition']) {
          final.push(f)
        } else {
          if (f['visibilityCondition']) {
            if (this.model[f.visibilityCondition.key] === f.visibilityCondition.value) {
              final.push(f)
            }
          }
        }
      })
      return final;
    },
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
              hide-details="auto"
              :type="item.type === 11 ? 'number': ''"
              :required-symbol="item.isRequired"
              :rules="rulesGenerator(item)"
          />
          <base-text-area
              v-if="item.type === 2"
              :label="item.label"
              :class="item.size"
              hide-details="auto"
              v-model="model[item.key]"
              :required-symbol="item.isRequired"
              :rules="rulesGenerator(item)"
          />


          <div
              :class="item.size"
              v-if="item.type === 5">
            <div>
              <div class="required--symbol">
                <small v-if="item.isRequired">*</small>
                {{ item.label }}
              </div>
            </div>
            <v-radio-group

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
                hide-details="auto"
                :multiple="item.type === 7"
                :required-symbol="item['isRequired']"
                :rules="rulesGenerator(item)"
            />
          </template>


          <template v-if="item.type === 8">

            <div
                :class="item.size">
              <v-text-field
                  :id="item.key"
                  :model-value="model[item.key]? getPersianTime(model[item.key], 'YYYY/MM/DD'):null"
                  :label="item.label"
                  prepend-inner-icon="mdi-calendar-clock"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details="auto"
                  :rules="rulesGenerator(item)"
                  dense
                  clearable
                  @click:clear="model.birthDate = null">
                <template v-slot:label>
                  <div class="required--symbol">
                    {{ item.label }}
                    <small v-if="item.isRequired">*</small>
                  </div>
                </template>

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
            <div class="v-col-12">
              <label>{{ item.label }}</label>
              <div class="v-row mt-2 mb-5">
                <v-checkbox
                    hide-details
                    v-for="(childItem) in item.children"
                    class="v-col-sm-12 v-col-md-6 py-0"
                    :label="childItem.text"
                    :true-value="true"
                    :false-value="false"
                    @update:modelValue="changeItem(item, childItem, $event)"/>
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
