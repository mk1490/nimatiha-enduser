<template>
  <v-app full-height class="bg-green-darken-4">
    <v-container class="container--fluid pa-0" style="height: 100%;">
      <div class="content fill-height d-flex align-items-center">
        <v-layout
            class="justify-center"
            fill-height
            align-center justify-center>
          <div class="d-inline-block align-self-center">
            <div
                v-if="isLogin === false"
                class="d-flex justify-center">
              <v-card width="300">
                <v-card-title class="text-center">
                  احراز هویت
                </v-card-title>
                <v-card-text>
                  <authentication
                      @authSuccess="authSuccess"/>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>


import Authentication from "./Steps/Authentication.vue";
import {mapGetters} from 'vuex'

export default {
  name: "RegistrationPage",
  components: {
    Authentication,
  },
  async created() {
    if (this.isLogin) {
      this.$router.push({
        path: '/profile'
      })
    }
  },
  data() {
    return {
      title: '',
      steps: [],
      vm: this,
      status: -1,
      isValid: false,
    }
  },
  methods: {
    authSuccess(token) {
      localStorage.setItem('accessToken', token);
      this.$store.commit('LOGIN_STATE', true);
      this.$router.push({
        name: 'profile'
      })
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'phoneNumber']),
  },
}
</script>

<style scoped>

.background {
  height: 100vh;
  width: 100%;
  background-color: #0056b3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  grid-column: 1/-1;
  grid-row: 1/-1;
}

</style>
