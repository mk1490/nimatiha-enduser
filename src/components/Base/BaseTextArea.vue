<template>
  <v-textarea
      :model-value="model"
      @update:modelValue="$emit('update:modelValue', event)"
      :label="label"
      :type="type"
      :disabled="disabled"
      :readonly="readOnly"
      hide-details
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
    height: Number,
    label: String,
    disabled: Boolean,
    readOnly: Boolean,
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