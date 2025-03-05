<script setup>
import {httpGet} from "@/plugins/httpRequest";

const items = ref([])

httpGet(`/`, result => {
  items.value = result;
})
</script>

<template>
  <div class="v-row">
    <div
        v-for="item in items"
        class="v-col-4">
      <v-card>
        <v-card-title>
          {{ item.title }}
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<style scoped>

</style>