<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
  name: "DynamicStep",
  components: {BaseTextField},
  props: {
    formItems: Array,
  },
  data() {
    return {
      model: {},
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
              :label="item.label"
              :class="item.size"
              v-model="model[item.key]"
              :required-symbol="item.isRequired"
              :rules="rulesGenerator(item)"
          />
        </template>
      </div>
    </v-container>
  </v-form>

</template>

<style scoped>

</style>