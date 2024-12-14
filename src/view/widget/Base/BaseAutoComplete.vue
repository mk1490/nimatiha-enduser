<template>
  <v-autocomplete
      :model-value="value"
      @input="$emit('input', $event)"
      :label="label"
      :items="items"
      :chips="chips"
      :multiple="multiple"
      :deletable-chips="deletableChips"
      :variant="variant"
      density="compact"
      :on-update:search="updateSearch"
      :hide-details="hideDetails"
      outlined
      :small-chips="smallChips"
      dense>
  </v-autocomplete>
</template>

<script>
export default {
  name: "BaseAutoComplete",
  props: {
    value: String,
    label: String,
    items: Array,
    chips: Boolean,
    multiple: Boolean,
    smallChips: Boolean,
    deletableChips: Boolean,
    hideDetails: {
      type: String,
      default: 'auto'
    },
    variant: {
      type: String,
      default: () => 'outlined',
    },
  },
  data() {
    return {
      model: null,
      searchInputModel: null,
    }
  },
  methods: {
    updateSearch(event) {
      this.searchInputModel = event;
    }
  }
}
</script>

<style scoped>

</style>
