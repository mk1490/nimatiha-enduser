<script setup lang="ts">

import UserModal from '@/pages/Admin/Users/UserModal.vue'
import MemberModal from '@/pages/Admin/Members/MemberModal.vue'

const table = ref({
  headers: [
    { title: 'نام', value: 'name' },
    { title: 'نام خانوادگی', value: 'family' },
  ],
  contents: [],
  actions: [],
})
const modal = ref({
  visible: false,
  data: null,
  index: -1,
})

function define() {
  modal.value.data = null
  modal.value.visible = true
}

function add(event) {
  table.value.contents.push(event)
  modal.value.visible = false
}

function update(event) {
  table.value.contents.splice(modal.value.index, 1, event)
  modal.value.visible = false
}


</script>

<template>
  <base-card-layout
    @buttonClick="define()"
    title="مدیریت اعضا">

    <base-table
      :items="table.contents"
      :headers="table.headers"
      :actions="table.actions">

    </base-table>


    <member-modal
      v-if="modal.visible"
      :visible="modal.visible"
      @close="modal.visible = false"
      @add="add($event)"
      @update="update($event)"
    />

  </base-card-layout>
</template>

<style scoped>

</style>
