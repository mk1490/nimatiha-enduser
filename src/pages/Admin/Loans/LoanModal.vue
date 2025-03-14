<script setup lang="ts">
import { httpPost, httpPut } from '@/plugins/http/httpRequest'

const props = defineProps({
  data: Object,
  visible: {
    type: Boolean,
  },
  initialize: {
    type: Object,
  },
})
const emits = defineEmits([
  'add',
  'update',
  'close',
])

const model = ref({
  title: null,
  type: null,
  duration: null,
  memberShipFeeAmount: null,
})
const items = ref({
  types: [],
})

onMounted(() => {
  items.value.types = props.initialize['types']
})

function submit() {
  if (!props.data) {
    httpPost(`/admin/loan`, { ...model.value }, result => {
      emits('add', result)
    }, error => {

    })
  } else {
    httpPut(`/admin/loan/${props.data.id}`, { ...model.value }, result => {
      emits('update', result)
    }, error => {

    })
  }

}

</script>

<template>
  <base-modal
    :visible="props.visible"
    @close="$emit('close')"
    @submit="submit"
    :title="props.data? 'تعریف کاربر جدید': 'ویرایش کاربر'">

    <div class="v-row">
      <div class="v-col-12">
        <base-text-field
          label="عنوان"
          v-model="model.title"
        />
      </div>
      <div class="v-col-12">
        <base-select
          label="نوع وام"
          :items="items.types"
          v-model="model.type"
        />
      </div>


      <div
        v-if="model.type == 2"
        class="v-col-12">
        <base-text-field
          label="میزان مبلغ حق عضویت"
          suffix="ریال"
          v-model="model.memberShipFeeAmount"
        />
      </div>

      <div class="v-col-12">
        <base-text-field
          label="مدّت زمان"
          type="number"
          v-model="model.duration"
        />
      </div>

    </div>

  </base-modal>
</template>

<style scoped>

</style>
