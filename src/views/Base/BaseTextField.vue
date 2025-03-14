<template>
  <div class="width-100">
    <div class="d-block">
      <v-text-field
          :model-value="modelValue"
          @input="$emit('update:modelValue', model)"
          @click:clear="$emit('click:clear')"
          @focusin="$emit('focusin')"
          @focusout="$emit('focusout')"
          :label="label"
          :type="type"
          v-bind="$attrs"
          :disabled="disabled"
          :readonly="readonly"
          :rules="rules"
          :suffix="suffix"
          :prefix="prefix"
          :clearable="clearable"
          :prepend-icon="prependIcon"
          :append-icon="appendIcon"
          :append-outer-icon="appendOuterIcon"
          :prepend-inner-icon="prependInnerIcon"
          @click:append="$emit('click:append')"
          :hide-details="rules && rules.length> 0 ? 'auto' : hideDetails"
          v-model="model"
          filled
          dense>
        <template v-slot:label>
          <div class="required--symbol">
            {{ label }}
            <small v-if="finalRequiredSymbol">*</small>
          </div>
        </template>
      </v-text-field>
    </div>
    <div
        v-if="description"
        dir="rtl"
        class="d-block field-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTextField",
  emits: ['click:append', '@click:clear', 'focusin', 'focusout'],
  created() {
    if (this.modelValue) {
      this.model = this.modelValue;
    }
  },
  props: {
    modelValue: undefined,
    label: String,
    description: String,
    suffix: String,
    prefix: String,
    prependIcon: String,
    appendIcon: String,
    appendOuterIcon: String,
    prependInnerIcon: String,
    rules: Array,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: undefined,
      default: true,
    },
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
    type: undefined,
  },
  data() {
    return {
      model: null,
    }
  },
  watch: {
    modelValue: {
      handler(value) {
        this.model = value;
      }
    }
  },
  computed: {
    finalRequiredSymbol() {
      if (this.rules && this.rules.length > 0) {
        return true;
      } else {
        return this.requiredSymbol;
      }
    }
  }
}
</script>

<style scoped>

</style>
