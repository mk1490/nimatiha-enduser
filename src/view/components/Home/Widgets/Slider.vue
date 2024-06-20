<template>
  <swiper
      parallax
      :loop="true"
      ref="swiper"
      :speed="400"
      :centered-slies="true"
      :modules="modules"
      observer
      observe-parents
      :pagination="{clickable : true}"
      autoplay>
    <swiper-slide
        v-for="(item, index) in imageItems" :key="index">
      <v-img
          height="450"
          :src="item"
          cover
      />
    </swiper-slide>
  </swiper>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import * as swiper from "swiper";

export default {
  name: "Slider",
  components: {SwiperSlide, Swiper},
  props: {
    imageItems: Array,
  },
  data() {
    return {
      modules: [swiper.Pagination],
      finalItems: [],
    }
  }
}
</script>

<style scoped>
.swiper {
  border-radius: 1rem !important;
}

</style>