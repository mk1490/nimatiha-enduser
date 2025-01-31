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
            console.log(to.fullPath, this.likeMatch(to.fullPath, '/survey%'))
            if (this.likeMatch(to.fullPath, '/survey%')) {
                console.log("INCLUDS SURVEY")
                this.$router.push({
                    path: `/questionnaire-details/${to.path.replace('/survey/', '')}`
                })
            } else if (to.name !== 'complete-profile') {
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
