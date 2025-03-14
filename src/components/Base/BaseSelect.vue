<template>
  <v-select
    :value="value"
    @input="$emit('input', $event)"
    @click:clear="$emit('click:clear')"
    @focusin="$emit('focusin')"
    @focusout="$emit('focusout')"
    :label="label"
    :items="items"
    :rules="rules"
    density="compact"
    :multiple="multiple"
    :item-text="itemText"
    :item-value="itemValue"
    :deletable-chips="deletableChips"
    :hide-details="hideDetails"
    :chips="chips"
    :clearable="clearable"
    :small-chips="smallChips"
    outlined
    :return-object="returnObject"
    :disabled="disabled"
    :dense="dense">
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
  </v-select>
</template>

<script setup lang="ts">
defineEmits(['click:append', '@click:clear', 'focusin', 'focusout'])
defineProps({
  value: undefined,
  returnObject: Boolean,
  label: String,
  items: Array,
  rules: Array,
  multiple: {
    default: false,
    type: Boolean,
  },
  deletableChips: {
    default: false,
    type: Boolean,
  },
  chips: {
    default: false,
    type: Boolean,
  },
  hideDetails: {
    type: undefined,
    default: true,
  },
  smallChips: {
    default: false,
    type: Boolean,
  },
  requiredSymbol: {
    default: false,
    type: Boolean,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  itemText: String,
  itemValue: String,
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>

</style>
