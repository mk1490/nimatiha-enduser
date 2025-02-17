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

export default {
  mixins: [commonMethods],
  components: {
    ProgressDialog
  },
  computed: {
    ...mapGetters(['loading', 'isLogin']),
  },
  watch: {
    $route(to, from) {
       if (to.name !== 'complete-profile') {
        if (vuex.getters.profileData && !vuex.getters.profileData.status) {
          // this.$router.push({
          //   name: 'complete-profile'
          // })
        }
      }

    }
  }
};
</script>

<style>


</style>
