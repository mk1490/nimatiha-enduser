<script setup lang="ts">
import {useStore} from 'vuex'

const store = useStore()

const model = ref({
  deleteModal: {
    visible: false,
  },
})
</script>

<template>
  <v-locale-provider rtl>
    <VApp style="direction: rtl;">
      <RouterView/>
    </VApp>
  </v-locale-provider>
</template>
