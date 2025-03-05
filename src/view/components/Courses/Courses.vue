<script setup>
import {httpGet} from "@/plugins/httpRequest";
import {useRouter} from "vue-router";

const router = useRouter()

const items = ref([])

onMounted(() => {
  httpGet(`/course/list`, result => {
    items.value = result;
  })
})

function toRoute(item) {
  router.push({
    name: 'courseDetails',
    params: {
      id: item.id
    }
  })
}
</script>

<template>
  <v-container fluid>
    <div
        v-if="items.length > 0"
        class="v-row">
      <div
          v-for="item in items"
          class="v-col-md-4 v-col-sm-12">
        <v-card>
          <v-card-title>
            {{ item.title }}
          </v-card-title>
          <v-card-text>
            <div class="v-row">
              <div class="v-col-12">
                <v-btn
                    @click="toRoute(item)"
                    color="primary"
                    block>
                  شرکت در دوره
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <div
        v-else
        class="d-flex">
      <h2>
        موردی جهت نمایش وجود ندارد.
      </h2>
    </div>
  </v-container>
</template>

<style scoped>

</style>