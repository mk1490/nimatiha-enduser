<script setup lang="ts">
import {useStore} from 'vuex'
import MultipleFullScreenImageSlider from "@/views/user-interface/MultipleFullScreenImageSlider.vue";

const store = useStore()

const model = ref({
  deleteModal: {
    visible: false,
  },
})
const isLogin = computed(() => store.getters.isLogin)

</script>

<template>

  <v-locale-provider rtl class="h-100">
    <VApp style="direction: rtl;">
      <RouterView/>
    </VApp>
  </v-locale-provider>
</template>
