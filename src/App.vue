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
};
</script>

<style>


</style>
