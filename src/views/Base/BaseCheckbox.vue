<script>
export default {
  name: "BaseCheckbox",
  props: {
    label: String,
    value: String,
    rules: Array,
    hideDetails: {
      type: undefined,
      default: true,
    },
  }
}
</script>

<template>
  <v-checkbox
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      :hide-details="rules && rules.length> 0 ? 'auto' : hideDetails"
  />
</template>

<style scoped>

</style>
