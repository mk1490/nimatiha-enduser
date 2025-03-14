<template>
  <v-container>
    <div class="v-row">
      <div class="v-col-12">
        <div class="d-flex justify-center">
          <div class="v-col-12">
            <base-text-field
                label="تلفن همراه"
                :disabled="isCodeSend"
                v-model="model.mobileNumber"
                :rules="rules.mobileNumber"
                dir="ltr"
                type="tel"
                style="direction: ltr"/>
          </div>

        </div>
        <div
            v-if="isCodeSend"
            class="v-col-12">
          <div class="d-flex justify-center">
            <v-btn
                @click="resetPhone"
                size="small" variant="text">
              شماره وارد شده اشتباه است؟
            </v-btn>
          </div>
        </div>
        <div
            v-if="isCodeSend"
            class="d-flex justify-center">
          <div class="v-col-12 text-center">
            <label>
              کد 6 رقمی ارسال شده از طریق پیامک را در کادر ذیل وارد نمایید.
            </label>
            <v-otp-input
                :length="6"
                dir="ltr"
                v-model="model.verifyCode"/>
          </div>
        </div>
        <div class="v-col-12">
          <div class="d-flex justify-center">
            <v-btn
                v-if="!isCodeSend"
                color="primary"
                :loading="loading"
                @click="sendActivationCode">
              بررسی شماره تلفن
            </v-btn>
            <v-btn
                v-if="isCodeSend"
                color="primary"
                :loading="loading"
                @click="verifyCode">
              بررسی کد
            </v-btn>
          </div>
        </div>

      </div>
    </div>
  </v-container>
</template>
<script>
import BaseTextField from "@/views/Base/BaseTextField.vue";
import {digitsFaToEn} from "@persian-tools/persian-tools";

export default {
  name: "Authentication",
  components: {BaseTextField},
  emits: ['authSuccess'],
  created() {
    if (this.$store.getters.isAuth) {
      this.$router.push({
        name: 'root'
      })
    }
  },
  data() {
    return {
      model: {
        mobileNumber: null,
        verifyCode: '',
      },
      rules: {
        mobileNumber: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
          v => new RegExp('^(([0-9]*)|(([1-9]*)\\.([0-9]*)))$').test(v) || 'این فیلد بایستی از نوع عدد باشد!',
          v => v && v.length <= 11 || 'شماره تلفن همراه نمی‌تواند بیشتر از 11 رقم باشد.',
          v => v && v.length >= 10 || 'شماره تلفن همراه نمی‌تواند کمتر از 11 رقم باشد.',
        ],
      },
      isCodeSend: false,
      loading: false,
    }
  },
  methods: {
    resetPhone() {
      this.model.verifyCode = '';
      this.model.mobileNumber = '';
      this.isCodeSend = false;
    },
    sendActivationCode() {
      this.loading = true
      this.httpPost(`${this.serverAddress}/api/auth/checkMobileNumber`, {
        mobileNumber: this.model.mobileNumber,
      }, (result) => {
        this.loading = false;
        if (result.is_new_user == true) {
          this.isCodeSend = true
        }
      }, () => {
        this.loading = false;
      })
    },
    verifyCode() {
      this.httpPost(`${this.serverAddress}/api/auth/checkVerifyCode`, {
        mobile: this.model.mobileNumber,
        verify_code: this.model.verifyCode,
      }, (result) => {
        this.loading = false;
        localStorage.setItem('accessToken', result.token);
        this.$store.commit('SET_MOBILE_NUMBER', result.user.mobile);
        this.$emit('authSuccess', result.token);


        const queryParameter = this.$route.query;
        if (queryParameter && queryParameter.redirectTo) {
          this.$router.push({
            path: queryParameter.redirectTo,
          })
        }
      }, () => {
        this.loading = false;
      })
    }
  }
}
</script>
<style scoped>

</style>
