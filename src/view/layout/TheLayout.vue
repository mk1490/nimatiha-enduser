<template>
  <v-app style="direction: rtl">
    <the-layout-toolbar v-if="isLogin"/>
    <the-layout-drawer-menu-mobile/>
    <the-layout-content/>
    <!--        <the-layout-footer/>-->
  </v-app>
</template>

<script>
import TheLayoutToolbar from './TheLayoutToolbar.vue';
import TheLayoutContent from './TheLayoutContent.vue';
import TheLayoutFab from './TheLayoutFab.vue';
import TheLayoutToTopFab from './TheLayoutToTopFab.vue';
import TheLayoutFooter from './TheLayoutFooter.vue';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import TheLayoutDrawerMenuMobile from "@/view/layout/TheLayoutDrawerMenuMobile.vue";
import {mapGetters} from 'vuex'

export default {
  async created() {
    this.httpGet(`/auth/profile`, result => {
      this.$store.commit('SET_PROFILE_DATA', {...result})
      if (!result.status) {
        // this.$router.push({
        //     name: 'complete-profile'
        // })
      }
    })

    await this.$store.commit('SET_MENU_ITEMS', [
      {
        text: 'آزمون‌ها',
        to: 'profile-test'
      },
      {
        text: 'پرسش‌نامه‌ها',
        to: 'questionnaires'
      }
    ])

    // if (!(await this.$store.dispatch('isAuth'))) {
    //   this.$router.push({
    //     path: '/auth'
    //   })
    // }

  },
  name: 'TheLayout',
  components: {
    TheLayoutDrawerMenuMobile,
    TheLayoutToolbar,
    TheLayoutContent,
    TheLayoutFab,
    TheLayoutToTopFab,
    TheLayoutFooter,
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
};
</script>
<style scoped>

</style>
