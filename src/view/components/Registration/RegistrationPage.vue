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


import RegistrationSuccessComponent from "@/view/components/Registration/Widgets/RegistrationSuccessComponent.vue";

import Authentication from "./Steps/Authentication.vue";
import {mapGetters} from 'vuex'
import DynamicStep from "@/view/components/Registration/Steps/DynamicStep.vue";

export default {
  name: "RegistrationPage",
  components: {
    Authentication,
  },
  async created() {

  },
  data() {
    return {
      title: '',
      steps: [],
      vm: this,
      status: -1,
      isValid: false,
      selectedStep: 1,
      model: {}
    }
  },
  methods: {
    async submitFormAndSendToServer() {

      let payload = {...this.model};
      payload.initialCashAmount = this.convertAmountToPlainAmountValue(payload.initialCashAmount);
      payload.monthlyIncome = this.convertAmountToPlainAmountValue(payload.monthlyIncome);
      payload.monthlyInstallmentsAmount = this.convertAmountToPlainAmountValue(payload.monthlyInstallmentsAmount);
      payload.suggestedUsableArea = Number(payload.suggestedUsableArea);


      if (!await this.$refs.form.validate()) {
        this.$swal.fire({
          icon: 'warning',
          title: 'هشدار!',
          text: 'لطفا خطاهای بوجود آمده را برطرف نمایید!',
        })
        return;
      }

      this.httpPost(`/auth/register`, payload, (data) => {
        this.status = 1;
        this.trackingCode = data.trackingCode;
      });
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.$store.commit('LOGIN_STATE', false)
      this.isAuth = false;
    },
    authSuccess(token) {
      this.$store.commit('LOGIN_STATE', true);
      localStorage.setItem('accessToken', token);
    },
    prev() {
      this.selectedStep--;
    },
    async next() {
      if (!await this.$refs[`form_${this.selectedStep - 1}`][0].validate()) {
        this.$toast.error('لطفا خطاهایی که در فرم وجود دارد را برطرف نمایید.')
        return
      }
      let payload = {}
      Object.keys(this.model).map(f => {
        Object.keys(this.model[f]).map(fieldItem => {
          payload[fieldItem] = this.model[f][fieldItem];
        })
      })


      this.httpPost(`/form-answer/${this.steps[this.selectedStep - 1].id}`, this.model[this.steps[this.selectedStep - 1].id], result => {
        if (this.selectedStep === this.steps.length) {
          this.$swal.fire({
            icon: 'success',
            text: 'درخواست شما با موفقیت ثبت شد.'
          }).then(() => {
            localStorage.removeItem('accessToken');
            this.selectedStep = 1;
            this.$store.commit('LOGIN_STATE', false);
          })
        } else {
          this.selectedStep++;
        }
      })
    }
  },
  computed: {
    ...
        mapGetters(['isLogin', 'phoneNumber']),
    cardWidth:

        function () {
          switch (this.$vuetify.display.name) {
            case 'xl':
            case 'lg':
              return 1000;
            case 'md':
              return 700;
            case 'xs':
              return 300
            default:
              return 500;
          }
        }
  }
  ,
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
