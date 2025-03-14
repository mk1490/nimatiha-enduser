<script setup>
import {useRoute} from "vue-router";
import VideoModal from "./Widgets/VideoModal.vue";
import {httpGet} from "../../plugins/http/httpRequest";
import BaseTable from "../../components/Base/BaseTable.vue";
import BaseButton from "../../views/Base/BaseButton.vue";


const route = useRoute()

onMounted(() => {
  httpGet(`/course/${route.params.id}`, result => {
    model.value.title = result.title
    model.value.content = result.content
    model.value.items = result.items
    table.value.contents = result.items;
  })
})

const model = ref({
  title: null,
  content: null,
  items: [],
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
  <v-container>
    <div class="v-row">
      <div class="v-col-8">
        <div class="v-row">
          <div class="v-col-12">
            <v-img
                :aspect-ratio="222/127"
                cover
                src="https://fastly.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY"
            />
          </div>
          <div class="v-col-12">
            <v-card>
              <v-card-text>
                <div class="d-inline-block">
                  <div v-html="model.content"></div>
                  <v-card
                      class="mb-3"
                      v-for="item in model.items">
                    <v-card-title>
                      {{ item.title }}
                    </v-card-title>
                    <v-card-text>
                      <v-card v-for="childItem in item.children">
                        <v-card-title>
                          <div class="v-row">
                            <div class="v-col">
                              {{ childItem.title }}
                              <v-chip color="primary">
                                {{ childItem.type }}
                              </v-chip>
                            </div>
                            <div class="v-col-auto">
                              <base-button
                                  label="دانلود"
                              />
                            </div>
                          </div>

                        </v-card-title>
                      </v-card>
                    </v-card-text>
                  </v-card>

                </div>

              </v-card-text>
            </v-card>
          </div>
        </div>

      </div>
      <div class="v-col-4">
        <v-card>
          <v-card-text>
            <base-button
                label="شرکت در دوره"
                block
            />


          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
::v-deep .v-data-table-footer {
  display: none !important;
}
</style>