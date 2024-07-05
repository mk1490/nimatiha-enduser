<template>
  <v-textarea
      :model-value="model"
      @update:modelValue="$emit('update:modelValue', event)"
      :label="label"
      :type="type"
      :disabled="disabled"
      :hint="hint"
      :hide-details="hideDetails"
      :variant="variant"
      outlined
      dense>
  </v-textarea>
</template>

<script>
export default {
  name: "BaseTextArea",
  created() {
  },
  props: {
    value: undefined,
    label: String,
    hint: String,
    hideDetails: String,
    disabled: Boolean,
    type: undefined,
    variant: {
      type: String,
      default: () => 'outlined',
    },
  },
  data() {
    return {
      model: null,
    }
  }
}
</script>

<style scoped>

</style>