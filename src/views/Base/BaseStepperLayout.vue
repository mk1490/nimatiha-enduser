<script>
export default {
  name: "BaseStepperLayout",
  props: {
    steps: Array,
  },
  data() {
    return {
      selectedStep: 0,
    }
  }
}
</script>

<template>
  <v-container fluid>


    <v-stepper v-model="selectedStep">
      <v-stepper-step
          v-for="item in steps"
          :complete="selectedStep">

        {{ item.title }}
      </v-stepper-step>
      <v-stepper-content v-for="(item, index) in steps"
                         :step="index">
        <v-card>

        </v-card>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<style scoped>

</style>