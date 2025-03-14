<script setup lang="ts">
import { httpPost } from '@/plugins/http/httpRequest'

const props = defineProps([
  'data',
  'visible',
])
const emits = defineEmits([
  'add',
  'update',

])

const model = ref({
  name: null,
  family: null,
})

function submit() {
  if (props.data) {
    httpPost(``, { ...model.value }, result => {
      emits('add')
    }, error => {

    })
  }

}

</script>

<template>
  <base-modal
    :visible="props.visible"
    @close="$emit('close')"
    title="تعریف کاربر جدید">

    <div class="v-row">
      <div class="v-col-12">
        <base-text-field
          label="نام"
          v-model="model.name"
        />
      </div>
      <div class="v-col-12">
        <base-text-field
          label="نام خانوادگی"
          v-model="model.family"
        />
      </div>
    </div>

  </base-modal>
</template>

<style scoped>

</style>
