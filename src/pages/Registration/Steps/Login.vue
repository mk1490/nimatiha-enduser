<script setup>

import BaseTextField from "@/views/Base/BaseTextField.vue";
import {httpGet, httpPost} from "../../../plugins/http/httpRequest";


const model = ref({
  username: null,
  password: null,
})

const props = defineProps(['authSuccess'])
const emits = defineEmits(['authSuccess'])

function login() {
  httpPost(`/auth/login`, {...model.value}, result => {
    emits('authSuccess', result.access_token)
  })
}
</script>

<template>
  <v-container>
    <div class="v-row">
      <div class="v-col-12">
        <base-text-field
            label="نام کاربری"
            dir="ltr"
            v-model="model.username"
        />
      </div>
      <div class="v-col-12">
        <base-text-field
            label="کلمۀ عبور"
            dir="ltr"
            v-model="model.password"
        />
      </div>
      <div class="v-col-12">
        <v-btn
            @click="login"
            color="primary"
            block>
          ورود
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style scoped>

</style>