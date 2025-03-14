<script>
export default {
  name: "BaseFileInput",
  emits: ['click:append', '@click:clear', 'focusin', 'focusout'],
  created() {
    if (this.value) {
      this.model = this.value;
    }
  },
  props: {
    value: undefined,
    label: String,
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
    value: {
      handler(value) {
        this.model = value;
      }
    },
    model: {
      handler(value) {
        this.$emit('input', value);
      }
    },

  }
}
</script>


<template>
  <v-file-input
      :value="value"
      @input="$emit('input', $event)"
      @keyup="$emit('keyup', model)"
      @keydown="$emit('keydown', model)"
      @click:clear="$emit('click:clear')"
      @focusin="$emit('focusin')"
      @focusout="$emit('focusout')"
      :label="label"
      :type="type"
      v-bind="$attrs"
      v-on="$listeners"
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
      :hide-details="hideDetails"
      v-model="model"
      filled
      dense>
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
  </v-file-input>

</template>

<style scoped>

</style>
