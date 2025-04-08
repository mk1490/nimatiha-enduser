<script>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {EffectCards, Pagination, Navigation} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: 'MultipleFullScreenImageSlider',
  data() {
    return {
      slides: ['صفحه 1', 'صفحه 2', 'صفحه 3', 'صفحه 4'], // محتوای اسلایدها
      swiperInstance: null,
      sliderModules: [EffectCards, Pagination, Navigation]
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
    handleResize() {
      const sliderElement = this.$el;
      sliderElement.style.height = `${window.innerHeight}px`;

      const swiperContainer = this.$refs.swiperContainer;
      const slides = swiperContainer.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.style.width = `${(window.innerHeight * 9) / 16}px`;
        slide.style.height = `${window.innerHeight}px`;
      });

      // اگر Swiper قبلاً مقداردهی شده است، ابعاد آن را به روز کنید
      if (this.swiperInstance) {
        this.swiperInstance.update();
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="full-screen-slider black-bg">
      <swiper
          :modules="sliderModules"
          :slides-per-view="1"
          :space-between="50"
          :navigation="true"
          :pagination="{clickable: true}"
      >
        <swiper-slide v-for="item in slides">
          <v-img
              :aspect-ratio="9/16"
              src="https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ"
          />

        </swiper-slide>
      </swiper>
    </div>

    <div class="full-width-button">


      <v-btn block>متن دکمه شما</v-btn>
    </div>
  </div>


</template>

<style scoped>
.full-screen-slider {
  width: 100%;
  height: 100vh; /* استفاده از vh برای اطمینان از تمام صفحه بودن در ارتفاع */
  overflow: hidden;
  display: inline-flex;
  position: fixed; /* برای جلوگیری از اسکرول صفحه اصلی */
  top: 0;
  left: 0;
  z-index: 9999; /* برای قرارگیری بالای سایر عناصر (اختیاری) */
}

.black-bg {
  background-color: black;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  /* بدون پس زمینه برای اسلایدها */
  font-size: 18px;
  color: white; /* تغییر رنگ متن به سفید برای پس زمینه مشکی */
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-width-button {
  width: 100%;
  display: inline-flex;
  background-color: black;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;
}
</style>