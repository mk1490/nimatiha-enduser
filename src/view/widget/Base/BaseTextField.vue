<template>
  <div>
    <v-text-field
        :model-value="model"
        @update:modelValue="updateModelValue"
        :label="label"
        :type="type"
        :disabled="disabled"
        :prefix="prefix"
        :suffix="suffix"
        :rules="rules"
        density="compact"
        :dir="dir"
        :hide-details="rules.length > 0 ? 'auto': true"
        :variant="variant">
      <template v-slot:label>
        <div class="required--symbol">
          {{ label }}
          <small v-if="requiredSymbol">*</small>
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "BaseTextField",
  mounted() {
    this.model = this.modelValue;
  },
  props: {
    modelValue: String,
    label: String,
    prefix: String,
    suffix: String,
    disabled: Boolean,
    type: undefined,
    dir: undefined,
    rules: {
      type: Array,
      default: () => [],
    },
    variant: {
      type: String,
      default: () => 'outlined',
    },
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: null,
    }
  },
  methods: {
    updateModelValue(event) {
      this.model = event;
      this.$emit('update:modelValue', event)
    }
  },
  watch: {
    'modelValue': {
      handler(value) {
        this.model = value;
      },
    },

  }
}
</script>

<style scoped>

</style>