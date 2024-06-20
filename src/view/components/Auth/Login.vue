<template>
  <v-app>

  </v-app>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    cardWidth: function () {
      switch (this.$vuetify.display.name) {
        case 'xs':
          return 300
        default:
          return 500;
      }
    }
  },
  data() {
    return {
      passwordVisible: false,
      model: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      this.httpPost(this.serverAddress + `/api/auth/login`, this.model, async (result) => {
        await this.$store.dispatch('login', result)
        await this.$router.push({
          name: 'profile'
        });
      })
    },
    backToHomePage() {
      this.$router.push({
        name: 'Home'
      })
    },

  }
}
</script>

<style scoped>
span {
  font-family: VazirmatnUIFD;
  font-size: 1.3rem;;
}

.background {
  z-index: -1 !important;
  height: 100vh;
  width: 100%;
  filter: blur(0px) brightness(0.15);
  background-color: #0056b3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.customer-bg {
  background-position: center;
  background-size: cover;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>