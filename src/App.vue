<template>
    <v-locale-provider rtl>
        <router-view/>
        <progress-dialog
                :showing="loading"
        />
    </v-locale-provider>
</template>
<script>
import ProgressDialog from "@/view/widget/ProgressDialog.vue";
import commonMethods from "@/plugins/commonMethods";
import {mapGetters} from "vuex";

export default {
    mixins: [commonMethods],
    components: {
        ProgressDialog
    },
    computed: {
        ...mapGetters(['loading', 'isLogin']),
    },
    /*  async created() {
          Vue.prototype.deleteModal = this.$refs.deleteDialog;


          this.$store.subscribe(async (mutation) => {
              switch (mutation.type) {
                  case 'LOGOUT':
                      await this.logout();
                      break;
              }
          });
      },
      name: 'App',
      components: {ProgressDialog, DeleteDialog},
      async mounted() {
          Vue.prototype.deleteModal = this.$refs.deleteDialog;
      },

      watch: {
          'deleteDialog': {
              handler() {
              }
          },
          'isLogin': {
              async handler() {
                  await this.checkLogin();
              }
          },
      },
      methods: {
          async logout() {
          },
          async checkLogin() {
              return // TODO
          },

      },*/
};
</script>
