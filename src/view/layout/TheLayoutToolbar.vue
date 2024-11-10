<template>
  <v-app-bar
      dir="rtl"
      density="default"
      height="85"
      style="z-index: 999999;direction: rtl;right: 0!important;; left: 0!important;">
    <v-toolbar
        color="#ffffff00"
        flat>
      <div class="d-inline-flex align-items-center">
        <v-avatar
            tile>
          <v-img
              @click="scrollToTarget(0)"
              src="@/assets/logo.jpg" width="60"/>
        </v-avatar>
        <h3 class="ms-2">
          دست آفرینان
        </h3>
      </div>

      <div class="hidden-sm-and-down menu-container menu-items">
        <div class="d-flex">
          <template v-for="item in menuItems">
            <v-btn
                color="primary"
                :text="item.text"
                @click="scrollToTarget(item.to)"
                variant="text">{{ item.text }}
            </v-btn>
          </template>
        </div>
      </div>

      <v-spacer/>

      <v-btn
          class="hidden-sm-and-down bg-primary"
          @click="toLoginRoute"
          rounded>
        <span style="color: white !important;">{{ !isLogin ? 'ثبت نام / ورود' : '' }}</span>
      </v-btn>

      <v-btn
          @click="$store.dispatch('toggleNavbar')"
          variant="plain"
          class="hidden-md-and-up">
        <v-icon size="36">
          mdi-menu
        </v-icon>
      </v-btn>
    </v-toolbar>

  </v-app-bar>
</template>

<script>
import FullScreen from '../widget/AppFullScreen.vue';
import AppDateTime from "@/view/widget/AppDateTime";
import AppToggleNightMode from "@/view/widget/AppToggleNightMode.vue";
import AppFullScreen from "@/view/widget/AppFullScreen.vue";
import AppHelpButton from "@/view/widget/AppHelpButton.vue";
import {useGoTo} from 'vuetify'
import {mapGetters, mapActions} from "vuex";


export default {
  name: 'TheLayoutToolbar',
  computed: {
    ...mapGetters(['menuItems'])
  },
  components: {
    AppHelpButton,
    AppFullScreen,
    AppToggleNightMode,
    AppDateTime,
    FullScreen,
  },
  mounted() {
    const navbar = this.$refs.navbar;
    // window.onscroll = (event) => {
    //     if (window.scrollY > 100) {
    //         navbar.classList.add('navbar-shrink')
    //     } else {
    //
    //         navbar.classList.remove('navbar-shrink')
    //     }
    // }
    this.emitter.on('onMenuSelection', itemSelection => {
      this.scrollToTarget(itemSelection.to)
    })
  },
  methods: {
    toLoginRoute() {
      this.$router.push({
        name: this.$store.getters.isLogin ? 'profile' : 'registration'
      })
    },
    scrollToTarget(target) {
      this.goTo(target, {
        easing: 'easeInOutQuart',
        duration: 1500,
      })
    }
  },
  data() {
    return {
      goTo: useGoTo(),
      items: [
        {text: 'معرفی شرکت', to: '#intro'},
        {text: 'پروژه‌ها', to: '#some-projects'},
        {text: 'اطلاعیه‌های شرکت', to: '#notifications'},
      ],
    }
  },
};
</script>
<style scoped>
span {
  font-family: VazirmatnUIFD, serif !important;
}

:deep(.v-toolbar__content) {
  padding-inline: 1rem !important;
}

::v-deep .v-btn__content {
  color: black !important;
  font-family: VazirmatnUIFD, serif !important;
}

::v-deep.v-app-bar {
  background-color: #FFFFFF80 !important;
  backdrop-filter: blur(10px) !important;
  right: 0 !important;
}

.menu-container {
  margin-right: 2em;
  font-family: VazirmatnUIFD !important;
}
</style>
