<script>
import {verifyIranianNationalId} from '@persian-tools/persian-tools'
import {mapGetters} from 'vuex'
import ProfileCompleteForm from "@/pages/Shared/ProfileCompleteForm.vue";
import BaseAutoComplete from "@/components/Base/BaseAutoComplete.vue";
import BaseSelect from "@/views/Base/BaseSelect.vue";
import BaseTextField from "@/views/Base/BaseTextField.vue";

export default {
  name: "ProfileComplete",
  components: {ProfileCompleteForm, BaseAutoComplete, BaseSelect, BaseTextField},
  computed: {
    ...mapGetters(['profileData']),
  },
  created() {
    let url = 'auth/initialize';

    if (this.likeMatch(this.$route.fullPath, '%survey%')) {
      url += `?grades=all`
    }

    this.httpGet(url, result => {
      this.initialize.educationLevels = result.educationLevels;
      this.initialize.zones = result.zones;
      this.initialize.cities = result.cities;
      const profileData = this.$store.getters.profileData;
      if (profileData) {
        this.$refs.profileCompleteForm.setModel(profileData);
      }
    })
  },
  data() {
    return {
      model: {},
      initialize: {
        educationLevels: [],
        cities: [],
        zones: [],
      },
    }
  },
  watch: {
    'profileData': {
      handler(value) {
        this.$refs.profileCompleteForm.setModel(value);
      }
    }
  },
  methods: {
    success(data) {
      this.$store.commit('LOGIN_STATE', true)
      localStorage.setItem('accessToken', data.access_token);
      const queryParameter = this.$route.query;
      if (queryParameter && queryParameter.redirectTo) {
        this.$router.push({
          path: queryParameter.redirectTo
        })
      }
      // location.reload()
    }
  }
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <profile-complete-form
        v-model="model"
        :initialize="initialize"
        ref="profileCompleteForm"
        @update="success"
        mobile-number-visible
    />
  </v-container>
</template>

<style scoped>

</style>
