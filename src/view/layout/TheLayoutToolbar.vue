<template>
  <v-app-bar
      dir="rtl"
      density="default"
      height="85"
      elevation="1"
      floating

      style="z-index: 999999;direction: rtl;right: 0!important;; left: 0!important;">
    <v-toolbar
        color="#ffffff00"
        flat>
      <div class="d-inline-flex align-items-center">
        <h3 class="ms-2">
          نیمکتی ها
        </h3>
      </div>

      <div class="hidden-sm-and-down menu-container menu-items">
        <div class="d-flex">
          <template v-for="item in menuItems">
            <v-btn
                color="primary"
                :text="item.text"
                @click="toRoute(item.to)"
                variant="text">{{ item.text }}
            </v-btn>
          </template>
        </div>
      </div>

      <v-spacer/>

      <v-btn
          class="hidden-sm-and-down bg-red"
          rounded>
        <span style="color: white !important;">خروج از حساب کاربری</span>
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
import {useGoTo} from 'vuetify'
import {mapGetters} from 'vuex'


export default {
  name: 'TheLayoutToolbar',
  components: {},
  computed: {
    ...mapGetters(['menuItems'])
  },
  methods: {
    toRoute(target) {
      this.$router.push({
        name: target,
      })
    }
  },
  data() {
    return {
      goTo: useGoTo(),
      items: [
        {text: 'معرفی شرکت', to: '#intro'},
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
