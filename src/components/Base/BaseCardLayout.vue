<template>
  <v-container fluid>
    <v-card>
      <slot name="beforeCardTitle"></slot>

      <v-card-title>
        <div class="v-row">
          <div class="v-col">
            <div class="d-inline-flex">
              <!--            <app-back-button-->
              <!--                class="align-self-center"-->
              <!--                v-if="backRoute"-->
              <!--                :back-route="backRoute"/>-->
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
                <slot name="button-area" />
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

<script setup lang="ts">
// import AppBackButton from "@/view/widget/AppBackButton.vue";

const emit = defineEmits(['buttonClick'])

defineProps(
  {
    title: String,
    subTitle: String,
    buttonIcon: String,
    buttonVisible: {
      type: Boolean,
      default: true,
    },
    buttonTitle: String,
    backRoute: String,
  },
)

function submit() {
  emit('buttonClick')
}
</script>

<style scoped>
@import '@styles/global.scss';
</style>
