<template>
  <v-textarea
      :value="modelValue"
      @input="$emit('update:modelValue', model)"
      :label="label"
      :type="type"
      :disabled="disabled"
      :rules="rules"
      :hide-details="hideDetails"
      :height="height"
      hide-details
      filled
      v-model="model"
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
    modelValue: undefined,
    height: Number,
    label: String,
    disabled: Boolean,
    type: undefined,
    hideDetails: {
      type: undefined,
      default: true,
    },
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
    rules: Array,
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
