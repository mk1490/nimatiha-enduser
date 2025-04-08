<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: 'MultipleFullScreenImageSlider',
  data() {
    return {
      slides: ['صفحه 1', 'صفحه 2', 'صفحه 3', 'صفحه 4'], // محتوای اسلایدها
      swiperInstance: null,
    };
  },
  mounted() {
    const swiperContainer = this.$refs.swiperContainer;

    // تنظیم ارتفاع اسلایدر به ارتفاع کل صفحه
    const sliderElement = this.$el;
    sliderElement.style.height = `${window.innerHeight}px`;

    // تنظیم نسبت ابعاد 9:16 برای هر اسلاید
    const slides = swiperContainer.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.style.width = `${(window.innerHeight * 9) / 16}px`;
      slide.style.height = `${window.innerHeight}px`;
      slide.style.display = 'flex';
      slide.style.justifyContent = 'center';
      slide.style.alignItems = 'center';
    });

    // تنظیم استایل برای محتوای اسلاید
    const slideContents = swiperContainer.querySelectorAll('.slide-content');
    slideContents.forEach(content => {
      content.style.width = '100%';
      content.style.height = '100%';
      content.style.display = 'flex';
      content.style.justifyContent = 'center';
      content.style.alignItems = 'center';
      content.style.textAlign = 'center';
    });

    // مقداردهی اولیه Swiper
    this.swiperInstance = new Swiper(swiperContainer, {
      modules: [],
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-100%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
      direction: 'horizontal',
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // واکنش به تغییر اندازه پنجره
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
    window.removeEventListener('resize', this.handleResize);
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
  <div class="full-screen-slider black-bg">
    <div class="swiper" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            {{ slide }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-screen-slider {
  width: 100%;
  height: 100vh; /* استفاده از vh برای اطمینان از تمام صفحه بودن در ارتفاع */
  overflow: hidden;
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
</style>