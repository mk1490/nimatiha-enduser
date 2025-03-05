<script setup>

import BaseModal from "@/view/widget/Base/BaseModal.vue";
import videojs from "video.js";


const props = defineProps({
  visible: Boolean,
  data: Object,
})

defineEmits(['close'])

const videoPlayer = ref(null)


onMounted(() => {
  videoPlayer.value = videojs(videoPlayer.value, {
    autoplay: false,
    controls: true,
    sources: [
      {
        src: props.data.videoUrl,
        type: 'application/x-mpegURL'
      }
    ]
  }, () => {
  });
})


</script>

<template>
  <base-modal
      title="مشاهده ویدئو"
      @close="$emit('close')"
      full-screen
      :visible="visible">

    <video

        style="height: 100%!important;"
        ref="videoPlayer"
        class="video-js"></video>


  </base-modal>
</template>

<style scoped>
::v-deep .content {
  height: 100% !important;
}

.video-js {
  width: 100% !important;
  height: 100% !important;
}
</style>