<script setup>
import {useRoute} from "vue-router";
import VideoModal from "./Widgets/VideoModal.vue";
import {httpGet, serverAddress} from "../../plugins/http/httpRequest";
import BaseTable from "../../components/Base/BaseTable.vue";
import BaseButton from "../../views/Base/BaseButton.vue";
import TestModal from "@/pages/Courses/Widgets/TestModal.vue";
import {toastHandler} from "@/plugins/commonMethods/commonMethods";
import {useToast} from "vue-toast-notification";


const route = useRoute()
const $toast = useToast()

onMounted(() => {
  httpGet(`/course/${route.params.id}`, result => {
    model.value.title = result.title
    model.value.content = result.content
    model.value.items = result.items
    table.value.contents = result.items;
    specifications.value = result.specifications;
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
  test: {
    visible: false,
    data: null,
  },
  video: {
    visible: false,
    data: null,
  }
})

const specifications = ref([])

function showVideoModal(item) {
  httpGet(`/course/episode-details/${item.id}`, result => {
    modal.value.data = result;
    modal.value.visible = true;
  })
}

function getTypeTitle(type) {
  switch (type) {
    case 1:
      return 'ویدئو';
    case 2:
      return 'آزمون';
    case 3:
      return 'فایل پیوست';
    case 4:
      return 'تکلیف';
  }
}


function buttonItems(item) {

  const buttonItems = [];

  if ([1, 3].includes(item.type)) {
    buttonItems.push({
      title: 'دانلود',
      click: item => {
        if (item.url) {
          window.open(serverAddress + item.url, '_blank');
        } else {
          $toast.info('لینک دانلود وجود ندارد')
        }

      }
    },)
  }

  if (item.type === 1) {
    buttonItems.push(
        {
          title: 'مشاهده',
          click: item => {
            modal.value.video.data = item;
            modal.value.video.visible = true;
          }
        },
    )
  }
  if (item.type === 2) {
    buttonItems.push(
        {
          title: 'شرکت در آزمون',
          loading: false,
          click: (item, index) => {
            httpGet(`/course/prepare-test/${item.questionId}`, result => {
              modal.value.test.data = result;
              modal.value.test.visible = true;
            })
          }
        },
    )
  }
  if (item.type === 4) {
    buttonItems.push(
        {
          title: 'ارسال تکلیف',
          click: item => {
            toastHandler.isDeveloping();
          }
        },
    )
  }


  return buttonItems;
}
</script>

<template>
  <v-container>
    <div class="v-row">
      <div class="v-col-md-4 v-col-sm-12">
        <v-card>
          <v-card-text>
            <base-button
                label="شرکت در دوره"
                block
            />
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            ویژگی‌های دوره
          </v-card-title>
          <v-card-text>
            <div class="v-row">
              <div
                  v-for="item in specifications"
                  class="v-col-12">
                <label>
                  {{ item.key }}
                </label>
                <span>
                  {{ item.value }}
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="v-col-md-8 v-col-sm-12">
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
                      <v-card
                          class="mb-2"
                          v-for="childItem in item.children">
                        <v-card-title>
                          <div class="v-row">
                            <div class="v-col">
                              {{ childItem.title }}
                              <v-chip color="primary">
                                {{ getTypeTitle(childItem.type) }}
                              </v-chip>
                            </div>
                            <div class="v-col-auto d-inline-flex">
                              <template v-for="item in buttonItems(childItem)">
                                <div class="mr-1">
                                  <base-button
                                      :label="item.title"
                                      @click="item.click(childItem)"
                                  />
                                </div>

                              </template>
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


      <test-modal
          v-if="modal.test.visible"
          :visible="modal.test.visible"
          @close="modal.test.visible = false"
          :data="modal.test.data"
      />

      <video-modal
          v-if="modal.video.visible"
          :visible="modal.video.visible"
          :data="modal.video.data"
          @close="modal.video.visible = false"
      />

    </div>
  </v-container>
</template>

<style scoped>
::v-deep .v-data-table-footer {
  display: none !important;
}
</style>