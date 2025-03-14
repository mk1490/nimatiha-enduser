<script setup lang="ts">
defineProps({
  title: String,
  subTitle: String,
  fullScreen: Boolean,
  width: {
    type: undefined,
    default: 500,
  },
  submitText: String,
  backText: String,
  visible: Boolean,
  hideSubmitButton: {
    type: Boolean,
    default: false,
  },
  blockCloseButton: {
    type: Boolean,
    default: false,
  },
  submitDisabled: {
    type: Boolean,
    default: false,
  },
  submitWidth: {
    type: Number,
    default: 90,
  },
})
const emits = defineEmits(['submit', 'close'])
const actionsText = ref({
  backButtonText: 'لغو',
  nextButtonText: 'تأیید',
})


function submitOrNext() {
  emits('submit')
}

function closeOrBack() {
  emits('close')
}
</script>

<template>
  <v-dialog
    persistent
    transition="dialog-bottom-transition"
    :model-value="visible"
    :fullscreen="fullScreen"
    scrollable
    @update:modelValue="$emit('update:visible', false)"
    :width="!fullScreen ? width: undefined">
    <v-card>


      <!--      <v-toolbar v-if="fullScreen">-->
      <!--        <v-btn icon="mdi-close"-->
      <!--               @click="closeOrBack">-->

      <!--        </v-btn>-->
      <!--        <v-toolbar-title>-->
      <!--          {{ title }}-->
      <!--        </v-toolbar-title>-->
      <!--      </v-toolbar>-->


      <v-card-title v-if="!!title">
        <div class="row">
          <div class="col">

            <v-btn
              :icon="true"
              large
              color="transparent"
              elevation="0"
              class="ml-2"
              @click="closeOrBack()"
              v-if="fullScreen">
              <v-icon>
                ri-close-fill
              </v-icon>
            </v-btn>
            <div class="d-inline-block">
              {{ title }}
              <div
                v-if="subTitle"
                class="d-block">
                <h6 class="v-card__subtitle pa-0">
                  {{ subTitle }}
                </h6>
              </div>

            </div>
          </div>

          <div class="col-auto">
            <slot name="toolbar-action"></slot>
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <slot name="container-outside"></slot>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <slot name="footerAboveActionsArea"></slot>
      </v-card-actions>
      <v-card-actions v-if="!fullScreen">
        <div class="d-inline-flex" :style="{'width': blockCloseButton ? '100%' : ''}">

          <slot name="footer-cancel-area">
          </slot>
        </div>
        <v-spacer/>
        <div class="d-inline-flex">
          <slot name="footer-submit-area-prepend">

          </slot>
          <v-btn
            :block="blockCloseButton"
            color="red"
            @click="closeOrBack()">
            {{ actionsText.backButtonText }}
          </v-btn>
          <v-btn
            v-if="hideSubmitButton === false"
            @click="submitOrNext()"
            :disabled="submitDisabled"
            :width="submitWidth"
            variant="flat"
            color="primary">
            {{ actionsText.nextButtonText }}
          </v-btn>
          <slot name="footer-submit-area">

          </slot>
        </div>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped lang="scss">

</style>
