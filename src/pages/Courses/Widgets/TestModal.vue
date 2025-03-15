<script setup lang="ts">
import BaseButton from "@/views/Base/BaseButton.vue";
import {httpPost} from "@/plugins/http/httpRequest";

const props = defineProps({
  visible: Boolean,
  data: Object,
})

const emits = defineEmits(['close', 'submit'])
const model = ref({})
onMounted(() => {
  props.data.items.map(f => {
    model.value[f.id] = null;
  })
})


function sendTest() {

  httpPost(`/course/test-complete`, {
    items: model.value,
    questionId: props.data.id,
  }, result => {
    emits('submit')
  }, error => {

  })
}
</script>

<template>
  <base-modal
      title="آزمون"
      :visible="props.visible"
      width="600"
      hide-submit-button
      @close="$emit('close')">


    <div class="v-row">
      <v-card
          v-for="(item, index) in data.items"
          class="v-col-12 mb-3">
        <v-card-title>
          {{ index + 1 }}. {{ item.questionTitle }}
        </v-card-title>

        <v-radio-group
            class="px-6"
            v-if="item.type == 1"
            v-model="model[item.id]">
          <v-radio
              v-for="answerItem in item.answers"
              :label="answerItem.label"
              :value="answerItem.value"
          />
        </v-radio-group>

        <base-text-area
            class="mt-3 px-6 py-5"
            v-if="item.type == 2"
            v-model="model[item.id]"
        />
      </v-card>
    </div>


    <template #footerAboveActionsArea>
      <base-button
          @click="sendTest"
          block
          variant="flat"
          label="ارسال آزمون"
      />
    </template>

  </base-modal>
</template>

<style scoped>

</style>