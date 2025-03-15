<template>
  <v-app class="bg-green-darken-4 h-100">
    <v-container class="container--fluid pa-0 align-content-center align-center">
      <div class="content h-100 d-flex align-items-center">
        <v-layout
            class="justify-center h-100"
            align-center justify-center>
          <!--          <div class="d-inline-block align-self-center">-->
          <!--            <div-->
          <!--                v-if="isLogin === false"-->
          <!--                class="d-flex justify-center">-->
          <!--              <v-card>-->
          <!--                <v-card-title class="text-center">-->
          <!--                  احراز هویت-->
          <!--                </v-card-title>-->
          <!--   -->
          <!--                </v-card-text>-->
          <!--              </v-card>-->
          <!--            </div>-->
          <!--          </div>-->

          <login
              @authSuccess="authSuccess"
          />

        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import {computed} from "vue";
import Login from "./Steps/Login.vue";
import {useStore} from 'vuex'
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()


const model = ref({
  title: '',
  steps: [],
  status: -1,
  isValid: false,
})


const isLogin = computed(() => {
  return store.getters.isLogin;
})

const phoneNumber = computed(() => {
  return null;
})

onMounted(() => {
  if (isLogin) {
    router.push({
      path: '/profile'
    })
  }
})

function authSuccess(token) {
  localStorage.setItem('Authorization', token);
  store.commit('LOGIN_STATE', true);
  router.push({
    name: 'profile'
  })
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
