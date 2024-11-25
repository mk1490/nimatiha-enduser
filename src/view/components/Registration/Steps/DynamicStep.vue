<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseTextArea from "../../../widget/Base/BaseTextArea.vue";
import BaseSelect from "../../../widget/Base/BaseSelect.vue";

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
    })
  },
  data() {
    return {
      model: {},
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
    rulesGenerator(item) {
      const rules = [];

      if (item.isRequired) {
        rules.push(v => !!v || 'تکمیل این فیلد اجباری است.')
      }

      return rules;
    }
  }
}
</script>

<template>

  <v-form
      ref="form"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <template v-for="item in formItems">
          <base-text-field
              v-if="item.type === 1"
              :label="item.label"
              :class="item.size"
              v-model="model[item.key]"
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


          <template v-if="item.type === 5">
            <div>
              <label>{{ item.label }}</label>
            </div>
            <div class="d-block">
              <v-radio-group
                  :class="item.size"
                  direction="horizontal"
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
          </template>


          <template v-if="[6, 7].includes(item.type)">
            <base-select
                :label="item.label"
                :class="item.size"
                :items="item.children"
                v-model="model[item.key]"
                item-title="text"
                item-value="value"
                :multiple="item.type === 7"
                :required-symbol="item.isRequired"
                :rules="rulesGenerator(item)"
            />
          </template>

        </template>
      </div>
    </v-container>
  </v-form>

</template>

<style scoped>

</style>
