<template>
  <v-container fluid>
    <v-card
        :color="color"
        :flat="flat">
      <slot name="beforeCardTitle"></slot>

      <v-card-title v-if="!!buttonTitle || title">

        <div class="v-row">
          <div class="v-col">
            <div class="d-inline-flex">
              <app-back-button
                  class="align-self-center"
                  v-if="backRoute"
                  :back-route="backRoute"/>
              <div class="d-inline-block">
                {{ title }}


                <div class="d-block">
                  <slot name="subTitle">
                  </slot>
                </div>
                <h6>
                  {{ subTitle }}
                </h6>
              </div>
            </div>
          </div>
          <div class="v-col-auto">


            <div class="d-inline-flex">
              <div>
                <slot name="button-area"/>
              </div>

              <v-btn
                  v-if="!!buttonTitle && buttonVisible"
                  @click="submit"
                  color="primary">
                <v-icon v-if="buttonIcon">
                  {{ buttonIcon }}
                </v-icon>
                {{ buttonTitle }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>


    <slot name="outsideCard">

    </slot>

  </v-container>
</template>

<script>
import AppBackButton from "@/view/widget/AppBackButton.vue";

export default {
  name: "BaseCardLayout",
  components: {AppBackButton},
  emits: ['buttonClick'],
  props: {
    title: String,
    subTitle: String,
    buttonIcon: String,
    buttonVisible: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    buttonTitle: String,
    backRoute: String,
  },
  methods: {
    submit() {
      this.$emit('buttonClick')
    }
  }
}
</script>

<style scoped>

</style>
