<script setup lang="ts">
import { useTheme } from 'vuetify'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'

import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { httpPost } from '@/plugins/http/httpRequest'
import {useStore} from "vuex";

const router = useRouter()
const form = ref({
  username: '',
  role: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const isPasswordVisible = ref(false)
const loading = ref(false)

const store = useStore()
const submit = () => {
  loading.value = true
  httpPost(`/auth/login`, form.value, async (result) => {
    loading.value = false

    store.setToken(result.access_token)
    store.setRoles(result.roles)
    await router.push('/').then()
  }, error => {
    loading.value = false
  })
}

</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1 text-center">
          خوش آمدید
        </h4>
        <p class="mb-0">
          جهت ورود به حساب کاربری، نام کاربری و کلمۀ عبور خود را وارد نمایید.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submit()">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="نام کاربری"
                type="email"
                dir="ltr"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="کلمۀ عبور"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                dir="ltr"
              />

              <!-- remember me checkbox -->
              <!--              <div class="d-flex align-center justify-space-between flex-wrap my-6">-->
              <!--                <VCheckbox-->
              <!--                  v-model="form.remember"-->
              <!--                  label="Remember me"-->
              <!--                />-->

              <!--                &lt;!&ndash;                <a&ndash;&gt;-->
              <!--                &lt;!&ndash;                  class="text-primary"&ndash;&gt;-->
              <!--                &lt;!&ndash;                  href="javascript:void(0)"&ndash;&gt;-->
              <!--                &lt;!&ndash;                >&ndash;&gt;-->
              <!--                &lt;!&ndash;                  Forgot Password?&ndash;&gt;-->
              <!--                &lt;!&ndash;                </a>&ndash;&gt;-->
              <!--              </div>-->

              <!-- login button -->
              <VBtn
                class="my-6"
                block
                :loading="loading"
                type="submit"
              >
                ورود
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <!--    <VImg-->
    <!--      class="auth-footer-start-tree d-none d-md-block"-->
    <!--      :src="authV1Tree"-->
    <!--      :width="250"-->
    <!--    />-->

    <!--    <VImg-->
    <!--      :src="authV1Tree2"-->
    <!--      class="auth-footer-end-tree d-none d-md-block"-->
    <!--      :width="350"-->
    <!--    />-->

    <!-- bg img -->
    <!--    <VImg-->
    <!--      class="auth-footer-mask d-none d-md-block"-->
    <!--      :src="authThemeMask"-->
    <!--    />-->
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

h4 {
  font-family: VazirmatnUIFD !important;
}
</style>
