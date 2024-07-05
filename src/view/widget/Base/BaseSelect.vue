<template>
  <v-select
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      :multiple="multiple"
      :hide-details="rules.length > 0 ? 'auto': true"
      :rules="rules"
      :chips="chips"
      :label="label"
      :small-chips="smallChips"
      :return-object="returnObject"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :readonly="readonly"
      :disabled="disabled"
      item-color="black"
      base-color="black"
      :variant="variant"
      density="compact">
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "BaseSelect",
  emits: ['update:modelValue'],
  props: {
    modelValue: undefined,
    returnObject: Boolean,
    label: String,
    itemTitle: String,
    itemValue: String,
    items: Array,
    multiple: {
      default: false,
      type: Boolean,
    },
    variant: {
      default: 'outlined',
      type: String,
    },
    chips: {
      default: false,
      type: Boolean,
    },
    smallChips: {
      default: false,
      type: Boolean,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
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
  watch: {
    value: {
      handler(value) {
        this.model = value;
      }
    }
  },
  methods: {
    updateModelValue($event) {
      if ($event) {
        this.$emit('update:modelValue', $event)
      }

    }
  }
}
</script>

<style scoped>

</style>