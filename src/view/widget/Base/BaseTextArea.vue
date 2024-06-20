<template>
  <v-textarea
      :model-value="model"
      @update:modelValue="$emit('update:modelValue', event)"
      :label="label"
      :type="type"
      :disabled="disabled"
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
    label: String,
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