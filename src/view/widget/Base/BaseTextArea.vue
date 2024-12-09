<template>
  <v-textarea
      :model-value="model"
      @update:modelValue="$emit('update:modelValue', event)"
      :label="label"
      :type="type"
      persistent-placeholder
      :placeholder="placeholder"
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
    placeholder: {
      type: String,
      default: () => null,
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
