<script setup lang="ts">
import {useStore} from 'vuex'
import MultipleFullScreenImageSlider from "@/MultipleFullScreenImageSlider.vue";

const store = useStore()

const model = ref({
  deleteModal: {
    visible: false,
  },
})
</script>

<template>
  <v-locale-provider rtl class="h-100">
<!--    <VApp style="direction: rtl;">-->
<!--      <RouterView/>-->
<!--    </VApp>-->

    <multiple-full-screen-image-slider  />
  </v-locale-provider>
</template>
