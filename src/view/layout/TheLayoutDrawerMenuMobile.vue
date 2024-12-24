<template>
  <v-navigation-drawer
      v-if="this.$vuetify.display.smAndDown"
      location="start"
      :model-value="navbarMenu"
      @update:modelValue="navigationStateChange"
      sticky
      scrim>
    <v-list>
      <v-list-item
          v-if="!isLogin"
          @click="$store.commit('SET_TOGGLE_NAVBAR', false)"
          to="registration">
        <v-list-item-title>
          درخواست عضویت
        </v-list-item-title>
      </v-list-item>
      <!--      <v-list-item-->
      <!--          @click="$store.commit('SET_TOGGLE_NAVBAR', false)"-->
      <!--          :to="isLogin? '/profile': 'login'">-->
      <!--        <v-list-item-title>-->
      <!--          {{ isLogin ? 'پروفایل' : 'ورود' }}-->

      <!--        </v-list-item-title>-->
      <!--      </v-list-item>-->
      <v-list-item
          @click="itemClick(item)"
          v-for="item in menuItems">
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>

    </v-list>

    <template v-slot:append>
      <v-btn
          @click="logout"
          block
          class="bg-red mb-3"
          rounded>
        <span style="color: white !important;">خروج از حساب کاربری</span>
      </v-btn>

    </template>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "TheLayoutDrawerMenuMobile",
  computed: {
    ...mapGetters([
      'navbarMenu',
      'menuItems',
      'isLogin',
    ]),
    drawerVisible: {
      handler() {
        return this.$vuetify.display.sm || this.$vuetify.display.xs
      }
    }
  },
  methods: {
    itemClick(item) {
      this.$router.push({
        name: item.to
      })
      this.$store.commit('SET_TOGGLE_NAVBAR', false)
    },
    navigationStateChange(event) {
      this.$store.commit('SET_TOGGLE_NAVBAR', event)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'auth'
      })
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
