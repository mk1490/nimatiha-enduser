<template>
  <v-dialog
      scrollable
      :model-value="props.visible"
      persistent
      :fullscreen="props.fullScreen"
      :width="!fullScreen? props.width: -1">
    <v-card>
      <v-card-title v-if="!!props.title">
        <div class="v-row">
          <div class="v-col">

            <v-btn
                large
                class="ml-2"
                icon="mdi-close"
                variant="plain"
                @click="exit()">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <div class="d-inline-block">
              {{ props.title }}
              <div
                  v-if="props.subTitle"
                  class="d-block">
                <h6 class="v-card__subtitle pa-0">
                  {{ props.subTitle }}
                </h6>
              </div>

            </div>
          </div>

          <div class="v-col-auto">
            <slot name="toolbar-action"></slot>
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <slot name="container-outside"></slot>
        <v-container
            fluid>
          <div class="content">
            <slot></slot>
          </div>

          <div
              v-if="$slots.footer"
              class="footer">
            <slot
                name="footer">

            </slot>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <slot name="footerAboveActionsArea"></slot>
      </v-card-actions>
      <v-card-actions v-if="!props.fullScreen">
        <div class="d-inline-flex" :style="{'width': props.blockCloseButton ? '100%' : ''}">
          <v-btn
              :block="props.blockCloseButton"
              color="red"
              variant="text"
              @click="closeOrBack">
            {{ buttonTexts.backButtonText }}
          </v-btn>
          <slot name="footer-cancel-area">
          </slot>
        </div>
        <v-spacer/>
        <div class="d-inline-flex">
          <slot name="footer-submit-area-prepend">

          </slot>
          <v-btn
              v-if="props.hideSubmitButton == false"
              @click="submitOrNext()"
              :disabled="props.submitDisabled"
              :width="props.submitWidth"
              :loading="props.loading"
              color="primary">
            {{ buttonTexts.nextButtonText }}
          </v-btn>
          <slot name="footer-submit-area">

          </slot>
        </div>
      </v-card-actions>


    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">

import {onMounted, watch} from "vue";

const props = defineProps({
  title: String,
  subTitle: String,
  fullScreen: Boolean,
  loading: Boolean,
  width: {
    type: undefined,
    default: 500,
  },
  submitText: String,
  backText: String,
  visible: Boolean,
  hideSubmitButton: {
    type: Boolean,
    default: false
  },
  blockCloseButton: {
    type: Boolean,
    default: false
  },
  submitDisabled: {
    type: Boolean,
    default: false
  },
  submitWidth: {
    type: Number,
    default: undefined,
  },
})
const emits = defineEmits([
  'exit',
  'submit',
  'submitOrNext',
  'close',
  'closeOrBack'
])

const buttonTexts = ref({
  nextButtonText: null,
  backButtonText: null,
})

onMounted(() => {
  buttonTexts.value.nextButtonText = props.submitText || "تأیید";
  buttonTexts.value.backButtonText = props.backText || "لغو";
})

function submitOrNext() {
  emits('submit');
  emits('submitOrNext');
}

function closeOrBack() {
  emits('close')
  emits('closeOrBack')
}

function setNextButtonText(text) {
  if (!text) {
    buttonTexts.value.nextButtonText = "تأیید";
  } else {
    buttonTexts.value.nextButtonText = text;
  }
}

function setBackButtonText(text) {
  if (!text) {
    buttonTexts.value.backButtonText = "لغو";
  } else {
    buttonTexts.value.backButtonText = text;
  }
}

function exit() {
  emits('exit');
  emits('close');
}


watch('submitText', {
  handler(value) {
    setNextButtonText(value);
  }
})
watch('backText', {
  handler(value) {
    setBackButtonText(value);
  }
})
</script>

<style scoped>
.content {
  height: 100% !important;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-block: 12px;
  padding-inline: 12px;
  width: 100%;
  background-color: #f0f0f0;
}

::v-deep .v-container {
  height: 100% !important;
}
</style>
