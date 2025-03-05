<template>
  <v-locale-provider rtl>
    <router-view/>
    <progress-dialog
    />
  </v-locale-provider>
</template>
<script>
import ProgressDialog from "@/view/widget/ProgressDialog.vue";
import commonMethods from "@/plugins/commonMethods";
import {mapGetters} from "vuex";
import vuex from "@/store";

import {useLocale} from 'vuetify'

export default {
  mixins: [commonMethods],
  components: {
    ProgressDialog
  },
  created() {
    const locale = useLocale()
    locale.current = 'faIR';
    this.$vuetify.locale.current = 'fa'
  },
  computed: {
    ...mapGetters(['loading', 'isLogin']),
  },
  watch: {
    $route(to, from) {
      if (to.name !== 'complete-profile') {
        if (vuex.getters.profileData && !vuex.getters.profileData.status) {
          this.$router.push({
            name: 'complete-profile'
          })
        }
      }

    }
  }
};
</script>

<style>


</style>
