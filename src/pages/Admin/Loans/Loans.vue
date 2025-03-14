<script setup lang="ts">

import LoanModal from '@/pages/Admin/Loans/LoanModal.vue'
import { httpGet } from '@/plugins/http/httpRequest'

const table = ref({
  headers: [
    { title: 'عنوان', value: 'title' },
    { title: 'نوع وام', value: 'type' },
  ],
  contents: [],
  actions: [
    {
      title: 'ویرایش',
      icon: 'mdi-pen',
      click: item => {
        httpGet(`/admin/loan/initialize`, result => {
          modal.value.initialize = result
          modal.value.data = null
          modal.value.visible = true
        })
      },
    },
    {
      title: 'حذف',
      color: 'error',
      icon: 'mdi-delete',
      click: item => {

      },
    },
  ],
})
const modal = ref({
  visible: false,
  data: null,
  initialize: null,
  index: -1,
})

onMounted(() => {
  httpGet(`/admin/loan/list`, result => {
    table.value.contents = result
  })
})

function define() {
  httpGet(`/admin/loan/initialize`, result => {
    modal.value.initialize = result
    modal.value.data = null
    modal.value.visible = true
  }, error => {

  })

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
    button-title="تعریف وام جدید"
    title="مدیریت وام‌ها">

    <base-table
      :items="table.contents"
      :headers="table.headers"
      :actions="table.actions">

    </base-table>


    <loan-modal
      v-if="modal.visible"
      :visible="modal.visible"
      :data="modal.data"
      :initialize="modal.initialize"
      @close="modal.visible = false"
      @add="add($event)"
      @update="update($event)"
    />

  </base-card-layout>
</template>

<style scoped>

</style>
