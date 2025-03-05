<script setup>

import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import {httpPost} from "@/plugins/httpRequest";


const model = ref({
  username: null,
  password: null,
})

const props = defineProps(['authSuccess'])
const emits = defineEmits(['authSuccess'])

function login() {
  httpPost(`/auth/login`, {...model.value}, result => {
    emits('authSuccess', result)
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