<template>
  <v-autocomplete
      :value="value"
      @input="$emit('input', $event)"
      :label="label"
      :items="items"
      :chips="chips"
      :multiple="multiple"
      :clearable="clearable"
      :single-line="singleLine"
      :deletable-chips="deletableChips"
      :hide-no-data="hideNoData"
      :disabled="disabled"
      :readonly="readOnly"
      :search-input.sync="searchInputModel"
      :no-data-text="noDataText"
      :error-messages="errorMessages"
      :item-text="itemText"
      :item-value="itemValue"
      :auto-select-first="autoSelectFirst"
      :no-filter="noFilter"
      :hide-details="hideDetails || rules.length < 1"
      :rules="rules"
      filled
      :small-chips="smallChips"
      dense
      @focusin="$emit('focusin')"
      @focusout="$emit('focusout')"
  >
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "BaseAutoComplete",
  emits: ['focusout', 'focusin'],
  props: {
    value: String,
    label: String,
    itemText: String,
    itemValue: String,
    noDataText: String,
    items: Array,
    errorMessages: Array,
    rules: Array,
    chips: Boolean,
    multiple: Boolean,
    hideDetails: {
      type: undefined,
      default: true
    },
    smallChips: Boolean,
    clearable: Boolean,
    deletableChips: Boolean,
    hideNoData: {
      type: Boolean,
      default: false,
    },
    noFilter: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    singleLine: {
      type: Boolean,
      default: false,
    },
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    autoSelectFirst: {
      type: Boolean,
      default: false,
    },
    searchInput: undefined,
  },
  data() {
    return {
      model: null,
      searchInputModel: null,
    }
  },
  watch: {
    'searchInputModel': {
      handler(val) {
        this.$emit('update:searchInput', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
