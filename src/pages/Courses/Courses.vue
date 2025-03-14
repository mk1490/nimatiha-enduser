<script setup>
import {httpGet} from "@/plugins/http/httpRequest";
import {useRouter} from "vue-router";

const router = useRouter()

const items = ref(null)

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
  <v-container
      class="h-100">
    <div
        v-if="items && items.length > 0"
        class="v-row">
      <div
          v-for="item in items"
          class="v-col-md-4 v-col-sm-12">
        <v-card>
          <v-card-title class="text-center">
            {{ item.title }}
          </v-card-title>
          <v-card-text>
            <div class="v-row">
              <div class="v-col-12 mt-10">
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
        v-if="items && items.length == 0"
        class="d-flex text-white justify-center align-self-center">
      <h4>
        موردی جهت نمایش وجود ندارد.
      </h4>
    </div>
  </v-container>
</template>

<style scoped>

</style>