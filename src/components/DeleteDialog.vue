<template>
  <v-dialog
    persistent
    :model-value="visible"
    width="300">
    <v-card>
      <v-card-title>
        حذف آیتم
      </v-card-title>
      <v-card-text>
        <h4>
          آیا نسبت به حذف این آیتم اطمینان دارید؟
        </h4>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="confirm(false)"
          color="error">
          لغو
        </v-btn>
        <v-btn
          color="primary"
          @click="confirm(true)">
          تأیید
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">

import { useStore } from 'vuex'

const props = defineProps(['visible'])

const store = useStore()

function confirm(visible) {
  store.deleteModal.callback(visible)
  store.deleteModal.visible = false
}


</script>

<style scoped>

</style>
