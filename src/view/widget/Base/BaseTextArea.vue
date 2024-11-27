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
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
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
    requiredSymbol: {
      type: Boolean,
      default: false,
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
