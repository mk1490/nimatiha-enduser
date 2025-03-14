<script>
export default {
  name: "BaseToggleButton",
  props: {
    buttons: Array,
    modelValue: String,
  },
  created() {
    const selected = this.buttons.find(x => x.key === this.modelValue)
    this.model = selected.key;
  },
  data() {
    return {
      model: 0,
    }
  },
  methods: {
    select(index) {
      this.model = index;
      this.$emit('update:modelValue', index)
    }
  }
}
</script>

<template>
  <div class="d-inline-flex">
    <v-btn
        v-for="(item, index) in buttons"
        @click="select(item.key || index)"
        class="ml-1"
        :variant="model === (item.key || index) ? 'elevated': 'outlined'">
      {{ item.title || item }}
    </v-btn>
  </div>
</template>

<style scoped>

</style>
