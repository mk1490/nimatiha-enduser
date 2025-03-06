<script setup>
import {httpGet} from "@/plugins/httpRequest";
import BaseTable from "@/view/widget/Base/BaseTable.vue";
import {useRoute} from "vue-router";
import VideoModal from "@/view/components/Courses/Widgets/VideoModal.vue";
import AppBackButton from "@/view/widget/AppBackButton.vue";


const route = useRoute()

onMounted(() => {
  httpGet(`/course/${route.params.id}`, result => {
    model.value.title = result.title
    table.value.contents = result.items;
  })
})

const model = ref({
  title: null,
})

const table = ref({
  headers: [
    {title: 'عنوان', value: 'title'},
    {title: 'عملیات', value: 'action'},
  ],
  contents: [],
  actions: [],
})

const modal = ref({
  visible: false,
  data: null,
})

function showVideoModal(item) {
  httpGet(`/course/episode-details/${item.id}`, result => {
    modal.value.data = result;
    modal.value.visible = true;
  })

}
</script>

<template>
  <v-container fluid>
    <v-card v-if="table.contents.length > 0">
      <v-card-title>
        <app-back-button back-route="/courses/list"/>
        {{ model.title }}
      </v-card-title>
      <v-card-text>
        <base-table
            :actions="table.actions"
            :headers="table.headers"
            :items="table.contents">

          <template v-slot:item.action="{item, index}">
            <v-btn
                @click="showVideoModal(item)"
                variant="text"
                v-if="item.type === 1">
              مشاهده
            </v-btn>
          </template>
        </base-table>
      </v-card-text>
    </v-card>

    <video-modal
        v-if="modal.visible"
        :visible="modal.visible"
        :data="modal.data"
        @close="modal.visible = false"
    />
  </v-container>
</template>

<style scoped>
::v-deep .v-data-table-footer {
  display: none !important;
}
</style>