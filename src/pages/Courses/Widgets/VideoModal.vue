<script setup>

import videojs from "video.js";
import {httpPost} from "../../../plugins/http/httpRequest";
import BaseModal from "../../../views/Base/BaseModal.vue";


const props = defineProps({
  visible: Boolean,
  data: Object,
})

defineEmits(['close'])

const videoPlayer = ref(null)
const model = ref({
  status: 0,
})

onMounted(() => {
  model.value.status = props.data.status;
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


function requestObserve() {
  httpPost(`/course/observe-request/${props.data.id}`, {})
}


</script>

<template>
  <base-modal
      title="مشاهده ویدئو"
      @close="$emit('close')"
      dark
      full-screen
      :visible="visible">

    <div class="video-container">
      <video
          style="height: 100%!important;"
          ref="videoPlayer"
          class="video-js"></video>
    </div>

    <div class="full-width-button">
      <div class="v-row">
        <div class="v-col">
          <v-btn
              @click="$emit('close')"
              block
              color="red">
            بستن
          </v-btn>
        </div>
        <div
            v-if="model.status != 1"
            class="v-col">
          <v-btn
              @click="requestObserve"
              color="blue"
              block>
            <v-icon>
              mdi-check-all
            </v-icon>
            این ویدئو را مشاهده نمودم
          </v-btn>
        </div>
      </div>
    </div>


  </base-modal>
</template>

<style scoped lang="scss">
::v-deep .content {
  height: 100% !important;
}

.video-js {
  position: absolute;
  left: 0;
  bottom: 3em;
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;

}


.video-container {
  bottom: 3em;
}

video {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  //position: absolute;
  top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
}

.full-width-button {
  width: 100%;
  padding: 20px;
  display: inline-flex;
  background-color: black;
  position: fixed;
  bottom: 0;
  left: 0;
}

.video-js .vjs-progress-control {
  height: 5px;
  background-color: #ddd;
}

.video-js .vjs-play-progress {
  background-color: #f00;
}

.video-js .vjs-load-progress {
  .video-js .vjs-progress-control {
    height: 5px;
    background-color: #ddd;
  }

  .video-js .vjs-play-progress {
    background-color: #f00;
  }

  .video-js .vjs-load-progress {
    background-color: #ccc;
  }

  .video-js .vjs-time-tooltip {
    background-color: #000;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
  }

  background-color: #ccc;
}

.video-js .vjs-time-tooltip {
  /* استایل تولتیپ زمان */
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
}
</style>