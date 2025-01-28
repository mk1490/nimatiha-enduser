<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseAutoComplete from "@/view/widget/Base/BaseAutoComplete.vue";
import {verifyIranianNationalId} from '@persian-tools/persian-tools'
import {mapGetters} from 'vuex'
import ProfileCompleteForm from "@/view/components/Shared/ProfileCompleteForm.vue";

export default {
  name: "ProfileComplete",
  components: {ProfileCompleteForm, BaseAutoComplete, BaseSelect, BaseTextField},
  computed: {
    ...mapGetters(['profileData']),
  },
  created() {
    this.httpGet(`/auth/initialize`, result => {
      this.initialize.educationLevel = result.educationLevels;
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
        educationLevel: [],
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
  methods:{
    success(){
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <profile-complete-form
        v-model="model"
        ref="profileCompleteForm"
        @update="success"
    />
  </v-container>
</template>

<style scoped>

</style>
