<script>
export default {
  name: "BaseButtonGroup",
  data() {
    return {
      selectedButton: 0,
    }
  },
  props: {
    items: Array,
    value: undefined,
  },
  methods: {
    clickItem(index) {
      this.selectedButton = index;
      this.$emit('input', index);
    }
  }
}
</script>

<template>
  <v-btn-toggle v-model="selectedButton">
    <v-btn
        @click="clickItem(index)"
        v-for="(item, index) in items">
      {{ item.title }}
    </v-btn>
  </v-btn-toggle>
</template>

<style scoped>

</style>