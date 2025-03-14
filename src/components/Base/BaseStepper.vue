<script>
export default {
  name: "BaseStepper",
  props: {
    steps: Array,
    selectedStep: Number,
  },
  data() {
    return {
      selected: 1,
    }
  },
  emits: ['next'],
  methods: {
    next() {
      this.selected++;
      this.$emit('next');
    },
    back() {
      this.selected--;
      this.$emit('back');
    }
  },
  watch: {
    selectedStep: {
      handler() {
        // this.selected = this.selectedStep;
      }
    }
  }
}
</script>

<template>
  <v-container>
    {{ selected }}
    <v-stepper>
      <v-tabs-items v-model="selected">
        <v-stepper-header v-for="(item, index) in steps">
          <v-stepper-step
              :complete="selected > index +1 "
              :key="index"
              :step="index + 1">
            {{ item.title }}
          </v-stepper-step>
        </v-stepper-header>
      </v-tabs-items>



    </v-stepper>

    <v-stepper-content
        v-for="item in steps"
        v-model="selected">
      <component :is="item.view"/>
    </v-stepper-content>
  </v-container>
</template>

<style scoped>

</style>